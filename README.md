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

## 早鳥入場時段登記

網站內建的 React 表單會顯示伺服器目前的剩餘名額，並讓已完成早鳥預約的參加者使用 Gmail 選擇入場時段。送出前會核對匯入的 Luma 早鳥名單；每個合資格 Gmail 只能登記一次，而且每次固定登記 1 張早鳥票、扣除 1 個入場名額。Luma 匯入資料中的原始票數只用於匯入對帳，不會改變登記扣額。時段額滿、`cutoff_at` 到期或入場時段已開始後，Worker 會在同一筆條件式寫入中拒絕送出，前端數字不具備最終扣額權限。資料庫同時禁止截止時間晚於入場開始時間，避免營運資料誤設後開放過期登記。

資料與程式位置：

- `cloudflare/reservations/reservation-worker.ts`：名額查詢、Gmail 驗證與原子登記
- `cloudflare/reservations/migrations/`：D1 schema 與正式時段資料 migration
- `shared/reservations/`：前後端共用的 Gmail、時段狀態與錯誤碼規則
- `src/reservations/`：前端 API、15 秒同步、伺服器時間校正與流程狀態
- `src/components/ReservationFlow.tsx`：共用於頁面與 modal 的流程組合層
- `src/components/reservation/`：選擇、確認、成功與可用性畫面

本機啟動：

```bash
pnpm reservation:migrate:local
pnpm reservation:dev
pnpm dev
```

正式環境必須先建立 `flagship-early-bird-reservations` D1 database，將 Wrangler 回傳的真實 `database_id` 寫入 `cloudflare/reservations/wrangler.jsonc`，再依序執行：

```bash
pnpm reservation:migrate:remote
pnpm reservation:deploy
pnpm reservation:verify:live
pnpm build
```

目前 migration 只建立資料表，刻意沒有放入推測的正式時段或容量。主辦單位確認每個時段的中英文名稱、開始時間、結束時間、截止時間及名額後，應新增下一個 migration 寫入 `reservation_slots`，不可直接修改已套用的 migration。

### 匯入 Luma 早鳥名單

在 Luma 活動後台進入 `Manage → Guests`，下載完整 Guest CSV。匯出檔包含姓名與個資，不可放入 Git；本專案已忽略 `private/` 與 `*.luma-guests.csv`。

先只看統計，不寫入資料庫，也不會輸出任何 Gmail：

```bash
pnpm reservation:eligibility:import -- /path/to/luma-guests.csv
```

統計會分開顯示 approved 票數、唯一 Gmail 數、群組票數、非 Gmail 票數及票種。工具支援每張票一列，也會在 CSV 有 `Ticket Quantity`、`Number of Tickets`、`Ticket Count` 或 `Quantity` 欄時按數量計算；同一 Gmail 的多列或多張票會合併成 `source_ticket_count`，只供來源資料對帳。實際登記仍固定扣除 1 個名額。

確認統計後才套用本機名單：

```bash
pnpm reservation:eligibility:import -- /path/to/luma-guests.csv \
  --ticket-type="Standard" \
  --expect-csv-rows=1457 \
  --expect-approved-tickets=1457 \
  --expect-selected-tickets=1457 \
  --apply-local --replace
```

正式匯入屬外部資料寫入，只能在取得發布同意、套用 migrations 且確認 D1 目標後執行：

```bash
pnpm reservation:eligibility:import -- /path/to/luma-guests.csv \
  --ticket-type="Standard" \
  --expect-csv-rows=1457 \
  --expect-approved-tickets=1457 \
  --expect-selected-tickets=1457 \
  --apply-remote --replace \
  --confirm-remote=IMPORT-EARLY-BIRD-GUESTS
```

以上 `Standard` 與 `1457` 只是目前公開 Luma 頁面觀察到的值，執行前仍須用實際 CSV dry run 結果及主辦方確認值替換。Apply 必須明確指定完全相符的票種名稱，以及預期 CSV 列數、全部 approved 票數與所選票種票數；任一對不上就停止，避免截斷檔或其他票種覆蓋正式資格名單。

若 CSV 內有已核准但不是 Gmail 的票，工具預設停止，不會悄悄排除。只有主辦方明確決定這些票不適用時，才能額外加上 `--exclude-non-gmail`。

目前採 Gmail 文字輸入並核對匯入的原 Luma 名單，不包含 Google OAuth 或信箱所有權驗證。名單核對能阻止不在早鳥名單內的 Gmail，但知道他人 Gmail 的人仍可能代為登記；若要驗證本人，仍需 Google OAuth 或一次性驗證信。

