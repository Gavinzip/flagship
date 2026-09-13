# FLAGSHIP 品牌主站

## 2026-09-13：台灣對齊韓國的速度感

使用者偏好韓國的進場節奏。台灣將 Logo 歸位與內容展開併入韓國既有的 1.25 秒推進，兩邊都是 1.25 秒接近 + 1.25 秒推進，移除額外的 850 ms 歸位尾段。Logo 先成長到原頁完整尺寸，再於同一鏡頭過程完成向左歸位，沒有整頁縮放。

另發現台灣會等待被地球遮住的載入畫面 620 ms 退場；從地球进入時跳過這段不可見退場，素材與字體準備檢查仍保留。直接開台灣原頁時仍使用原載入退場。韓國的程式與鏡頭節奏保持不變。錄影與對照位於 `/Users/gavin/Documents/CodexArtifacts/flagship/2026-09-13-matched-tempo/`，尚待使用者審閱。沒有新增 fallback、AI 圖片、commit、push 或部署。

## 2026-09-13：加快台灣 Logo 歸位

依使用者要求加快目前連續銜接：Logo 歸位 1450 → 850 ms；文字／活動卡片展開 850 → 550 ms，延遲由 280–440 → 120–220 ms。只改台灣三個時間值，軌跡、尺寸、緩動曲線與韓國入口不變。審閱影片在 `/Users/gavin/Documents/CodexArtifacts/flagship/2026-09-13-taiwan-faster/`。沒有 commit、push 或部署。

## 2026-09-13：台灣恢復同一 Logo 銜接，再緩慢歸位

使用者否決固定左側 Logo 直接呈現的版本，因為失去原版銜接感。現在台灣恢復原 Logo，從台北地理位置隨地球推進到完整尺寸，延續到原台灣背景；同一個 Logo 再用 1.45 秒平順移到原頁左側，大小維持，文字與活動卡片以輕微向上展開跟進。整個地區頁沒有縮放。保留原頁設計、原 Logo 比例及避免 CSS 進場重播的修正。

韓國仍為使用者通過的 9 月 12 日動作；地球、鏡頭、departure rig、過渡 CSS 的 SHA-256 與本輪前一致，韓國分支的動作計算未改。台灣 `taiwanHandoff.ts` 獨立管理 Logo 推進後的原頁歸位；動畫完成或取消都回收 Animation 並恢復原樣式。

本機影片：`/Users/gavin/Documents/CodexArtifacts/flagship/2026-09-13-taiwan-continuity/taiwan-logo-continuous-final.mp4`。逐格檢查 1440 × 900、390 × 844 和 768 × 1024 CSS 視窗；手機／平板以實际網站 iframe 驗證，非實體裝置。台灣歸位期間 Escape 返回正常，韓國抵達正常；沒有 console warning/error。建置通過，沒有新增 fallback、AI 圖片、commit、push 或部署。尚待使用者審閱動作與美感，不視為已通過。

## 2026-09-13：還原已通過的韓國入口，台灣獨立修正

使用者確認 9 月 12 日 `korea-zoom-final.mp4` 的韓國入口已通過，拒絕後續把整個地區頁當作平面放大的版本。韓國恢復原 1.25 秒接近 + 1.25 秒推進、鏡頭距離 2.55 → 1.14、120 px 地點 Logo 接到既有主視覺、主視覺 0.68 → 1 的動作；整個路由不做縮放。原 Protocol 地球、銀河與地區版面維持。

本段台灣方案已被使用者否決，僅保留歷史。當時台灣另用 `taiwanHandoff.ts`，保留相同地球推進，移除獨立 Logo 從中央飛往左側的路徑。原頁 Logo 固定在自己的版面位置，地球近距離解除時呈現原頁；保留避免 `website-entry` 重播的修正。此為針對左移問題的本機修正版，尚待使用者審閱，不視為已通過。

實際 1440 × 900 瀏覽器錄影與逐格檢查：`/Users/gavin/Documents/CodexArtifacts/flagship/2026-09-13-korea-restored/`。韓國影片與 9 月 12 日通過版對照；台灣 Logo 無橫移、抵達後無重播。建置與 `git diff --check` 通過。本輪沒有新增 fallback、圖片、commit、push 或部署；未重新宣稱手機或實體 GPU 驗收。

## 2026-09-13：地點與地區頁共用透視（使用者已否決，僅保留歷史）

