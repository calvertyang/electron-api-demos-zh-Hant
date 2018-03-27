const {clipboard} = require('electron')

const pasteBtn = document.getElementById('paste-to')

pasteBtn.addEventListener('click', () => {
  clipboard.writeText('範例內容！')
  const message = `剪貼簿內容：${clipboard.readText()}`
  document.getElementById('paste-from').innerHTML = message
})
