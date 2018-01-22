const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const app = electron.app

let template = [{
  label: '編輯',
  submenu: [{
    label: '復原',
    accelerator: 'CmdOrCtrl+Z',
    role: 'undo'
  }, {
    label: '重做',
    accelerator: 'Shift+CmdOrCtrl+Z',
    role: 'redo'
  }, {
    type: 'separator'
  }, {
    label: '剪下',
    accelerator: 'CmdOrCtrl+X',
    role: 'cut'
  }, {
    label: '複製',
    accelerator: 'CmdOrCtrl+C',
    role: 'copy'
  }, {
    label: '貼上',
    accelerator: 'CmdOrCtrl+V',
    role: 'paste'
  }, {
    label: '全選',
    accelerator: 'CmdOrCtrl+A',
    role: 'selectall'
  }]
}, {
  label: '檢視',
  submenu: [{
    label: '重新載入',
    accelerator: 'CmdOrCtrl+R',
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        // 重新載入後，重新開始並關閉任何已開啟的次要視窗
        if (focusedWindow.id === 1) {
          BrowserWindow.getAllWindows().forEach(function (win) {
            if (win.id > 1) {
              win.close()
            }
          })
        }
        focusedWindow.reload()
      }
    }
  }, {
    label: '切換全螢幕',
    accelerator: (function () {
      if (process.platform === 'darwin') {
        return 'Ctrl+Command+F'
      } else {
        return 'F11'
      }
    })(),
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
      }
    }
  }, {
    label: '切換開發者工具',
    accelerator: (function () {
      if (process.platform === 'darwin') {
        return 'Alt+Command+I'
      } else {
        return 'Ctrl+Shift+I'
      }
    })(),
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.toggleDevTools()
      }
    }
  }, {
    type: 'separator'
  }, {
    label: '應用程式選單範例',
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        const options = {
          type: 'info',
          title: '應用程式選單範例',
          buttons: ['確定'],
          message: '本範例適用於「選單」章節，示範如何在應用程式選單中建立可點選的選單項目。'
        }
        electron.dialog.showMessageBox(focusedWindow, options, function () {})
      }
    }
  }]
}, {
  label: '視窗',
  role: 'window',
  submenu: [{
    label: '最小化',
    accelerator: 'CmdOrCtrl+M',
    role: 'minimize'
  }, {
    label: '關閉',
    accelerator: 'CmdOrCtrl+W',
    role: 'close'
  }, {
    type: 'separator'
  }, {
    label: '重新開啟視窗',
    accelerator: 'CmdOrCtrl+Shift+T',
    enabled: false,
    key: 'reopenMenuItem',
    click: function () {
      app.emit('activate')
    }
  }]
}, {
  label: '幫助',
  role: 'help',
  submenu: [{
    label: '了解更多',
    click: function () {
      electron.shell.openExternal('http://electron.atom.io')
    }
  }]
}]

function addUpdateMenuItems (items, position) {
  if (process.mas) return

  const version = electron.app.getVersion()
  let updateItems = [{
    label: `版本 ${version}`,
    enabled: false
  }, {
    label: '正在檢查更新',
    enabled: false,
    key: 'checkingForUpdate'
  }, {
    label: '檢查更新',
    visible: false,
    key: 'checkForUpdate',
    click: function () {
      require('electron').autoUpdater.checkForUpdates()
    }
  }, {
    label: '重新啟動並安裝更新',
    enabled: true,
    visible: false,
    key: 'restartToUpdate',
    click: function () {
      require('electron').autoUpdater.quitAndInstall()
    }
  }]

  items.splice.apply(items, [position, 0].concat(updateItems))
}

function findReopenMenuItem () {
  const menu = Menu.getApplicationMenu()
  if (!menu) return

  let reopenMenuItem
  menu.items.forEach(function (item) {
    if (item.submenu) {
      item.submenu.items.forEach(function (item) {
        if (item.key === 'reopenMenuItem') {
          reopenMenuItem = item
        }
      })
    }
  })
  return reopenMenuItem
}

if (process.platform === 'darwin') {
  const name = electron.app.getName()
  template.unshift({
    label: name,
    submenu: [{
      label: `關於 ${name}`,
      role: 'about'
    }, {
      type: 'separator'
    }, {
      label: '服務',
      role: 'services',
      submenu: []
    }, {
      type: 'separator'
    }, {
      label: `隱藏 ${name}`,
      accelerator: 'Command+H',
      role: 'hide'
    }, {
      label: '隱藏其他',
      accelerator: 'Command+Alt+H',
      role: 'hideothers'
    }, {
      label: '全部顯示',
      role: 'unhide'
    }, {
      type: 'separator'
    }, {
      label: '結束',
      accelerator: 'Command+Q',
      click: function () {
        app.quit()
      }
    }]
  })

  // 視窗選單
  template[3].submenu.push({
    type: 'separator'
  }, {
    label: '全部提到最上層',
    role: 'front'
  })

  addUpdateMenuItems(template[0].submenu, 1)
}

if (process.platform === 'win32') {
  const helpMenu = template[template.length - 1].submenu
  addUpdateMenuItems(helpMenu, 0)
}

app.on('ready', function () {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})

app.on('browser-window-created', function () {
  let reopenMenuItem = findReopenMenuItem()
  if (reopenMenuItem) reopenMenuItem.enabled = false
})

app.on('window-all-closed', function () {
  let reopenMenuItem = findReopenMenuItem()
  if (reopenMenuItem) reopenMenuItem.enabled = true
})
