const path = require('path')

const notification = {
  title: '帶有圖片的通知',
  body: '簡短訊息及一個自訂圖片',
  icon: path.join(__dirname, '../../../assets/img/programming.png')
}
const notificationButton = document.getElementById('advanced-noti')

notificationButton.addEventListener('click', () => {
  const myNotification = new window.Notification(notification.title, notification)

  myNotification.onclick = () => {
    console.log('已點選通知')
  }
})