上一版的獨立國家 logo、整頁淡接與內容個別縮放已移除。現在直接使用真實地區頁，從所選地理位置作為一個整體連續放大到視窗；地球鏡頭距離與頁面比例共用 `entryProjection` 透視關係。這是卡展頁面的空間入口，不是衛星地圖模擬。

台灣原有 `website-entry` 動畫之前被過渡樣式設為 `animation: none`，解除後重新啟動，導致抵達後 logo／標題再閃一次。本輪移除該取消規則，讓它在遮蔽期間正常完成。原本兩個地區頁的設計與新 IP 按鈕維持。

最新本機審閱影片：`/Users/gavin/Documents/CodexArtifacts/flagship/2026-09-13-spatial-entry/taiwan-spatial-final.mp4`、`korea-spatial-final.mp4`。同資料夾的 review.md 記錄檢查範圍與未測項目。未 commit、push 或部署；下方保留先前版本紀錄。

## 2026-09-12：直接 zoom in 與 IP 按鈕整理

兩個地區入口共用 `entryMotion.ts`，鏡頭對準實際座標後持續往前，地球保留原位置。刪除地球向下移出畫面、國家 logo 翻轉彈出、地區頁先放大再縮回的動作。目的地在接近階段就於地球後方載入；最後一段由同一 render clock 控制鏡頭、logo 尺寸、近距離焦點銜接及目的地內容，避免各自的動畫時鐘漂移。地區頁就緒後仍卸除整個 IP 場景。

IP 的主按鈕、回顧、城市左右箭頭、體驗 tabs 統一到 `home/styles/controls.css`，並移除旧樣式表中相應的分散規則。採高對比平面、單角切口、紅藍細邊與有方向性的箭頭動作；頁尾明暗控制改為底線選取。地區頁原有視覺維持。

本輪錄影及檢查放在 `/Users/gavin/Documents/CodexArtifacts/flagship/2026-09-12-direct-zoom/`。交付以 `korea-zoom-final.mp4`、`taiwan-zoom-final.mp4` 為準，舊錄影保留作比較。只做本機審閱，沒有 commit、push 或部署。

## 2026-09-12：IP 移除 header，重新錄製地區過渡

依使用者最新要求，IP 首屏及捲動後都不再掛載 header。語言與亮暗切換移至獨立的 BrandPreferences 頁尾模組，台灣與韓國的原導覽保留。實際錄影檢查發現畫布放大時 ResizeObserver 會在繪製後清空 drawing buffer；現在僅在 render 開始時套用 resize，緊接著重畫，避免地球閃空。沒有新增替代畫面。最新展示位於 `/Users/gavin/Documents/CodexArtifacts/flagship/2026-09-12-headerless-entry/`，下方紀錄保留作為前版歷史。

## 2026-09-12：全站銀河、原 Protocol 地球與連續地區入口（目前審閱版）

以 `src/flagship/world/world-bible.md` 與目前程式為準。先前玻璃、NASA 地球、兩城市同時顯示和 Logo 整頁翻面的版本均已被取代；下方保留歷史紀錄，不能當作目前行為。

- IP 介紹、收藏／交易／對戰／交流、地區入口、品牌贊助商及回顧都已整合。主 Logo 沿用已選的移除城市版本；Vinci World 直接使用原台灣網站的同一份贊助 Logo，Renaiss 另列主辦。
- `BrandHome` 單獨掛載一個固定銀河背景，從首屏延續到介紹、卡展、體驗、贊助商和頁尾。亮／暗兩版共用真正的星帶結構及 Logo 紅藍光色。背景候選 3 位於 `work/generated-images/2026-09-12-stellar-galaxy/`，仍待使用者選定；所有候選及原圖完整保留。
- 原 Protocol 的 11 個模型／材質／地理／網路／大氣模組與來源逐一比對完全相同；外層才調整銀藍色調、紅藍燈光、薄大氣層。開場鏡頭距離 4.55，抵達 3.55；1440×900 的地球約 560 px → 730 px，手機另有直向、短螢幕和橫向配置。
- 開場沒有城市標記。向下捲動先靠近最新韓國卡展；抵達後左右拖曳、水平滾輪、方向按鈕或鍵盤切到台灣，先旋轉再靠近實際座標，只顯示目前城市。首爾代表韓國篇章定位，並非已確認展館。
- 進入地區時沿用同一個場景：旋轉推近地理位置，原國家 Logo 從該點升起並接到地區頁原有 Logo。地球沿曲面離開畫面，目的地首屏同步推進；完成後 IP 頁、地球 canvas 和銀河全部卸除。台灣／韓國原頁內沒有地球。取消、返回、載入錯誤、WebGL 中斷與真正重新建立場景均有完整流程。
- 目前截圖及四段實際操作影片：`/Users/gavin/Documents/CodexArtifacts/flagship/2026-09-12-protocol-continuity/`；審閱頁 `http://127.0.0.1:4183/`，可操作建置版 `http://127.0.0.1:4176/?lang=zh-TW`。桌面與 375×667、390×844、768×1024、844×390 CSS 視窗已檢查；並未宣稱完成實體手機效能或 OS 減少動態偏好的播放驗收。
- `npm run build:art-review` 通過 TypeScript、Vite、各地區 metadata、CSP 及具名媒體預算。16 個具名媒體共 8,557,580 bytes；主 JS gzip 143.84 kB、延遲 Three.js chunk gzip 212.86 kB。原始 PNG 和被取代的 NASA 素材不在建置包。GPU 用量與效能限制詳見 world-bible 和審閱紀錄。
- 前面 21 輪、每輪四點與逐輪截圖的紀錄仍保存，後續修正沒有冒充額外 21 輪。臨時測試頁與錄影中間檔已先告知後依清單刪除，成品影片、截圖、候選圖及時間紀錄保留。沒有新增替代地球或靜默 fallback；沒有 commit、push 或部署。

