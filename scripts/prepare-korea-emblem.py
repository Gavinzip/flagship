#!/usr/bin/env python3
"""Prepare a high-density transparent Korea emblem without redrawing its artwork.

The supplied source is a flat black-background raster.  This script uses the
existing traced exterior outline only as a matte, simplifies its pixel-step
contour, moves the matte slightly inside the black background fringe, and
supersamples the alpha edge.  Interior dark artwork stays untouched.
"""

from __future__ import annotations

import argparse
import json
import math
import re
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", type=Path, required=True)
    parser.add_argument("--outline", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--report", type=Path, required=True)
    parser.add_argument("--comparison", type=Path)
    parser.add_argument("--scale", type=int, default=2)
    parser.add_argument("--work-scale", type=int, default=8)
    parser.add_argument("--simplify", type=float, default=1.15)
    parser.add_argument("--inset", type=float, default=1.0)
    parser.add_argument("--edge-blur", type=float, default=0.55)
    parser.add_argument("--quality", type=int, default=92)
    return parser.parse_args()


def point_line_distance(
    point: tuple[float, float],
    start: tuple[float, float],
    end: tuple[float, float],
) -> float:
    x, y = point
    x1, y1 = start
    x2, y2 = end
    dx, dy = x2 - x1, y2 - y1
    if dx == 0 and dy == 0:
        return math.hypot(x - x1, y - y1)
    return abs(dy * x - dx * y + x2 * y1 - y2 * x1) / math.hypot(dx, dy)


def rdp(
    points: list[tuple[float, float]], epsilon: float
) -> list[tuple[float, float]]:
    if len(points) < 3:
        return points
    start, end = points[0], points[-1]
    distances = [point_line_distance(point, start, end) for point in points[1:-1]]
    maximum = max(distances, default=0.0)
    if maximum <= epsilon:
        return [start, end]
    index = distances.index(maximum) + 1
    return rdp(points[: index + 1], epsilon)[:-1] + rdp(points[index:], epsilon)


def simplify_closed(
    points: list[tuple[float, float]], epsilon: float
) -> list[tuple[float, float]]:
    if points[0] == points[-1]:
        points = points[:-1]
    origin = points[0]
    split = max(
        range(1, len(points)),
        key=lambda index: math.dist(origin, points[index]),
    )
    first = rdp(points[: split + 1], epsilon)
    second = rdp(points[split:] + [origin], epsilon)
    return first[:-1] + second[:-1]


def read_outline(path: Path) -> list[tuple[float, float]]:
    source = path.read_text(encoding="utf-8")
    match = re.search(r'koreaEmblemOutline\s*=\s*\n?\s*"([^"]+)"', source)
    if not match:
        raise ValueError(f"Could not find koreaEmblemOutline in {path}")
    svg_path = match.group(1)
    unsupported = set(re.findall(r"[A-Z]", svg_path)) - {"M", "L", "Z"}
    if unsupported:
        raise ValueError(f"Unsupported SVG commands: {sorted(unsupported)}")
    points = [
        (float(x), float(y))
        for x, y in re.findall(r"[ML](-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)", svg_path)
    ]
    if len(points) < 3:
        raise ValueError("Outline did not contain enough points")
    return points


def polygon_mask(
    size: tuple[int, int],
    points: list[tuple[float, float]],
    scale: int,
) -> Image.Image:
    mask = Image.new("L", (size[0] * scale, size[1] * scale), 0)
    ImageDraw.Draw(mask).polygon(
        [(round(x * scale), round(y * scale)) for x, y in points], fill=255
    )
    return mask


def edge_dark_ratio(rgb: Image.Image, alpha: Image.Image) -> dict[str, float | int]:
    alpha_array = np.asarray(alpha, dtype=np.uint8)
    rgb_array = np.asarray(rgb.convert("RGB"), dtype=np.uint8)
    inner = np.asarray(alpha.filter(ImageFilter.MinFilter(9)), dtype=np.uint8)
    edge = (alpha_array >= 96) & (inner < 96)
    edge_pixels = int(edge.sum())
    dark = np.max(rgb_array, axis=2) < 48
    dark_edge = int((edge & dark).sum())
    return {
        "edgePixels": edge_pixels,
        "darkEdgePixels": dark_edge,
        "darkEdgeRatio": round(dark_edge / max(edge_pixels, 1), 6),
    }


def make_comparison(
    source_rgb: Image.Image,
    old_alpha: Image.Image,
    repaired: Image.Image,
    path: Path,
) -> None:
    background = Image.new("RGB", source_rgb.size, "#b9d9f5")
    before = background.copy()
    before.paste(source_rgb, mask=old_alpha)
    after = background.copy()
    after.paste(repaired.convert("RGB"), mask=repaired.getchannel("A"))
    x0, y0, x1, y1 = (470, 170, 1510, 650)
    comparison = Image.new("RGB", ((x1 - x0) * 2, y1 - y0), "white")
    comparison.paste(before.crop((x0, y0, x1, y1)), (0, 0))
    comparison.paste(after.crop((x0, y0, x1, y1)), (x1 - x0, 0))
    path.parent.mkdir(parents=True, exist_ok=True)
    comparison.save(path, format="PNG", optimize=True)


def main() -> None:
    args = parse_args()
    source = Image.open(args.source).convert("RGB")
    original_size = source.size
    points = read_outline(args.outline)
    simplified = simplify_closed(points, args.simplify)

    work_scale = max(args.work_scale, args.scale)
    matte = polygon_mask(original_size, simplified, work_scale)
    inset_px = max(0, round(args.inset * work_scale))
    if inset_px:
        filter_size = inset_px * 2 + 1
        matte = matte.filter(ImageFilter.MinFilter(filter_size))
    matte = matte.filter(ImageFilter.GaussianBlur(args.edge_blur * work_scale))

    output_size = (original_size[0] * args.scale, original_size[1] * args.scale)
    alpha = matte.resize(output_size, Image.Resampling.LANCZOS)
    rgb = source.resize(output_size, Image.Resampling.LANCZOS)
    repaired = rgb.convert("RGBA")
    repaired.putalpha(alpha)

    raw_alpha = polygon_mask(original_size, points, work_scale).resize(
        output_size, Image.Resampling.LANCZOS
    )
    args.output.parent.mkdir(parents=True, exist_ok=True)
    repaired.save(
        args.output,
        format="WEBP",
        quality=args.quality,
        method=6,
        alpha_quality=100,
        exact=True,
    )

    report = {
        "source": str(args.source),
        "sourceSize": list(original_size),
        "output": str(args.output),
        "outputSize": list(output_size),
        "rawOutlinePoints": len(points),
        "simplifiedOutlinePoints": len(simplified),
        "simplifyToleranceSourcePx": args.simplify,
        "matteInsetSourcePx": args.inset,
        "edgeBlurSourcePx": args.edge_blur,
        "webpQuality": args.quality,
        "alphaBounds": list(alpha.getbbox() or (0, 0, 0, 0)),
        "before": edge_dark_ratio(rgb, raw_alpha),
        "after": edge_dark_ratio(rgb, alpha),
    }
    args.report.parent.mkdir(parents=True, exist_ok=True)
    args.report.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")

    if args.comparison:
        make_comparison(rgb, raw_alpha, repaired, args.comparison)


if __name__ == "__main__":
    main()
