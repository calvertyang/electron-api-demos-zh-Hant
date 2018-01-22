const app = require('electron').app
const dialog = require('electron').dialog

app.setAsDefaultProtocolClient('electron-api-demos')

app.on('open-url', function (event, url) {
  dialog.showErrorBox('歡迎回來', `你來自：${url}`)
})
