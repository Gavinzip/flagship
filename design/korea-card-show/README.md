# FLAGSHIP 韓國卡展素材

更新：2026-09-14。這個資料夾是 Gavin 與後續 agent 共用的韓國素材入口。

先打開 [素材總覽](index.html)，看圖後直接用 **01–12** 溝通，例如「01 主海報」「09 天空」「10 城市」「11 地面」。總覽可以離線開啟，不需要網站伺服器。

## 固定編號

| 編號 | 圖片 | 來源類型 | 尺寸 | 同一素材的其他版本 |
|---|---|---|---|---|
| **01** | [韓國主海報](01-korea-main-poster.webp) | 提供的主視覺／現存 WebP 副本 | 1600 × 893 | — |
| **02** | [韓國原始 Logo](02-korea-logo-original.png) | 提供的原始 Logo | 1672 × 941 | [目前網頁版本（修正缺角）](source-and-variants/02-korea-logo-web.svg) · [無損色彩層](source-and-variants/02-korea-logo-color.webp) · [舊去背版，僅供對照](source-and-variants/02-korea-logo-transparent.webp) |
| **03** | [韓國攤商宣傳圖](03-korea-vendor-poster.jpg) | 提供的宣傳參考图 | 1600 × 903 | — |
| **04** | [天空延伸圖](04-korea-sky.webp) | 舊版延伸素材，保留參考 | 1672 × 941 | [04 的生成 PNG 來源](source-and-variants/04-korea-sky-source.png) |
| **05** | [首爾城市與河岸](05-korea-city.webp) | 舊版延伸素材，保留參考 | 1672 × 941 | [05 的生成 PNG 來源](source-and-variants/05-korea-city-source.png) |
| **06** | [透明空卡框](06-korea-card-frame.webp) | 目前採用的 AI 延伸素材 | 1024 × 1536 | [06 的生成 PNG 來源](source-and-variants/06-korea-card-frame-source.png) |
| **07** | [河面與步道](07-korea-river.webp) | 舊版延伸素材，保留參考 | 1672 × 941 | [07 的生成 PNG 來源](source-and-variants/07-korea-river-source.png) |
| **08** | [自然雲連續母圖](08-korea-continuous-scroll-master.png) | 已停用的上一版連續母圖，保留紀錄 | 965 × 1630 | [舊漩渦雲版本](source-and-variants/08-korea-continuous-scroll-master-v1-cloud-vortex.png) |
| **09** | [自然天空 2K 段](09-korea-scroll-sky.webp) | 韓國內頁目前實際使用 | 2048 × 1152 | [ImageGen PNG 來源](source-and-variants/09-korea-scroll-sky-source.png) |
| **10** | [首爾與漢江 2K 段](10-korea-scroll-city.webp) | 韓國內頁目前實際使用 | 2048 × 1152 | [ImageGen PNG 來源](source-and-variants/10-korea-scroll-city-source.png) |
| **11** | [河岸地面 2K 段](11-korea-scroll-ground.webp) | 韓國內頁目前實際使用 | 2048 × 1152 | [ImageGen PNG 來源](source-and-variants/11-korea-scroll-ground-source.png) |
| **12** | [網頁連續長背景](12-korea-scroll-continuous.webp) | 已停用的上一版網站背景，保留紀錄 | 1672 × 2823 | [完整 PNG 來源](source-and-variants/12-korea-scroll-continuous-source.png) |

## 這個資料夾代表什麼

- 01–03 是已提供的韓國主視覺、Logo 和攤商宣傳參考。01 是目前專案保存的 WebP；完整主海報原始 PNG/設計分層檔尚未找到。02 是原始 Logo PNG，03 是保存的 JPG。
- 04–07 是前一版網站使用的 AI 延伸素材，並非原海報的 PSD 原生分層；現在保留為構圖與來源參考。
- 08 是使用者指定 2 號方向後修正自然雲層的上一版連續母圖。09–11 是同一方向的三個完整 16:9 畫面，各自輸出為 2048 × 1152；12 是已停用的 1672 × 2823 連續 WebP。
- 韓國內頁把 09、10、11 排成同一個背景世界，從天空下降至首爾、漢江、河岸與地面。09／10 先對齊山稜與城市天際線，10／11 再對齊河面與欄杆；圖片只在對齊處使用窄幅羽化，避免硬切或大面積重影。背景位移直接對應頁面捲動比例。
- `source-and-variants/` 收錄 02 的網站透明版本、04–07 的 PNG 來源及原生成提示。主目錄中的 WebP 是實際網頁用途的現存版本。
- 原始圖片與既存延伸圖採取複製歸檔，SHA-256 與來源逐一相同；原位置、其他任務素材、未選候選及平台快取都保留。02 額外建立網頁用無損 WebP 與 SVG 顯示輪廓，修正去背缺角；沒有新增 AI 圖片、改色或刪除原圖。
- 舊漩渦雲母圖放在 `source-and-variants/` 留作差異證據；其他未採用候選仍在原本的 `work/generated-images/`。品牌全球版 Logo、台灣素材也沒有當成韓國素材收進來。

## 內容尚待核對

- **01 主海報**：底部文字仍含 `IN TAIWAN`，不能直接沿用為韓國網站文案。
- **03 攤商宣傳圖**：圖面印有 `26.09.2026` 及場地字樣；這裡保留圖面證據，不把模糊的場地字樣猜成正式資料，也不把攤商模板當成已確認的完整參展名單。
- **網站資料**：韓國正式日期、場地、報名尚未定案。依本輪要求，韓國內頁暫用台灣 2026 場內容，畫面有標明參考來源；韓國報名尚未開放。

## 後續維護

1. 先從這個總覽找素材；引用固定編號與名稱，不只說「那張圖」。
2. 不重排現有編號。新的已確認素材從 13 接續；同一素材衍生版本沿用同編號放入 `source-and-variants/`。
3. 新生成候選先進 `work/generated-images/<日期或任務>/`，使用者選定後再加入這裡；不得自行清掉未選候選或原始提供圖。
4. 修改清單時同步 `manifest.json` 的來源、用途、尺寸和 SHA-256，以及本 README / 縮圖總覽。
5. 這是素材與設計交接資料夾，不是正式部署素材目錄；不要把整包拷進 public 或 dist。網站本機只使用 `public/assets/flagship/09-korea-scroll-sky.webp`、`10-korea-scroll-city.webp`、`11-korea-scroll-ground.webp`，正式發布仍需另建 immutable CDN release。

目前韓國頁的背景问题與重做方向見 [頁面檢查](page-review.md)。

## 02 Logo 顯示版本維護

目前以原 PNG 的無損 WebP 色彩層，加上 `src/flagship/data/koreaEmblemContour.ts` 的外輪廓顯示。色彩層與原 PNG 的 RGB 像素逐一一致；下緣沿外部金屬弧線保留，不再把黑色圖案誤判為背景。

需要重建網頁色彩層或本資料夾的 SVG 預覽時，使用含 Pillow 的 Python 執行 `scripts/export-korea-logo.py`，並同步 manifest 中的新檔案 hash。舊 `prepare-korea-emblem.py` 的侵蝕去背輸出不再供網站使用。
