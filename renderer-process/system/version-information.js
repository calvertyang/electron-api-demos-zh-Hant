const versionInfoBtn = document.getElementById('version-info')

const electronVersion = process.versions.electron

versionInfoBtn.addEventListener('click', function () {
  const message = `本應用程式使用的 Electron 版本：${electronVersion}`
  document.getElementById('got-version-info').innerHTML = message
})