`pnpm reservation:verify:live` 會直接檢查正式 health、時段資料、`Cache-Control: no-store`、CORS、台北時區、容量與剩餘名額，不會送出或更動預約。Health 只有在時段與合資格名單都存在，而且全部時段總容量不少於合資格 Gmail 數時才回傳成功；正式 API 尚未部署或資料未完整時，此檢查必須失敗。

## 現場即時叫號

叫號系統使用獨立的 Zeabur Node worker 與同專案 Redis。Redis 保存唯一狀態並原子發號，worker 透過 Server-Sent Events 即時推送到所有開啟中的頁面；沒有輪詢或前端自算的替代資料源。

- 公開頁：`/now-serving`
- 管理頁：`/queue-admin#token=<QUEUE_ADMIN_TOKEN>`
- 現場 QR 展示頁：`/queue-qr#token=<QUEUE_JOIN_TOKEN>`（主辦方開啟並展示／下載）
- 現場取號頁：`/join-queue#token=<QUEUE_JOIN_TOKEN>`（QR Code 指向此網址）
- `services/queue-worker/src/redisQueueRepository.ts`：Redis 原子發號與持久化目前號碼／取號資料
- `services/queue-worker/src/httpServer.ts`：公開讀取、管理更新、現場取號與 token 驗證
- `services/queue-worker/src/sseHub.ts`：跨 worker 實例的 Redis Pub/Sub 與 SSE 廣播
- `src/queue/`：路由、API、即時連線與資料驗證
- `src/components/QueuePage.tsx`：公開顯示、管理控制台與現場取號頁

管理頁不需要帳號登入；完整網址中的 fragment token 就是管理權限。Fragment 不會送到網站伺服器，也不會寫進 Git 或前端 bundle。正式服務的高熵 token 只設定在 Zeabur `queue-worker` 環境變數，而且不要把 token 放在 query string：

```text
REDIS_URL=<Zeabur Redis URI>
QUEUE_ADMIN_TOKEN=<high-entropy admin token>
QUEUE_JOIN_TOKEN=<high-entropy onsite token>
ALLOWED_ORIGINS=https://tcgflagship.com,https://www.tcgflagship.com
```

主辦方使用 `/queue-qr#token=<QUEUE_JOIN_TOKEN>` 顯示或下載現場 QR Code；這個展示頁不會取號。QR Code 內容是 `/join-queue#token=<QUEUE_JOIN_TOKEN>` 完整網址。手機首次掃描開啟時會先在瀏覽器建立 UUID，再由 Redis Lua script 原子分配下一個號碼；UUID 同時是 idempotency key，因此重複請求、網路重試和重新整理不會多取一號。取號結果只保存 UUID、號碼和發號時間，不收集姓名、電話、Email 或其他個資。成功取號後會從網址列移除 fragment token。

若瀏覽器中已存在但格式損壞的取號 UUID，頁面會停止並明確請參加者洽現場工作人員，不會把損壞資料當成尚未取號而自動重發新號。

此流程刻意不要求登入，因此只能做到「同一瀏覽器儲存空間保留同一號碼」。清除網站資料、使用另一個瀏覽器／無痕模式或把 QR 網址轉傳給別人，仍可能取得新的號碼；若未來要做到一人一號，需要增加身份或裝置驗證，不能用前端限制假裝達成。

本機驗證 worker 時可連接本機 Redis，並用非正式 token 啟動：

```bash
REDIS_URL=redis://127.0.0.1:6380 \
PORT=8790 \
QUEUE_ADMIN_TOKEN=local-queue-admin-token-at-least-32-characters \
QUEUE_JOIN_TOKEN=local-queue-join-token-at-least-32-characters \
ALLOWED_ORIGINS=http://127.0.0.1:5174 \
pnpm queue:start
```

再開啟：

```text
http://127.0.0.1:5174/now-serving
http://127.0.0.1:5174/queue-admin#token=local-queue-admin-token-at-least-32-characters
http://127.0.0.1:5174/queue-qr#token=local-queue-join-token-at-least-32-characters
http://127.0.0.1:5174/join-queue#token=local-queue-join-token-at-least-32-characters
```

正式啟用時，Zeabur `queue-worker` 從 `main` 自動部署，Root Directory 設為 `services/queue-worker`，並使用該服務根目錄的 `Dockerfile`；Zeabur 後台 Dockerfile 覆寫維持空白。只完成本機 build 不代表叫號系統已上線。

## 待主辦單位確認

- 票務與入場方式
- 重複入場規則
- 個人交換與交易規範
- 完整節目時程
- 攤商名單與攤位配置
