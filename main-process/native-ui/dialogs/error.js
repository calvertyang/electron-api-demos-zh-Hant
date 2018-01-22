const ipc = require('electron').ipcMain
const dialog = require('electron').dialog

ipc.on('open-error-dialog', function (event) {
  dialog.showErrorBox('錯誤訊息', '錯誤訊息範例')
})
