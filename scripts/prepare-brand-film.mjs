import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { parseArgs } from "node:util";

// A silent, lightweight website loop from the existing Taiwan event photographs.
// Source photographs remain untouched; this requires the complete FFmpeg filter set.
const { values } = parseArgs({ options: {
  ffmpeg: { type: "string" }, photos: { type: "string" }, output: { type: "string" },
} });
if (!values.ffmpeg || !values.photos || !values.output) throw new Error("Provide --ffmpeg, --photos and --output.");
const names = ["crowd-hero", "binder-exchange", "players-table", "handshake", "crowd-hero"];
const inputs = names.flatMap(name => ["-loop", "1", "-framerate", "24", "-t", "4", "-i", resolve(values.photos, `${name}.jpg`)]);
const filters = names.map((_, index) => {
  const zoom = index === 4 ? "1+0.025*(1+cos(PI*min(on,76)/76))/2" : "1+0.025*(1-cos(PI*on/95))/2";
  return `[${index}:v]scale=1600:1068:force_original_aspect_ratio=increase,crop=1600:900,zoompan=z='${zoom}':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=1:s=1280x720:fps=24,setsar=1,format=yuv420p,settb=AVTB[v${index}]`;
});
let previous = "v0";
for (let index = 1; index < names.length; index++) {
  const output = `m${index}`;
  filters.push(`[${previous}][v${index}]xfade=transition=custom:duration=0.8:offset=${(3.2 * index).toFixed(1)}:expr='A*(3*P*P-2*P*P*P)+B*(1-3*P*P+2*P*P*P)'[${output}]`);
  previous = output;
}
const result = spawnSync(values.ffmpeg, ["-hide_banner", "-loglevel", "error", "-n", ...inputs,
  "-filter_complex", filters.join(";"), "-map", `[${previous}]`, "-t", "16", "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "25", "-maxrate", "1300k", "-bufsize", "2600k", "-pix_fmt", "yuv420p", "-movflags", "+faststart", values.output,
], { stdio: "inherit" });
if (result.error) throw result.error;
process.exit(result.status ?? 1);
