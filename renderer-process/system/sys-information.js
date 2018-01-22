const os = require('os')
const homeDir = os.homedir()

const sysInfoBtn = document.getElementById('sys-info')

sysInfoBtn.addEventListener('click', function () {
  const message = `你的系統家目錄是：${homeDir}`
  document.getElementById('got-sys-info').innerHTML = message
})