此階段交付的是完整可操作的本機視覺審閱版本，供使用者檢查。候選圖正式選定、Git 上傳及正式發布仍依使用者的各項授權規則處理，不把本機驗證宣稱為上線。

## 2026-09-12：卡牌銀河與城市鏡頭（已被後續需求修正的歷史版本）

使用者要求參考 WhatsApp 韓國海報，讓背景更有卡牌、亮色銀河感，並展示捲動靠近城市的完整動作。已讀取指定海報，保存原圖；背景候選 1 位於 `work/generated-images/2026-09-12-card-galaxy/`，仍待選定。318,190-byte WebP 僅供本機審閱，原始 PNG、過往候選與工具快取均保留。

- 鏡頭全球 6.25 → 台灣 4.08 → 中途拉遠 4.70 → 韓國 4.02；原球體比例固定，原生捲動可反向。城市亮度隨靠近漸亮。
- Protocol 11 個來源檔保持一致；大氣層以外層模組調整薄藍邊緣。背景、鏡頭插值與大氣調整分為 GalaxyBackdrop、journeyPose、atmosphereFinish 模組。
- 桌面、手機及平板三個章節均有截圖；375×667 韓文、844×390 英文另行確認。兩個活動入口、返回、焦點、canvas 清理、實際 runtime 的減少動態模擬及 WebGL 中斷／重啟均已檢查。
- 交付實際瀏覽器擷取的桌面捲動、手機捲動、Logo 入口三支 MP4；示範頁 http://127.0.0.1:4181/，可操作站 http://127.0.0.1:4176/?lang=zh-TW。
- build:art-review 通過；17 個具名媒體共 8,638,176 bytes；根 JS gzip 約 139.98 KB，按需地球 JS gzip 約 214.54 KB。45 calls、40,736 triangles；CPU 提交時間不能當 GPU 或完整影格效能。原 Protocol 貼圖粗估約 42.75 MiB，未達早期 32 MB 目標，保留使用者指定素材並明確記錄限制。

完整證據：`/Users/gavin/Documents/CodexArtifacts/flagship/2026-09-12-card-galaxy/review.md`。臨時測試與錄影中間影格在檢查後通知清理，保留成品及擷取時間紀錄。未新增 fallback；未 commit、push 或部署。以下為前一輪 21 次修改紀錄，這次沒有將 QA 截圖冒充新的設計輪次。

## 2026-09-12：Protocol 地球與亮色玻璃／金屬品牌入口（前一輪）

使用者明確修正為「二十輪、每輪改四個地方」，並指定重用 `protocal page` 既有地球。此輪完成 21 輪，每輪四項實際修改並截圖檢查，共 84 項；不把前一版單項修改的輪數混入計算。逐輪紀錄與截圖：`/Users/gavin/Documents/CodexArtifacts/flagship/2026-09-12-world-iterations/review.md`。

