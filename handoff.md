# 交接檔（handoff.md）

> 任何 Agent、任何電腦接手前**必讀**；收工時**必更新**。本檔只放交接必需的精簡資訊，詳細脈絡放 Obsidian（若有 L3）。

## ⏯️ 目前做到哪
專案初始化＋Netlify 部署完成。公開網址 https://2026math-website2.netlify.app 已上線（首頁＋12 單元驗證可開）。

## 🚦 目前狀態
- 公開站已上線，repo 保持私有；程式碼公開出去的只有靜態網頁檔
- 各單元 `ch*.js` 尚未逐一驗收（階段一仍 open）
- GitHub 私有 repo 已推，Obsidian 筆記已建

## ➡️ 下一步
1. 逐一開啟 12 單元確認無報錯（階段一）
2. 之後每次改版走部署約定（見 AGENTS.md）：草稿先看 → 問過使用者才 `--prod`

## ⚠️ 注意事項
- 部署方式：Netlify CLI 手動部署（`git push` 不會自動上線，repo 沒接連動）
- `.nojekyll` 是之前試 GitHub Pages 留下的，現已無用、保留無妨（免費方案私有 repo 不能開 Pages）
- 純前端靜態站，改 `ch*.js` 前先備份／走 git
- 路徑在雲端硬碟內，確認 Google 雲端硬碟桌面版同步已打勾
- `6-2/` 結構與其他單元不同（有自帶 index.html＋style.css＋engine.js），疑似新版範本，動前先確認

## 🕐 最後更新
- 時間：2026-09-12
- 更新者：OpenCode @ DESKTOP-BN0QO3M
- Git push：✅ 已推（部署紀錄＋藍圖回填）
