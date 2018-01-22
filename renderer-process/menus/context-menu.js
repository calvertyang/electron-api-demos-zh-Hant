const ipc = require('electron').ipcRenderer

// 通知主程序當「查看範例」按鈕被點選時顯示選單
const contextMenuBtn = document.getElementById('context-menu')
contextMenuBtn.addEventListener('click', function () {
  ipc.send('show-context-menu')
})
