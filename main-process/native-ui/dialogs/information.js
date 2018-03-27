const {ipcMain, dialog} = require('electron')

ipcMain.on('open-information-dialog', (event) => {
  const options = {
    type: 'info',
    title: '訊息',
    message: "這是一個訊息對話框。很棒對吧？",
    buttons: ['是', '否']
  }
  dialog.showMessageBox(options, (index) => {
    event.sender.send('information-dialog-selection', index)
  })
})
