# FLAGSHIP Card Show

FLAGSHIP 的跨城市品牌主站。預設呈現 Korea 下一站，Taiwan 2026 保留為歷屆展會；切換展會會更新整站主題、主視覺與活動資訊。支援 English、한국어、繁體中文。

設計來源、維護方式與本機驗證紀錄見 [FLAGSHIP 主站說明](docs/flagship-brand-site.md)。

韓國卡展素材統一從 [韓國素材資料夾](design/korea-card-show/README.md) 查找；[01–12 縮圖總覽](design/korea-card-show/index.html) 使用固定編號區分主海報、原 Logo、攤商圖、舊版延伸素材與目前連續背景。

## 本機啟動

```bash
pnpm install
pnpm dev
```

開啟 [http://127.0.0.1:5174/](http://127.0.0.1:5174/)。

正式建置：

```bash
pnpm build
```

## 專案結構

- `src/config/brand.json`：FLAGSHIP 品牌名稱、搜尋描述與主辦資訊
- `src/flagship/data/editions.ts`：當期展會、各站狀態與主視覺
- `src/flagship/data/locales/`：依語言分開維護的網站文案
- `src/flagship/components/`：品牌導覽、展會、體驗、場地與頁尾元件
- `src/flagship/motion/`：ReactSkills 進場與 TiltedCard 動畫元件
- `src/flagship/styles/`：主站基礎、主視覺、段落與響應式樣式
- `src/config/event.json`：台灣 2026 原始活動資料與行事曆資料
- `src/config/media.ts`、`src/styles/`、`src/components/queue/`：既有台灣素材與叫號系統；保留的舊活動元件未掛載於品牌主站
- `public/assets/`：開發環境與 Cloudflare 發布使用的已壓縮來源圖片；正式 build 不會複製這些圖片
- `cloudflare/`：R2 媒體 Worker 與 Wrangler 設定
- `scripts/r2-static-assets.mjs`：資產 audit、發布、正式 URL 驗證與 build 防呆
- `vite.config.ts`：品牌 WebSite 結構化資料與台灣歷屆 `.ics` 行事曆檔

## Cloudflare 圖片發布

正式圖片存放在 `flagship-cardshow-media` R2 bucket，經由以下專用入口提供：

```text
https://flagship-cardshow-media.tree-gavin.workers.dev
```

物件使用內容雜湊 release 路徑與一年 immutable cache。修改或新增圖片後依序執行：

```bash
pnpm assets:audit
pnpm assets:publish
pnpm assets:verify
pnpm build
```

圖片品質規則：只發布 `public/assets/` 內的原始尺寸檔案，不建立降尺寸或重新壓縮版本。`assets:verify` 會下載 Cloudflare 正式檔並比對 SHA-256，確保與本機原檔逐位元一致。

目前 IP 銀河、韓國背景、活動照片與影片的發布來源集中在 `public/assets/flagship/`，同樣經內容雜湊 R2 release 提供。原始候選圖保留在被 Git/Docker 排除的 `work/`。

只有 Worker 程式本身變更時才需要：

```bash
pnpm assets:deploy-gateway
```

正式 build 缺少 CDN 設定或夾帶未允許的活動圖片時會直接失敗，不會退回本機圖片。四個品牌／韓國標誌與主視覺是明確允許的例外：放在 `src/flagship/assets/`，透過 Vite 產生內容雜湊網址，並依 `src/flagship/data/artwork-budget.json` 的個別預算檢查；其餘活動素材由 R2 提供。

`src/config/site.json` 集中設定該分支的網址、搜尋索引與分析開關。`Test` 使用獨立測試網址、noindex，並關閉 GA，避免測試瀏覽混入正式數據。

## 現場即時叫號

叫號系統使用獨立的 Zeabur Node worker 與同專案 Redis。Redis 保存唯一的目前叫號狀態，worker 透過 Server-Sent Events 即時推送到所有開啟中的頁面；沒有輪詢或前端自算的替代資料源。

- 公開頁：`/now-serving`
- 管理頁：`/queue-admin#token=<QUEUE_ADMIN_TOKEN>`
- `services/queue-worker/src/redisQueueRepository.ts`：Redis 持久化目前叫號狀態
- `services/queue-worker/src/httpServer.ts`：公開讀取、管理更新與管理 token 驗證
- `services/queue-worker/src/sseHub.ts`：跨 worker 實例的 Redis Pub/Sub 與 SSE 廣播
- `src/queue/`：路由、API、即時連線與資料驗證
- `src/components/QueuePage.tsx`：公開顯示與管理控制台

管理頁不需要帳號登入；完整網址中的 fragment token 就是管理權限。Fragment 不會送到網站伺服器，也不會寫進 Git 或前端 bundle。正式服務的高熵 token 只設定在 Zeabur `queue-worker` 環境變數，而且不要把 token 放在 query string：

```text
REDIS_URL=<Zeabur Redis URI>
QUEUE_ADMIN_TOKEN=<high-entropy admin token>
ALLOWED_ORIGINS=https://tcgflagship.com,https://www.tcgflagship.com
```

本機驗證 worker 時可連接本機 Redis，並用非正式 token 啟動：

```bash
REDIS_URL=redis://127.0.0.1:6380 \
PORT=8790 \
QUEUE_ADMIN_TOKEN=local-queue-admin-token-at-least-32-characters \
ALLOWED_ORIGINS=http://127.0.0.1:5174 \
pnpm queue:start
```

再開啟：

```text
http://127.0.0.1:5174/now-serving
http://127.0.0.1:5174/queue-admin#token=local-queue-admin-token-at-least-32-characters
```

正式啟用時，Zeabur `queue-worker` 從 `main` 自動部署，Root Directory 設為 `services/queue-worker`，並使用該服務根目錄的 `Dockerfile`；Zeabur 後台 Dockerfile 覆寫維持空白。只完成本機 build 不代表叫號系統已上線。

## 待主辦單位確認

- 票務與入場方式
- 重複入場規則
- 個人交換與交易規範
- 完整節目時程
- 攤商名單與攤位配置
