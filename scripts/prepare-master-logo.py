"""Restore the alpha matte of the selected master artwork without repainting it.

The selected RGB source contains a baked checkerboard. Flood only the neutral
background connected to the exterior and the inspected gaps beside the L.
The enclosed silver letter faces remain opaque. Source pixels are never changed.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "design/source-artwork/flagship-master-approved.png"
OUTPUT = ROOT / "outputs/brand/flagship-master-transparent.png"
WEBP = ROOT / "src/flagship/assets/brand/flagship-master.webp"

source = Image.open(SOURCE).convert("RGB")
assert source.size == (1670, 941), "Reinspect matte seeds if the source changes."
rgb = np.array(source)
neutral = (rgb.max(2).astype(int) - rgb.min(2).astype(int) <= 13) & (rgb.min(2) >= 185)
regions = Image.fromarray(np.where(neutral, 255, 0).astype("uint8")).copy()
seeds = [(0, 0), (758, 250), (748, 265), (770, 280), (775, 300), (766, 325), (755, 350), (747, 380), (731, 417)]
for seed in seeds:
    if regions.getpixel(seed) == 255:
        ImageDraw.floodfill(regions, seed, 128, thresh=0)
alpha = Image.fromarray(np.where(np.array(regions) == 128, 0, 255).astype("uint8"))
alpha = alpha.filter(ImageFilter.GaussianBlur(0.25))
result = source.convert("RGBA")
result.putalpha(alpha)
assert result.getchannel("A").getextrema() == (0, 255)
assert result.getpixel((0, 0))[3] == 0
assert result.getpixel((400, 550))[3] == 255, "The silver F face must remain opaque."
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
result.save(OUTPUT)
result.save(WEBP, "WEBP", quality=94, method=6)
print(f"Restored RGBA matte: {OUTPUT}; WebP: {WEBP.stat().st_size:,} bytes. Original retained.")
