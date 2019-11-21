const {desktopCapturer, shell} = require('electron')
const {screen} = require('electron').remote

const fs = require('fs')
const os = require('os')
const path = require('path')

const screenshot = document.getElementById('screen-shot')
const screenshotMsg = document.getElementById('screenshot-path')

screenshot.addEventListener('click', (event) => {
  screenshotMsg.textContent = '取得螢幕中...'
  const thumbSize = determineScreenShotSize()
  let options = { types: ['screen'], thumbnailSize: thumbSize }

  desktopCapturer.getSources(options).then(async sources => {
    sources.forEach((source) => {
      if (source.name.toLowerCase() === 'entire screen' || source.name.toLowerCase() === 'screen 1') {
        const screenshotPath = path.join(os.tmpdir(), 'screenshot.png')

        fs.writeFile(screenshotPath, source.thumbnail.toPNG(), (error) => {
          if (error) return console.log(error)
          shell.openExternal(`file://${screenshotPath}`)

          const message = `已儲存螢幕截圖至：${screenshotPath}`
          screenshotMsg.textContent = message
        })
      }
    })
  }).catch(error => {
    console.log(error)
  })
})

function determineScreenShotSize () {
  const screenSize = screen.getPrimaryDisplay().workAreaSize
  const maxDimension = Math.max(screenSize.width, screenSize.height)
  return {
    width: maxDimension * window.devicePixelRatio,
    height: maxDimension * window.devicePixelRatio
  }
}
