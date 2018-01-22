const fs = require('fs')
const os = require('os')
const path = require('path')
const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain
const shell = electron.shell

ipc.on('print-to-pdf', function (event) {
  const pdfPath = path.join(os.tmpdir(), 'print.pdf')
  const win = BrowserWindow.fromWebContents(event.sender)
  // 使用預設列印選項
  win.webContents.printToPDF({}, function (error, data) {
    if (error) throw error
    fs.writeFile(pdfPath, data, function (error) {
      if (error) {
        throw error
      }
      shell.openExternal('file://' + pdfPath)
      event.sender.send('wrote-pdf', pdfPath)
    })
  })
})
