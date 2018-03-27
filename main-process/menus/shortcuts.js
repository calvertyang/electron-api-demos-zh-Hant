const {app, dialog, globalShortcut} = require('electron')

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+Alt+K', () => {
    dialog.showMessageBox({
      type: 'info',
      message: '成功！',
      detail: '你按下了全域註冊綁定的快速鍵。',
      buttons: ['確定']
    })
  })
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})
