# Thailand video hero — local review, 2026-10-20

Gavin requested the Taiwan recap shown in the main-site dialog as the Thailand
hero background, looping the original 00:45–01:00 range. This supersedes the
static card-background layout; the retained artwork and source footage remain.

- Original: `public/assets/flagship/taiwan-2026-official-recap.mp4`.
- Encoding source: `work/source-media/flagship-taiwan-recap-2097656279695245394/source-1080p.mp4`.
- Exact source range: 45.000–60.000 seconds; output duration 15.000 seconds.
- Crop: 1920 × 936 from (0, 144), avoiding the burned-in upper logo row.
- Runtime: `thailand-hero-recap-45-60.mp4`, 1920 × 936, H.264, 30 fps,
  no audio stream, fast-start MP4. The poster is its first frame in WebP.
  Quality revision preserves native source resolution with libx264 preset slow,
  CRF 18, maxrate 8000k, bufsize 16000k, yuv420p and GOP 60. The MP4 is
  15,826,235 bytes (15.09 MiB); its 1920 × 936 poster is encoded at WebP quality 90.
  This replaces the former 1280 × 624 / CRF 24 / 4.54 MiB derivative.
  The original 1080p source sets the available detail; no artificial upscaling
  or sharpening is applied.
- Media is delivered through the independent immutable Thailand CDN release.
  Original source/concepts are excluded from the production bundle.
- Native video looping supplies the exact 15-second segment, with no JavaScript
  timer seeking through the complete original film. Playback pauses off screen
  and in a hidden tab. At Gavin’s subsequent request the visible pause/play control is removed;
  system reduced-motion preferences keep this decorative background still.
- White copy and yellow event details sit over a dark video scrim. The original
  transparent Thailand emblem stays independent and remains the geographic
  handoff target on desktop and mobile. The source credit identifies Taiwan.

Build/browser verification is a review input. Final visual acceptance and Git
push remain pending; no image candidates or original media are deleted.

## Verification

- `pnpm build` and TypeScript passed; the existing production asset audit passed.
- Encoded media reports exactly 15.000 seconds, 1920 × 936, H.264/30 fps and no audio stream.
- Immutable release `r5d83a22f502484392fa1`: all nine objects verified byte-for-byte, with correct content types and immutable cache headers. MP4 range request returns HTTP 206, with a measured first byte of 0.95s on the verification connection. Native browser playback reports 1920 × 936, 15.000 seconds, and no console warnings/errors.
- HQ revision at 1280px and 390px: muted playback, native loop, viewport pause and inline playback verified; no horizontal overflow.
- Mobile globe entry → video hero and video hero → globe completed without console warnings/errors.
- HQ desktop/mobile review screenshots are in `work/screenshots/thailand-video-hero-hq-*-2026-10-20.png`. Temporary contact sheet was removed after notification; original footage, retained artwork and runtime derivatives remain.

## Element-by-element revision

Gavin requested an 8% tighter video crop, no visible playback control or technical
playback instructions, a borderless FLAGSHIP master-logo loader with measured rail
over a subtle black/yellow gradient, and the original Renaiss Protocol organizer
mark under the left-aligned footer title. These changes are local review only.

The Thailand reveal hook observes individual content pieces after route admission;
55 pieces use short 0–220ms stagger offsets, a 16px rise and 3px resolving blur.
It disconnects observers and cancels animations on teardown, removes completed
fill effects, and leaves content readable with reduced motion or paused effects.
The company mark reuses the existing organizer asset; no replacement brand art,
new AI image, runtime media fallback or Git push was introduced.

Traditional Chinese copy was revised using Humanizer. Before/after passages and
three-model measurement evidence are adjacent in copy-review and detector JSON
files. The full revised scope was measured, but the configured <5% target was
not met on every segment/model. Dates, venue, planned booth/table counts and
pending announcements remain factual; the detector threshold is not represented
as passed or as visual/voice acceptance.

## Reveal flash correction

The previous scroll observer created its animation only once the piece was
already visible, resetting its fully rendered appearance back to the dimmed
first frame. The reveal hook now prepares and pauses each animation in a layout
effect before paint, behind admission, and only plays that prepared animation
when it approaches 64px below the viewport. Reduced/paused motion remains static;
resuming never resets content already on screen. Completed pieces stay settled
and do not replay on reverse scroll.

Browser verification at 1194px and 390px confirmed pending pieces already have
opacity 0.18 before entering view, then advance toward 1 without a visible
reset. Reverse/re-entry left all sampled pieces at opacity 1 with no transform
or blur. Rapid anchor navigation also uses prepared starting frames. Build and
asset budgets passed; no temporary test files, fallback, or Git push were added.
Local visual review remains pending.

## Thai language and publication request

The event header now uses a dark, keyboard-accessible language menu with an
explicit selected state, including an upward-opening mobile menu. Thai copy
covers the Thailand event and the master/world site, including visitor
directions, partners, FAQ and admission status. Locale URLs and metadata retain
Thai through reloads and the globe return/entry journey. Archive editions expose
only their published languages; Thai links to Taiwan/Korea explicitly open English.

Gavin explicitly requested pushing this accumulated iteration to `Test` on
2026-10-20. TypeScript, the production build, CSP generation and asset budgets
passed before the push. Build/visual checks and a Git push do not establish
completion of the hosted deployment. Original media, image candidates and local
review screenshots remain outside the production bundle.

## Published editions correction — local review

Gavin clarified that there is no FLAGSHIP Korea edition. The published registry,
route mount, globe coordinates/markers/selection order, home/footer links and
brand copy now expose only Taiwan and Thailand. Thailand is chapter 02. The four
language versions no longer describe a Korean FLAGSHIP event or stop. HTML
generation, social metadata, sitemap and llms output omit the Korea edition; the
build no longer includes its emblem or key visual. The former route and legacy
edition query no longer mount an event. Caddy explicitly returns 404 for those
URLs when this source is deployed.

Gavin separately confirmed retaining the real BNB Seoul Super Meetup recap. Its
three photographs and source captions remain; the heading and navigation now
identify BNB/Renaiss rather than suggesting another FLAGSHIP edition. Historical
Korea source studies and original media remain preserved, disconnected from the
public route graph. No candidate images or original media were deleted.

A responsive recheck exposed an existing camera scheduling problem: the globe's
intersection observer could suspend rendering while the mobile entry control
was being used above it. Active entry/return/departure motion now keeps its own
render frames while the document is visible; idle off-screen rendering still
pauses. This preserves the original camera animation and adds no fallback.

TypeScript, production build, CSP generation and asset budgets pass. Public HTML,
sitemap/llms, emitted media and JS were checked for retired edition content.
Browser checks cover all four language selectors, two globe choices, Taiwan
entry/return and mobile Thailand entry/return, with a stable restored scroll
position and no overflow or console warnings/errors. The old `/korea/` URL returns 404 in the
local preview; the legacy query shows the existing page-not-found state. Hosted
server/header behavior remains a separate deployment check.

Desktop/mobile evidence: `work/screenshots/flagship-two-editions-*-2026-10-20.png`.
Gavin withdrew the earlier main merge instruction and requested another review.
These changes stay local on Test until he approves merging/pushing main again.

Gavin subsequently requested `push`, authorizing this reviewed change and the
Test-to-main merge. The production merge retains main's Vercel integration and
restores the production canonical URL, indexing and analytics settings. Git
publication and hosted deployment verification are recorded separately.
