const ipc = require('electron').ipcMain
const dialog = require('electron').dialog

ipc.on('open-information-dialog', function (event) {
  const options = {
    type: 'info',
    title: '訊息',
    message: "這是一個訊息對話框。很棒對吧？",
    buttons: ['是', '否']
  }
  dialog.showMessageBox(options, function (index) {
    event.sender.send('information-dialog-selection', index)
  })
})
