const ipc = require('electron').ipcMain
const dialog = require('electron').dialog

ipc.on('save-dialog', function (event) {
  const options = {
    title: '儲存圖片',
    filters: [
      { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
    ]
  }
  dialog.showSaveDialog(options, function (filename) {
    event.sender.send('saved-file', filename)
  })
})