- 原 Protocol 地球的模型、地形、海洋材質、城市網路、大氣與資源釋放共 11 檔逐一比對，內容完全相同；原專案沒有修改。Flagship 的原生捲動、台灣／韓國標記與投影連結另放在 `world/` 外層模組，原 Logo 圖片及比例保留。
- 根頁依捲動從全球定位台灣、再定位韓國；台灣列歷屆、韓國列下一站。城市可點入原活動頁，Logo 翻面過場等待地區模組與台灣原站載入完成；返回恢復地球。沒有虛構韓國日期、場地，也沒有假地球 fallback。
- 薄玻璃、曲面鉻銀與 Logo 原有紅藍色延伸到導覽、IP 介紹、活動入口、收藏／交易／對戰／交流頁籤、贊助商、真實回顧影片與頁尾。Vinci World 使用原台灣站提供的同一 Logo，Renaiss 另列主辦。
- 新增三張生成材質候選，皆留在 `work/generated-images/2026-09-12-world-materials/` 等待使用者選擇。候選 2、3 的 WebP 只供本機審閱（82,258 / 13,958 bytes）；沒有 promote、刪圖或清除平台快取。正常正式 build 仍受素材選定與回顧影片 CDN 門檻保護。
- 實際檢查建置後的 1440×900、390×844、768×1024、844×390；設計輪另檢查 1366×768 與 375×667 韓文。修正平板間距、城市標籤和入口座標換行；檢查中英韓文字及橫向溢出。台灣與韓國翻轉後可到原頁、焦點移到 main，返回只有一個地球 canvas 且 inert 清除。體驗頁籤鍵盤、回顧實際播放和 Escape 回焦通過。
- 獨立瀏覽器測試頁呼叫正式地球 runtime，確認模擬減少動態直接停在韓國 0.860、強制 WebGL context loss 明確回報並清除 canvas、重載一個 canvas、重複 dispose 加 abort 安全清除。沒有修改 OS 偏好；未完成實體手機 GPU／幀率量測。唯一臨時測試檔 `work/world-runtime-check.html` 已先告知再刪除。
- `npm run build:art-review` 通過 TypeScript、Vite、三頁 metadata、CSP/SRI、具名資產預算。17 個媒體共 8,402,246 bytes；審閱 build 沒有 PNG 原始素材。主 JS 428.07 KB / gzip 139.93 KB，延遲地球 chunk 768.76 KB / gzip 214.30 KB，地區 JS 71.33 KB / gzip 18.12 KB。地球 chunk 超過 Vite 500 KB 提示仍保留，沒有放寬或隱藏警告。
- 地球實際觀察 45 draw calls、40,736 triangles、6 textures；CPU render submission p95 0.80 ms，不代表 GPU 幀率。程式拆為 world/config、scene/protocol、runtime、ui 與 routing/transition。

目前僅供本機視覺審閱，預覽 `http://127.0.0.1:4176/?lang=zh-TW`。尚待整站視覺接受與候選選定；沒有 commit、push 或部署。記憶 recall／remember 連線未成功，沒有宣稱已保存。

## 2026-09-12：Logo 黑銀橫幅與斜切線條（已被取代的歷史版本）

使用者拒絕前一版磨玻璃，要求至少 20 輪修改、每輪截圖并列四點。此輪完成 21 次實際修改，截圖與 84 個檢視點保存於 `/Users/gavin/Documents/CodexArtifacts/flagship/2026-09-12-logo-iterations/`，`review.md` 依輪次列出變更、截圖和四點。最後四點是可再比較的細節方向，沒有宣稱整站已獲視覺接受。

- 地區入口使用新 `home/BrandDestinations.tsx`，從原 Logo 的 CARD SHOW 黑銀橫幅取形，採斜切角與紅藍細邊。Logo 圖片未改動。
- `BrandBackdrop.tsx` 改為原創 SVG 切面與定向紅藍線，移除圓角透明卡殼。主站沒有 backdrop-filter，已刪除未使用的 GlassSurface 組件及樣式；沒有新增 fallback。
- 導覽、照片、地區卡片、體驗頁籤、贊助商、影片播放器與頁尾均改成同一套直角細銀邊；大標仍以清楚可讀為準。原台灣、韓國活動頁保持既有設計。
- 手機選單為黑銀色，操作键至少 44px；體驗頁籤 2×2，斜切地區入口使用内部焦點框。修正頁籤颜色過渡的瞬間低對比及 320px hero 重複扣除邊距。
- 21 輪先以本機 4177 開發伺服器逐輪修改截圖，最後改用 4176 審閱 build 再檢查。1280×720 入口完整顯示，另檢查 1440×900、768×1024、390×844、320×740 和中英韓文字。
- `npm run build:art-review` 通過 TypeScript、Vite、三頁 CSP/SRI 與媒體預算。主 JS 420.05 KB / gzip 137.00 KB；主 CSS 115.75 KB / gzip 24.76 KB。15 個具名媒體仍為 8,306,018 bytes。沒有新增 AI 素材、圖片刪除、測試檔、push 或部署。

