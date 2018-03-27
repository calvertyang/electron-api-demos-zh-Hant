const {ipcMain, dialog} = require('electron')

ipcMain.on('open-error-dialog', (event) => {
  dialog.showErrorBox('錯誤訊息', '錯誤訊息範例')
})
