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

## 待主辦單位確認

- 票務與入場方式
- 重複入場規則
- 個人交換與交易規範
- 完整節目時程
- 攤商名單與攤位配置