## 2026-09-12：金屬 Logo、淡紅藍與磨玻璃（已被使用者拒絕的歷史版本）

依使用者修正，品牌主站改為淡紅藍光暈、銀色卡框、原有金屬 Logo 與磨玻璃入口；下方介紹、地區卡片、體驗、贊助商與回顧使用相同材質。原台灣、韓國活動頁維持各自設計。首頁文案以「從一張卡牌，開始一段交流」介紹 IP，Vinci World 沿用原站 Logo，Renaiss 另列主辦。

- `BrandBackdrop.tsx` 獨立處理 CSS 背景與卡框；`ui/GlassSurface.tsx`、`ui/TiltSurface.tsx` 分開处理磨玻璃及小幅傾斜；樣式仍分為 base、hero、sections、responsive。首屏不再掛載舊 `AmbientFilm`，原檔保留。
- 已依 ReactSkills 選用 GlassSurface 與 TiltedCard 方向。其路由指向的本機子技能缺失，已向使用者說明，並查閱 [GlassSurface 官方原始碼](https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/Components/GlassSurface/GlassSurface.tsx) 與 [TiltedCard 官方原始碼](https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/Components/TiltedCard/TiltedCard.tsx)。採用原生 backdrop blur 與小幅 spring 傾斜，不加入 SVG 扭曲或執行期 fallback。減少動態與觸控停用傾斜。
- 修正 CSS 壓縮後只保留 prefixed backdrop-filter 的問題：prefix 放前、標準屬性放後。實際瀏覽器確認面板為 `blur(22px) saturate(1.15)`，導覽為 `blur(24px)`。
- `scripts/prepare-master-logo.py` 從已選第 1 號來源修復透明通道，保留 RGB 像素及比例。PNG 輸出為 `outputs/brand/flagship-master-transparent.png`，網頁使用 RGBA WebP（303,892 bytes）。驗證 alpha 範圍 0–255、859,520 個全透明像素，亮底與暗底均實際檢查。原始候選第 1、2 號均保留；沒有新增 AI 候選或刪圖。
- 韓國入口改由既有天空、城市、韓國 Logo 圖層組合，避免門戶圖片夾帶台灣活動細字。未確認的韓國日期與場地仍標示待公布。
- 完成三輪截圖修正。最終實際檢查桌面 1440×900、平板 768×1024、手機 390×844，以及 320×740 英韓標題；此前兩輪另檢查 1280×720 和 320 繁中。上述尺寸無橫向溢出。選單、頁籤鍵盤操作、回顧播放與 Escape 回焦、原地區入口均已檢查。台灣入口不讀取嵌入 iframe 的完整 DOM 快照時，切入後仍停在頁首。
- 截圖位於 `outputs/screenshots/2026-09-12-brand-metal-glass/`。`final-desktop-1440.png`、`final-mobile-390.png`、`final-tablet-768.png`、`final-editions.png`、`final-partner.png` 為逐視窗實拍。`final-desktop-full.png` 有工具拼接重影及未觸發 lazy 圖片，不能當作整頁驗收或交付圖。
- `npm run build:art-review` 通過 TypeScript、Vite、三頁 CSP/SRI 與媒體預算。主 JS 418.65 KB / gzip 136.50 KB；地區 JS 70.91 KB / gzip 17.91 KB；主 CSS 115.80 KB / gzip 24.90 KB。15 個具名媒體共 8,306,018 bytes，首屏舊 MP4 不再入包；30 秒回顧 4,891,060 bytes，仍受正式 CDN 發布門檻保護。未建立臨時測試檔。

目前為本機視覺審閱版，尚未得到整站視覺接受，沒有 commit、push 或部署。記憶工具 recall/remember 本輪皆遇連線失敗，未宣稱偏好已保存。下方保留歷史紀錄，当前樣式、素材及大小以上述最新紀錄為準。

## 2026-09-11：IP 主站與地區獨立入口（歷史紀錄）

根路徑 `/` 現為長期品牌主站，`/taiwan/` 與 `/korea/` 保留兩個原活動頁的設計。舊 `?edition=` 連結仍能進入對應地區。`/now-serving`、`/queue-admin` 由原有入口處理。

