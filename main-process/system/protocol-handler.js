const {app, dialog} = require('electron')

app.setAsDefaultProtocolClient('electron-api-demos')

app.on('open-url', (event, url) => {
  dialog.showErrorBox('歡迎回來', `你來自：${url}`)
})
