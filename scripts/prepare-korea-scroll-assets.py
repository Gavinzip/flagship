#!/usr/bin/env python3
"""Promote the selected Korea scroll panels and encode web-ready copies."""

from __future__ import annotations

import argparse
import shutil
from pathlib import Path

from PIL import Image, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "work/generated-images/2026-09-13-korea-continuous-scroll"
GALLERY_DIR = ROOT / "design/korea-card-show"
VARIANTS_DIR = GALLERY_DIR / "source-and-variants"
PUBLIC_DIR = ROOT / "public/assets/flagship"
SOURCE_SIZE = (1672, 941)
PANEL_SIZE = (2048, 1152)

PANELS = (
    ("07-panel-01-natural-sky.png", "09-korea-scroll-sky"),
    ("08-panel-02-natural-city-river.png", "10-korea-scroll-city"),
    ("09-panel-03-natural-ground.png", "11-korea-scroll-ground"),
)


def encode_panel(source_name: str, output_stem: str, quality: int) -> None:
    source = SOURCE_DIR / source_name
    if not source.is_file():
        raise FileNotFoundError(source)

    with Image.open(source) as image:
        if image.size != SOURCE_SIZE:
            raise ValueError(
                f"{source.name} is {image.size}; expected {SOURCE_SIZE}"
            )
        rgb = image.convert("RGB").resize(PANEL_SIZE, Image.Resampling.LANCZOS)
        rgb = rgb.filter(
            ImageFilter.UnsharpMask(radius=0.8, percent=48, threshold=3)
        )
        gallery_output = GALLERY_DIR / f"{output_stem}.webp"
        public_output = PUBLIC_DIR / f"{output_stem}.webp"
        rgb.save(gallery_output, "WEBP", quality=quality, method=6)
        shutil.copy2(gallery_output, public_output)

    shutil.copy2(source, VARIANTS_DIR / f"{output_stem}-source.png")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--quality", type=int, default=90)
    args = parser.parse_args()

    VARIANTS_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    for source_name, output_stem in PANELS:
        encode_panel(source_name, output_stem, args.quality)


if __name__ == "__main__":
    main()
