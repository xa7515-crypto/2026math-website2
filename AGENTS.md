# 2026math-website2（國小數學互動課程網站）（專案藍圖）

> 本檔為跨 Agent 通用的專案藍圖（AGENTS.md 開放標準）。任何 Agent 的每個 session 都應先讀本檔＋`handoff.md`。

## 專案簡介
新趨勢文理補習班｜國小數學互動課程網站。首頁 `index.html` 為課程入口，`1-1`～`6-2` 共 12 個單元資料夾各放該單元的互動教材 JS（`ch*.js`＋`engine.js` 等），為純前端靜態網站，可直接用瀏覽器開啟或部署到靜態主機。

## 關鍵時程
<!-- 目前留白，有日期再補 -->
- （無）

## 目標與路線圖
- [ ] 階段一：確認 12 個單元內容完整可跑（首頁＋各單元頁面開啟無報錯）
- [x] 階段二：部署上線（Netlify，公開網址 https://2026math-website2.netlify.app，可印 QR Code）

## 資料夾結構
```
2026math-website2/
├── index.html（首頁，約 231KB，課程入口）
├── AGENTS.md（專案藍圖）＋handoff.md（交接檔）＋.gitignore
├── .nojekyll（歷史遺留：曾嘗試 GitHub Pages，現部署走 Netlify CLI，此檔無作用但保留無妨）
├── 1-1/（index.html＋engine.js＋style.css＋svg.js＋ch0.js～ch9.js）
├── 1-2/（index.html＋engine.js＋style.css＋svg.js＋ch0.js～ch9.js）
├── 2-1/（index.html＋engine.js＋style.css＋svg.js＋ch0.js～ch10.js）
├── 2-2/（index.html＋engine.js＋style.css＋svg.js＋ch0.js～ch10.js）
├── 3-1/（index.html＋engine.js＋style.css＋svg.js＋ch0.js～ch9.js）
├── 3-2/（index.html＋engine.js＋style.css＋svg.js＋ch0.js～ch9.js）
├── 4-1/（index.html＋engine.js＋style.css＋svg.js＋ch1.js～ch10.js＋m4-1-activities.js）
├── 4-2/（index.html＋engine.js＋style.css＋svg.js＋ch1.js～ch10.js＋m4-2-activities.js）
├── 5-1/（index.html＋engine.js＋style.css＋svg.js＋ch1.js～ch10.js＋m5-activities.js）
├── 5-2/（index.html＋engine.js＋style.css＋svg.js＋ch1.js～ch10.js＋m5-2-activities.js）
├── 6-1/（index.html＋engine.js＋style.css＋svg.js＋ch1.js～ch9.js）
└── 6-2/（index.html＋engine.js＋style.css＋svg.js＋ch1.js～ch6.js）
```

## 同步層級（本專案初始化至第 3 層級）

| 層級 | 平台 | 位置 | 讀取時機 |
|------|------|------|---------|
| L1 | 本地（雲端硬碟資料夾） | `AGENTS.md`＋`handoff.md` | 每個 session |
| L2 | GitHub | xa7515-crypto/2026math-website2（私有） | 指定時 |
| L3 | Obsidian | 2026math-website2/專案工作流程.md | 有需要時 |

## 工作約定
- 任何 Agent、任何電腦：**開工先讀 `handoff.md`，收工必更新 `handoff.md`**
- 修改共用檔案前先讀最新內容，避免覆蓋其他 Agent 的變更
- 所有回應與文件使用繁體中文
- 修改前先確認計畫，優先保留原有資料結構

## 部署約定（Netlify CLI，非 GitHub 連動）
- 本站走 CLI 手動部署，`git push` **不會**自動上線（repo 沒接 GitHub 連動）
- 更新流程：`netlify deploy --dir=.` 先看草稿 → 確認才 `netlify deploy --prod --dir=.`
- 正式發布（`--prod`）扣 15 點／次，每月約 20 次上限，**做之前必須先問使用者**
- 草稿網址每次都不同、**不可印 QR Code**；能印的只有 https://2026math-website2.netlify.app

## 安全與隱私（不可違反）
- **不把 API key、密碼、憑證寫進 repo**，也不要貼進 `AGENTS.md`／`handoff.md`；一律放 `.env` 並列入 `.gitignore`
- **學生資料只用座號**，不出現姓名、學號、班級以外的個資、照片或聯絡方式
- 要公開分享前，先確認檔案裡沒有上述兩類內容
