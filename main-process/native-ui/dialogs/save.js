const {ipcMain, dialog} = require('electron')

ipcMain.on('save-dialog', (event) => {
  const options = {
    title: '儲存圖片',
    filters: [
      { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
    ]
  }
  dialog.showSaveDialog(options, (filename) => {
    event.sender.send('saved-file', filename)
  })
})
