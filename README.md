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
- `src/components/`：依頁面區塊拆分的 React 元件
- `src/styles/`：共用樣式與各活動區塊的獨立響應式樣式
- `public/assets/`：網站實際使用且已壓縮的圖片
- `vite.config.ts`：由活動設定產生 SEO 結構化資料與 `.ics` 行事曆檔

## 待主辦單位確認

- 票務與入場方式
- 重複入場規則
- 個人交換與交易規範
- 完整節目時程
- 攤商名單與攤位配置
