# Flagship Card Show Taiwan 2026

提供活動參加者使用的單頁活動網站。

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

- `src/config/event.json`：活動名稱、日期、時間、場地與 SEO 的唯一資料來源
- `src/config/media.ts`：網站圖片與 CSS 背景的唯一資產清單
- `src/components/`：依頁面區塊拆分的 React 元件
- `src/hooks/useSiteReadiness.ts`：等待圖片、字型與最終排版完成後才解除載入頁
- `src/styles/`：共用樣式與各活動區塊的獨立響應式樣式
- `public/assets/`：開發環境與 Cloudflare 發布使用的已壓縮來源圖片；正式 build 不會複製這些圖片
- `cloudflare/`：R2 媒體 Worker 與 Wrangler 設定
- `scripts/r2-static-assets.mjs`：資產 audit、發布、正式 URL 驗證與 build 防呆
- `vite.config.ts`：由活動設定產生 SEO 結構化資料與 `.ics` 行事曆檔

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

只有 Worker 程式本身變更時才需要：

```bash
pnpm assets:deploy-gateway
```

正式 build 缺少 CDN 設定或仍夾帶活動圖片時會直接失敗，不會退回本機圖片。

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
