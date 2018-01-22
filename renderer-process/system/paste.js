const clipboard = require('electron').clipboard

const pasteBtn = document.getElementById('paste-to')

pasteBtn.addEventListener('click', function () {
  clipboard.writeText('範例內容！')
  const message = `剪貼簿內容：${clipboard.readText()}`
  document.getElementById('paste-from').innerHTML = message
})
