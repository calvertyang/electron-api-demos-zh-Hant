const notification = {
  title: '基本通知',
  body: '簡短訊息'
}
const notificationButton = document.getElementById('basic-noti')

notificationButton.addEventListener('click', () => {
  const myNotification = new window.Notification(notification.title, notification)

  myNotification.onclick = () => {
    console.log('已點選通知')
  }
})
