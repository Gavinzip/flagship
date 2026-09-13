# Flagship Test — session handoff

Updated: 2026-09-13. Repository: /Users/gavin/Documents/flagship. Local branch: `Test` (exact case).

## User request and current state

Keep the current dark galaxy IP design and deploy it as an independent Zeabur project on the specified server. The user plans to continue a larger redesign in a new session.

- Project: **Flagship Test**, ID `6aa69a7d305ae4dcaafe9481`.
- Server: **Tencent Tokyo 4C 8GB**, ID `6a0a6c754b1a018c4f76569f`.
- Environment: `6aa69a7d29e2f8785ee12cbc`.
- Website service: `flagship-test`, ID `6aa69aae305ae4dcaafe948c`.
- Domain: `flagship-test.zeabur.app`; trusted HTTPS and live browser verification passed. The site is deployed.
- Service source is **GITHUB**, Git trigger `Test`, root `/`; `spec.source.dockerfile` confirmed `null`.
- GitHub: `Gavinzip/flagship`, repo ID `1319020887`. Intended branch: `Test`.
- User explicitly authorized **push** on 2026-09-13. `2dcf2a2` was pushed to origin/Test. The scoped CSP correction `5e0dd12` was also pushed and verified live under the same authorization.
- Existing production project `6a6d8ed2d3dbd8abbc454a05` and its website/queue/Redis services were not changed.

## Prepared release

- IP home renders only the selected dark galaxy. Old `theme=light` URLs normalize to `theme=dark`.
- Logo proportions, country treatment, pointer-following metallic borders, sponsor layout, initial language pill and scrolled navigation are preserved.
- Geographic Korea/Taiwan transitions retain the accepted motion implementation.
- `src/config/site.json` holds this branch's test URL, noindex and analytics-disabled settings. Before any future production merge, explicitly decide the production URL/indexing/analytics settings.
- Selected optimized galaxy, Korea fragments, event photos and video were copied into maintained `public/assets/flagship/` and published on immutable R2 release `rb8a20b5a593353029c70`.
- CDN base: `https://flagship-cardshow-media.tree-gavin.workers.dev`.
- 74 CDN objects (13.42 MiB total inventory) verified byte-for-byte, correct MIME and immutable cache. This total is the entire asset collection, not first-page transfer.
- Production build contains four named hashed logo/visual WebPs, 1,222,492 bytes total; all other media stays on CDN. No original candidate PNG or MP4 is copied into dist.
- Main JS: 447.48 KB / gzip 145.86 KB. Globe chunk: 761.18 KB / gzip 213.06 KB. Existing Vite >500 KB chunk advisory remains for the lazy-loaded globe.
- `npm run build` passed (TypeScript, Vite, route HTML, CSP, asset budgets).
- Clean staged-file checkout build also passed without work/ or unused local assets. CDN recap video loaded readyState 4, duration 30.058 seconds.
- Local production preview on port 4178; production verification is complete as recorded below.

## Release verification procedure

1. For future changes, confirm the user has authorized that push. Push only `Test` to origin; never push main implicitly.
2. Configure new service's Git trigger with repo ID `1319020887`, branch `Test`, environment ID above. Keep root `/`, Dockerfile override `null`. Use repository root Dockerfile; never deploy_from_specification with a Dockerfile path/content override.
3. Start deployment from the pushed commit if setting the trigger does not start it. Read build logs to confirm GitHub clone and `load build definition from Dockerfile`.
4. Verify resulting RUNNING deployment and exact commit, then public HTTPS response and actual globe → Korea/Taiwan navigation.
5. Check HTML/API/auth/socket no long cache, valid hashed JS/CSS/font assets gzip or Brotli + immutable cache, genuine missing-asset 404, CDN images/video and byte sizes. Existing Caddy config uses gzip/zstd and immutable matching for existing hashed assets only.
6. Update this handoff with the deployed commit, deployment ID, live URL, and checks. Do not claim deployment based on local preview or provider RUNNING alone.

## Working boundaries

- Ask before push, per user-supplied AGENTS instructions.
- Original candidate images and review artifacts are retained; no image deletion was authorized.
- `work/`, `outputs/`, `videos/`, `design/promo/`, and the separate `flagship-venue-3d/` study stay local. Do not stage them.
- Old unused art in `src/flagship/assets/` stays local unless explicitly needed; the release stages only the four current bundled assets.
- Existing `.env.production` still references the existing public queue API; this task did not clone queue infrastructure or use queue administration controls.
- No new application fallback was introduced.
- Dedicated Zeabur connector calls were slow. Authenticated public GraphQL using the user's existing CLI credentials succeeded; do not expose credential values or save them in the repo.

## Deployment correction on 2026-09-13

The initially empty service had source type LOCAL. Updating only the Git trigger did not change that type; deploy picked main. Two attempts were canceled. Source is now GITHUB, with repo/branch bound through updateGitTrigger. Do not use deploy on a LOCAL-source service for this GitHub release.

Deployment `6aa69f288eb543d8d10c254a` correctly built Test commit `2dcf2a2`, cloned GitHub, loaded the repository Dockerfile, and reached RUNNING. Live QA exposed a hash-CSP gap: dynamic imports lacked integrity-bearing module preloads and were blocked by script-src-elem. `scripts/generate-csp.mjs` now declares SHA-384 for every split JS module and emits integrity-bearing modulepreload links. Strict-dynamic, Trusted Types and the inline-script restrictions remain enabled. Local reproduction under the exact production CSP passed globe initialization and both Korea/Taiwan geographic entry transitions. No application fallback was added.

## Verified live release

- URL: **https://flagship-test.zeabur.app/?lang=zh-TW&theme=dark**
- Functional release commit: `5e0dd12eadfd767f1e2eaa63850b35b7175c4f47`. Deployment: `6aa6a1178eb543d8d10c25a6`, RUNNING. This documentation-only follow-up may advance the deployment commit without changing assets.
- GitHub push automatically started that deployment on the Test branch. Build logs confirm GitHub clone and repository Dockerfile; source GITHUB, root `/`, override null.
- HTTPS verified without bypass; HTML returns 200/no-cache, recorded TTFB 0.144 seconds.
- All emitted JS and CSS requested by the home page returned 200, gzip, immutable cache. Downloaded JS bytes match the declared SHA-384 integrity.
- Missing hashed asset request returned genuine 404/no-cache. `/api/release-check`, `/auth/callback`, `/socket.io/` currently use the existing SPA document response (200/no-cache); these probes are not evidence of API functionality.
- CDN galaxy and video returned 200 with immutable headers.
- Live browser: globe data-ready=true, one canvas on IP; Korea and Taiwan geographic entry both finish with the matching edition, no retained transition overlay, zero globe canvases, and no broken loaded images. English language selection updates URL/copy while preserving the globe.
- Source/CSP tests retained strict-dynamic, script hashes, Trusted Types, and unsafe-inline script restrictions. No new fallback.
- Release evidence (local, retained): `/Users/gavin/Documents/CodexArtifacts/flagship/2026-09-13-test-deployment/` — three live screenshots, build log JSON, HTTP verification JSON. Temporary test server and inspection scripts are removed after verification.