- `routing/SiteNavigation.tsx` 處理頁面、語言、history 與錨點；`routing/PageMetadata.tsx` 同步瀏覽中的分享資訊。`scripts/generate-site-pages.mjs` 為三條路徑產生不同靜態 HTML metadata，CSP/SRI 同時檢查這三份 HTML。
- `FlagshipSite.tsx` 組合品牌首頁與延遲載入的地區頁。`EditionSite.tsx` 保留原韓國組件及 TaiwanEventSite。`FlagshipProvider.tsx` 只提供地區內容，不再同時擔任全站路由。
- `home/` 依導覽、主視覺、IP 介紹、地區入口、體驗、統一贊助商、回顧和頁尾拆分。中、英、韓文案集中在 `homeCopy.ts`；樣式限定於 `home/styles/`。
- 統一贊助商依原台灣網站的 `Vinci World` 名稱與 Logo 建立。Renaiss 另列主辦。沒有把台灣其他合作方改成全球贊助商。
- 台灣原站只有中英文，從韓文入口进入台灣沿用既有英文回退規則。新增地區模組載入失敗提示及重試，不以其他頁面假裝成功。

### 真實活動素材

照片源自 `/Users/gavin/Documents/ChatGPT/remotion/flagship-taiwan-recap/public/photos/`，原專案的 `docs/selected-photos.json` 與 `docs/asset-provenance.json` 保留來源。網站使用限定尺寸 WebP 副本。首屏 16 秒背景是實拍照片的緩慢推進與交叉淡化，並非新拍攝影片；可暫停、離開畫面停止播放，減少動態偏好預設只顯示照片。

回顧採用同專案既有 `outputs/flagship-taiwan-v7-master-1080p.mp4` 的 720p 壓縮版，保留原剪輯與聲音。首屏影片約 1.95 MB；30 秒回顧約 4.89 MB。兩支僅供本機審閱，資產檢查會阻擋它們直接進入正式 build；發布前需改用不可變 CDN 路徑。

### Logo 狀態

使用者已選第 1 號移除城市版本，其來源保留於 `work/generated-images/2026-09-11-flagship-master-logo/01-flagship-master-silver-no-city.png`；已選設計副本為 `design/source-artwork/flagship-master-approved.png`。目前 `src/flagship/assets/brand/flagship-master.webp` 是此檔的壓縮審閱副本。

第 1 號與第 2 號 `02-transparency-attempt.png` 的原始生成檔都是 RGB 檔、棋盤格已畫在背景中。2026-09-12 已依使用者修正指示完成第 1 號透明通道處理，詳見上方最新紀錄。第 2 號沒有選用。所有候選及原圖均保留，沒有刪除；平台原始生成快取也沒有清除。

### 本輪驗證

- `npm run build:art-review` 通過 TypeScript、Vite、三頁 CSP/SRI 與媒體預算；`git diff --check` 通過。
- 10 個記憶體內路由斷言及三頁 canonical、JSON-LD、CSP hash、SRI 檢查通過，未建立臨時測試檔。
- 瀏覽器檢查 1280×720、390×844、320×740。主站三種語言、台灣與韓國往返、手機選單 Escape 回焦、體驗頁籤左右鍵、回顧播放與 Escape 關閉回焦均已實際檢查。韓國直接 `#show-info` 連結在地區組件載入後能定位。
- 主站已載入圖片無破圖、兩種手機寬度無橫向溢出；觀察到的瀏覽器錯誤與警告為空。未模擬斷網、OS 減少動態或完成實體手機驗收。
- 主 JS 約 418 KB / gzip 136 KB，地區 JS 約 71.5 KB / gzip 18.5 KB；16 個具名媒體共 10,304,446 bytes。原始 PNG/大型回顧來源沒有放入 public 或審閱 build。

以上為初版驗證，後續 Logo 背景與整體樣式已修正；尚未獲得整站視覺接受，沒有 commit、push 或部署。下方保留此前地區頁的歷史紀錄。

## 品牌與資料

FLAGSHIP 是長期 IP。Korea 是下一個篇章，Taiwan 2026 是歷屆展會；日期、場地、名單和票務各自維護。韓國尚未確認的資訊明確標示未公布，不能套用台灣資料。

