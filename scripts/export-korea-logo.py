#!/usr/bin/env python3
"""Export the original logo's unchanged RGB pixels for the web SVG renderer.

The display contour lives in koreaEmblemContour.ts. No threshold-based alpha,
upscaling, recoloring, or generated artwork is used by this export.
Requires Pillow. Run from any directory.
"""

import base64
import re
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "design/source-artwork/flagship-card-show-korea-logo-original.png"
TEXTURE = ROOT / "src/flagship/assets/korea-emblem-color.webp"
GALLERY = ROOT / "design/korea-card-show/source-and-variants"


def main():
    original = Image.open(SOURCE).convert("RGB")
    original.save(TEXTURE, format="WEBP", lossless=True, method=6, exact=True)
    with Image.open(TEXTURE) as exported:
        if exported.convert("RGB").tobytes() != original.tobytes():
            raise ValueError("Logo export changed original RGB pixels")

    contour_source = (ROOT / "src/flagship/data/koreaEmblemContour.ts").read_text()
    match = re.search(r'koreaEmblemContour\s*=\s*"([^"]+)"', contour_source)
    if not match:
        raise ValueError("Canonical logo contour was not found")

    GALLERY.mkdir(parents=True, exist_ok=True)
    (GALLERY / "02-korea-logo-color.webp").write_bytes(TEXTURE.read_bytes())
    embedded = base64.b64encode(TEXTURE.read_bytes()).decode("ascii")
    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="220 90 1170 755" '
        'width="1170" height="755" role="img" aria-label="FLAGSHIP Card Show Korea">'
        f'<defs><clipPath id="edge" clipPathUnits="userSpaceOnUse"><path d="{match[1]}"/>'
        '</clipPath></defs><image width="1672" height="941" clip-path="url(#edge)" '
        f'href="data:image/webp;base64,{embedded}"/></svg>\n'
    )
    (GALLERY / "02-korea-logo-web.svg").write_text(svg)
    print(f"Verified unchanged RGB: {original.width} × {original.height}; {TEXTURE.stat().st_size} bytes")
    print("Exported self-contained SVG preview beside the original in asset library 02.")


if __name__ == "__main__":
    main()
