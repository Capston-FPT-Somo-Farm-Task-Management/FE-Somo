import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
const firebaseConfig = {
  apiKey: 'AIzaSyDKF3MhWbAJYgVlce_y7czrvuddJqLjEeY',
  authDomain: 'somotaskmanagement.firebaseapp.com',
  projectId: 'somotaskmanagement',
  storageBucket: 'somotaskmanagement.appspot.com',
  messagingSenderId: '1062982681444',
  appId: '1:1062982681444:web:51219532d79c7ab0d37071',
  measurementId: 'G-WMJMD9Q5SJ',
}

const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)

export const requestPermission = () => {
  console.log('Requesting User Permission......')
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification User Permission Granted.')
      return getToken(messaging, {
        vapidKey: `BOM4UJBk2hDpUNvpSgOSZD2lnI0XVU6kloCtUPPgVdBbGh-sccIqTbbVfINmPCnot5PwQY4rok8lRqGEf5zuBfU`,
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log('Client Token: ', currentToken)
          } else {
            console.log('Failed to generate the app registration token.')
          }
        })
        .catch((err) => {
          console.log(
            'An error occurred when requesting to receive the token.',
            err
          )
        })
    } else {
      console.log('User Permission Denied.')
    }
  })
}

requestPermission()

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload)
    })
  })