- `FlagshipProvider.tsx` 管理展會、語言、URL 與 metadata，`FlagshipContext.ts` 保存 context。
- `data/editions.ts` 是篇章 registry；英、韓、繁中文案位於 `data/locales/`。
- `components/` 分開管理首屏、體驗、篇章、資訊、社群、FAQ；舊 `/now-serving`、`/queue-admin` 路由保留。
- 台灣具名攤商名單為 29 筆；30+ 是原活動文案。體驗圖片標示台灣展會視覺，不宣稱為韓國實拍。
- URL 例如 `/?edition=korea&lang=ko`。分享爬蟲取得靜態品牌 metadata，查詢參數沒有各自預渲染。

## 2026-09-11：台灣切回原活動網站

使用者指定切回 Taiwan 時，顯示之前的台灣卡展網站。現在 `FlagshipSite` 依篇章掛載不同頁面：Korea 使用現有 IP 版面，Taiwan 使用 `taiwan/TaiwanEventSite.tsx` 組合原有 `src/components/` 的 Hero、Highlights、Vendors、Venue、FAQ、Tickets 和 Footer。台灣頁面不掛載 `.fs-site` 或韓國世界背景。

- 台灣的原 Logo、夜景、活動票卡、內容、載入程序及 Luma 彈窗直接沿用；`Header` 只增加可選的展會控制插槽，新增控制樣式限定於 `taiwan-navigation.css`。
- 原 `LocaleProvider` 增加受控語言介面，未傳入控制參數的 queue 頁面維持原行為。台灣語言選單與 URL 同步。
- 台灣原內容僅有中英兩種語言。從韓文切入台灣會回退為英文，URL 與 document lang 同步為 `en`；已向使用者說明此規則。沒有用替代圖片或替代版面掩蓋載入錯誤。
- 跨篇章切換回到目的頁頂端並更新 history；重新整理及上一頁／下一頁依 URL 掛載同一篇章。選擇正在瀏覽的 Korea 篇章卡仍前往本場資訊。
- 台灣標題與 description 回到原活動 SEO 文案。Luma 保留原活動入口，外部嵌入頁已顯示報名截止；未提交任何報名。
- 已檢查 1440×900、1280×600、390×844、320×740 的台灣首頁、導覽，並驗證攤商錨點、FAQ 分類、語言、Korea/Taiwan 切換、瀏覽器返回及原報名彈窗開關。另以記憶體內斷言驗證六個篇章／語言組合，未建立測試檔。
- 截圖：`outputs/screenshots/2026-09-11-taiwan-original/`。本輪沒有生成、移動或刪除圖片，沒有 push 或部署。

## 2026-09-11：日光、背景細節與文字可讀性

後續玻璃／金屬材質版本以 [flagship-materials.md](flagship-materials.md) 為準。閱讀排版保留，平面底色已換成獨立的玻璃／細銀邊系統；以下記錄描述背景清晰度調整當時的結果。

上一版的厚鉻銀邊、深色內襯及銀色立體按鈕已被使用者拒絕。本次移除這些外殼，重新處理整站的視覺重量。

- 全站共用一張穩定的日光背景。移除滿版裁切以外的 1.7 倍放大，背景不透明度由 0.68 回到 1，讓城市、河岸及卡框保持原有細節。沒有捲動縮放或圓形聚焦；台灣篇章保留既有夜景。
- 背景候選原圖為 1672×941；從 PNG 重新編碼為 WebP quality 94 的審閱副本，從 307,420 bytes 增為 523,958 bytes。没有人工放大或新增生成細節；高 DPI 大螢幕仍受原圖解析度限制。
- 文字對比由內容本身處理：韓國篇章使用更深的海軍藍，主要內文 16px、資訊標籤 14px。日期、FAQ、篇章卡及長內文使用局部淡藍底色，標題與 Logo 仍直接放在場景上。沒有 backdrop blur、厚金屬邊框或底座陰影。
- 原 Logo、海報及其 WebP 未改寫；使用既有原始輪廓顯示。原 Logo 在首頁、資訊及頁尾各自依版面縮放。
- 資訊、體驗、篇章和 FAQ 保留細分隔線。窄手機四個體驗入口維持 2×2、頂部對齊及平衡換行；照片註記限制寬度，避免與右下角頁碼重疊。
- 卡框厚度由 0.18 降至 0.055 個場景單位，縮小展示尺寸，移除暗色主框和寬內唇。僅窄邊反射與小嵌件保留金屬材質。中央為真實幾何開口，不是實心卡片或水晶。模型為裝飾近似物，並未宣稱精確重建原產品。
- 導覽融入天空，向下捲動收起、回滑顯示。React Motion 入場移除 blur filter，改用 10–12px 位移及輕微透明度變化，避免捲動時文字先模糊。卡框微動、頁籤、局部傾斜、暫停及 reduced-motion 支援保留。背景本身固定。
- 材質樣式在 surfaces.css，背景構圖在 world.css，局部閱讀底色與對應排版在 reading.css；模型比例與幾何分別在 scene/cardHolderSpec.ts 及 createCardHolder.ts。頁尾繼承當前篇章文字變數。

