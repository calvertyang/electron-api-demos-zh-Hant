const ipc = require('electron').ipcRenderer

const saveBtn = document.getElementById('save-dialog')

saveBtn.addEventListener('click', function (event) {
  ipc.send('save-dialog')
})

ipc.on('saved-file', function (event, path) {
  if (!path) path = '無路徑'
  document.getElementById('file-saved').innerHTML = `選擇了路徑：${path}`
})
