const {ipcRenderer} = require('electron')

const saveBtn = document.getElementById('save-dialog')

saveBtn.addEventListener('click', (event) => {
  ipcRenderer.send('save-dialog')
})

ipcRenderer.on('saved-file', (event, path) => {
  if (!path) path = '無路徑'
  document.getElementById('file-saved').innerHTML = `選擇了路徑：${path}`
})
