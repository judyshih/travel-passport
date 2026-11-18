# 旅行護照 PWA

把旅行照片變成護照入境章的 iPhone 網頁 App。

## 安裝到 iPhone（約 3 分鐘）
這個 App 需要放在 HTTPS 網址上，iPhone 才能「加入主畫面」並離線使用。最簡單的方法：

**方法 A：Netlify Drop（不用寫程式、免費）**
1. 用電腦打開 https://app.netlify.com/drop （可用 Google／GitHub 帳號登入）
2. 把整個 `passport` 資料夾拖進網頁
3. 拿到一個 `https://xxxx.netlify.app` 網址（可在 Site settings 改名）

**方法 B：GitHub Pages**
1. 建一個新 repo，上傳這個資料夾裡的所有檔案
2. Settings → Pages → Branch 選 `main` / root → Save
3. 網址是 `https://<帳號>.github.io/<repo>/`

**加入主畫面**
1. 在 iPhone 用 **Safari** 開上面的網址
2. 點下方「分享」→「加入主畫面」→「新增」
3. 主畫面會出現「旅行護照」圖示，打開就是全螢幕 App

## 使用
- **匯入照片**：讀取照片 EXIF 的 GPS 和拍攝日期 → 判斷國家（離線）與城市（線上，BigDataCloud 免費 API）→ 同一國家、相隔 4 天內的照片算同一趟旅程 → 一趟 = 一枚入境章
- **照片沒定位**：iOS 從相簿挑照片時可能拿掉位置。可在匯入時手動指定國家城市，或在「照片」App →「分享」→「選項」打開「位置」→「儲存到檔案」，再從「檔案」匯入
- **手動新增**：設定 → 手動新增，可用「目前位置」直接在旅途中蓋章
- 點入境章可看照片、改城市、寫旅程日記
- 右上角分享鈕會把護照頁輸出成圖片

## 資料
所有資料（縮圖、日記）存在手機上這個 App 的 IndexedDB，不會上傳。只有座標會送去 BigDataCloud 查城市名稱。
**請定期到「設定 → 匯出備份檔」**，清除 Safari 資料或換手機前一定要備份。

## 檔案
| 檔案 | 用途 |
|---|---|
| index.html | 整個 App |
| countries.json | 世界國界（Natural Earth 1:110m），用於離線判斷國家和畫地圖 |
| sw.js | Service Worker，離線快取 |
| manifest.webmanifest、icon-*.png | 主畫面圖示與 App 設定 |
