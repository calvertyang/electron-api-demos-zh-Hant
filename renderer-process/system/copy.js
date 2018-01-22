const clipboard = require('electron').clipboard

const copyBtn = document.getElementById('copy-to')
const copyInput = document.getElementById('copy-to-input')

copyBtn.addEventListener('click', function () {
  if (copyInput.value !== '') copyInput.value = ''
  copyInput.placeholder = '已複製！在這貼上試試看。'
  clipboard.writeText('Electron 範例！')
})
