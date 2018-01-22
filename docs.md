# 文件

這個應用程式已經發展成一個輕量級的 Electron 應用程式，用來示範如何建立一個基本的 Electron 應用程式。但仍有少部分的程式碼是根據範例本身程式碼的組織性而做了些調整。

所有在這個應用程式中所使用的範例程式碼，_都是此應用程式實際執行時使用到的程式碼_。這些 JavaScript 程式碼片段都被拉到各自的檔案中，根據程序（主程序或渲染器程序）加以組織，並分類（通訊、選單、原生使用者介面、媒體、系統、視窗）。

為了方便維護，只在一個地方組織及更新程式碼，可以更容易找到你要找的範例程式碼。

所有的頁面都是獨立的 `.html` 檔案，它們使用 [HTML imports](http://www.html5rocks.com/en/tutorials/webcomponents/imports/) 的方式附加到 `index.html` 上。

你想新增範例嗎？跳轉到[加入一個新範例章節](#加入一個新章節或範例)。

## 資料夾結構

![應用程式結構和操作圖](/assets/img/diagram.png)

#### `assets`
該目錄包含應用程式本身的資源：CSS、字型、圖片及共用的 JavaScript 函式庫或輔助程式。

#### `main-process`
該目錄包含每個範例章節的子資料夾，內含主程序需要使用的 JavaScript。這樣的結構也被鏡像在 `renderer-process` 目錄中。

`main.js` 檔案位於根目錄，取得並執行這些資料夾內的每個 `.js` 檔案。

#### `renderer-process`
該目錄包含每個範例章節的子資料夾，內含渲染器程序需要使用的 JavaScript。這樣的結構也被鏡像在 `main-process` 目錄中。

每個 HTML 頁面都需要載入用來展示範例、相對應的渲染器程序 `.js` 檔案。

每個頁面都會讀取其相關的主程序和渲染器程序檔案，並將其代碼片段加到頁面中。

#### `sections`
該目錄包含每個範例章節的子資料夾。這些子資料夾包含每個範例頁面的 HTML 檔案。這些檔案都會附加到位於根目錄的 `index.html`。

#### `index.html`
這是應用程式的主頁面。它包含帶有導覽列的側邊欄，並使用 [HTML imports](http://www.html5rocks.com/en/tutorials/webcomponents/imports/) 將每個章節的 HTML 頁面附加到 `body`。

#### `main.js`
該檔案包含應用程式的生命週期說明，像是如何啟動和退出應用程式，它是應用程式的主程序。它取得並執行每個在 `main-process` 目錄中的 `.js` 檔案。

在 `package.json` 可設定此檔案為 `main` 檔案。

#### `package.json`
使用 `npm` 和 Electron.js 時需要用到這個檔案，它包含了關於這個應用程式的詳細資料：作者、相依套件、儲存庫並指向 `main.js` 作為應用程式的主程序檔案。

#### 文件
檔案：`CODE_OF_CONDUCT`、`README`、`docs` 和 `CONTRIBUTING` 檔案組成了專案的文件。

## UI 術語

![UI 術語](/assets/img/ui-terminology.png)

## CSS 命名慣例

沒有太過嚴格的規定，僅作為一種參考指南：

- 避免直接對元素設定樣式，但有些情況是可以的，像是 `<p>` 或 `<code>`。
- 可以歸類在一起的元素使用他們的父層元素作為前綴。`.section`, `.section-header`, `.section-icon`。
- 狀態使用 `is-` 前綴
- 工具程式使用 `u-` 前綴

## 加入一個新章節或範例

這裡提供了一些新增章節或範例的基本技巧。一般來說，你只要在相似的項目中複製裡面的程式碼或檔案就可以開始了！

### 新章節

包含一個或多個範例的全新頁面。

#### index.html

此頁面包含個章節的側邊欄列表以及使用 HTML imports 匯入的每個章節樣板。

- 將範例增加到 `index.html` 內合適的側邊欄類別中。
  - 更新 `id`，即 `id="button-dialogs"`
  - 更新 `data-section`，即 `data-section="dialogs"`
- 將範例樣板路徑增加到 `index.html` 內 `head` 的 import 連結中。
  - 即 `<link rel="import" href="sections/native-ui/dialogs.html">`

#### 樣板

此樣板將增加到應用程式的 `index.html` 中。

- 在 `sections` 目錄中，從目前類別內複製一個現有樣板 `html` 檔案到你要加入的章節中。
- 更新這些 `id` 標籤
  - 即 `id="dialogs-section"`
- 使用與你的新章節相關的文字來更新 `header` 標籤中的所有文字。
  - 根據需求刪除範例和小提示。

### 範例

任何你為範例所增加的程式碼都應該根據它要被執行的位置，加在「main-process」或「renderer-process」的目錄中。

所有「main-process」資料夾內的 JavaScript 檔案都會在 app 啟動時被執行，但你將可以連結到這個檔案，因此它可以在你的範例中顯示（見下文）。

在渲染器程序所增加的程式碼會被讀取並在範例中顯示，接著在樣板頁面載入，因此可以在該程序中執行（見下文）。

- 首先從樣板頁面複製並貼上現有的 `<div class="demo">` 區塊。
- 更新範例按鈕 `id`
  - 即 `<button class="demo-button" id="information-dialog">查看範例</button>`
- 如果範例包含寫入到 DOM 的回應，則更新 `id`，否則刪除：
  - 即 `<span class="demo-response" id="info-selection"></span>`
- 更新範例的文字描述。
- 如果要顯示主程序或渲染器程序範例程式碼，請相應地包含或刪除該標記。
  - 透過將路徑加到 `code` 標籤的 `data-path` 屬性，可以讀取範例程式碼並加到 DOM。
    - 即 `<pre><code data-path="renderer-process/native-ui/dialogs/information.js"></pre></code>`
  - 在樣板底部的 script 標籤載入你的渲染器程序程式碼
    - 即 `require('./renderer-process/native-ui/dialogs/information')`

#### 試試看

此刻，你應該可以執行應用程式了，`npm start` 後看看你的章節或範例。 :tada:
