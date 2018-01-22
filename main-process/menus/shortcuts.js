const electron = require('electron')
const app = electron.app
const dialog = electron.dialog
const globalShortcut = electron.globalShortcut

app.on('ready', function () {
  globalShortcut.register('CommandOrControl+Alt+K', function () {
    dialog.showMessageBox({
      type: 'info',
      message: '成功！',
      detail: '你按下了全域註冊綁定的快速鍵。',
      buttons: ['確定']
    })
  })
})

app.on('will-quit', function () {
  globalShortcut.unregisterAll()
})
