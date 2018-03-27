const {ipcRenderer} = require('electron')

const asyncMsgBtn = document.getElementById('async-msg')

asyncMsgBtn.addEventListener('click', () => {
  ipcRenderer.send('asynchronous-message', 'ping')
})

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  const message = `非同步訊息回應：${arg}`
  document.getElementById('async-reply').innerHTML = message
})
