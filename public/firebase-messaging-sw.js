importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js')
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js'
)

//the Firebase config object
const firebaseConfig = {
  apiKey: 'AIzaSyDKF3MhWbAJYgVlce_y7czrvuddJqLjEeY',
  authDomain: 'somotaskmanagement.firebaseapp.com',
  projectId: 'somotaskmanagement',
  storageBucket: 'somotaskmanagement.appspot.com',
  messagingSenderId: '1062982681444',
  appId: '1:1062982681444:web:51219532d79c7ab0d37071',
  measurementId: 'G-WMJMD9Q5SJ',
}

firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload)
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