## 素材狀態

本輪沒有新增 AI 圖片、promote 素材或刪除原圖。既有候選保留於 work/generated-images/2026-09-10-poster-world/：

| 編號 | 圖片 | 用途 |
| --- | --- | --- |
| 1 | 01-korea-world.png | 本機整站背景，尚待正式選定 |
| 2 | 02-acrylic-collection.png | 不符需求的水晶圖，未使用、原檔保留 |
| 3 | 03-korea-logo-cutout.png | 失敗候選，未使用、原檔保留 |
| 4 | 04-glass-ribbons.png | 未使用、原檔保留 |

審閱副本沒有移入 public/dist。新編碼副本為 review/korea-world-detail.webp，舊 WebP 與 PNG 均保留。過去交付截圖均保留；本輪截圖位於 outputs/screenshots/2026-09-11-clarity/，daylight/ 為此前版本。

## 建置與交付界線

npm run build:art-review 執行 TypeScript、Vite、CSP/SRI 與具名資產檢查，僅輸出 work/site-review-build/，預覽 http://127.0.0.1:4176/。正式 build 的素材選定門檻仍保留；未推送或部署。

本機三張 WebP 合計 877,324 bytes，低於原有 1,126,400 bytes 總預算；背景具名預算調整為 563,200 bytes。其他公開媒體維持 CDN。接回台灣完整頁面後，主 JS 約 484 KB / gzip 154 KB；獨立 3D chunk 約 553 KB / gzip 141 KB，保留 Vite 的 500 KB 提示；CSS 約 142 KB / gzip 29 KB。copyPublicDir: false 保留。

## 背景清晰度調整的驗證

- 審閱建置與 git diff --check 通過；瀏覽器未觀察到錯誤或警告、圖片破圖或整頁橫向溢出。
- 本輪實際檢查 1440×900、1280×600、685×863、390×844、320×740；包含繁中、韓文與英文。這是瀏覽器視窗檢查，不代表實體手機驗收。
- 體驗頁籤點擊、左右鍵與 Home 切換；FAQ 展開；手機選單開啟、Escape 關閉並回焦。
- 本輪確認語言及韓國／台灣切換。3D 場景未修改；此前量測為 9 calls / 4,856 triangles / 9 geometries / 2 textures，DPR 上限 1.5，目標上限 40 FPS。此次沒有重新執行效能壓測。
- 背景清晰度調整未建立臨時測試檔、沒有新增 fallback；後續台灣語言回退見上方「台灣切回原活動網站」。強制 WebGL 故障、慢網路與 OS 減少動態模擬未重做，不能宣稱完成完整故障矩陣。

這是本機設計修改與檢查記錄，不代表使用者視覺接受或正式上線。發布前需另獲 push 同意、素材選定與部署驗證。GitHub 部署的 Zeabur 服務須以 repo Dockerfile 為準，spec.source.dockerfile 保持 null。


## 2026-09-13：黑色銀河 IP 十輪調整

依使用者指示，IP 首頁預設黑色銀河；明確 theme=light 仍可查看原亮版。十轮、每轮五組實作及前後回看位於 `/Users/gavin/Documents/CodexArtifacts/flagship/2026-09-13-dark-ip-10-rounds/review.md`，每輪均保留截圖。深色規則依 foundation/world/controls/story/chapters/experience/partner/closing/responsive 分開放在 `src/flagship/home/styles/dark/`。

調整文字層級、紅藍品牌細節、按鈕、真實卡牌現場照片、篇章封面、體驗 tabs、贊助商與頁尾。原 Protocol 地球及 Korea/Taiwan geographic handoff 檔案保留。國家標題在同一 grid cell 交錯移動，避免先退出再進入的空拍；world-progress 僅寫入場景區段，不再每格写入整個 brand-site 根節點。

錄影改為 Chrome 分頁原生擷取，使用獨立本機錄製輔助頁呈現實際審閱建置；不再用低頻截圖影片。影片、品質數據及回看圖存於上述交付目錄。錄製輔助頁與 responsive 檢查頁於工作完成後刪除，不進正式網站。審閱建置通過；這是本機設計審閱，不代表已接受或上線。
