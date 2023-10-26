import { onMessageListener, requestPermission } from 'features/firebase'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const Notification = () => {
  const [notification, setNotification] = useState({ title: '', body: '' })
  useEffect(() => {
    requestPermission()
    const unsubscribe = onMessageListener().then((payload) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      })
      toast.success(
        `${payload?.notification?.title}: ${payload?.notification?.body}`,
        {
          duration: 10000,
          position: 'top-right',
          style: {
            fontSize: '16px',
            width: '400px',
          },
        }
      )
    })
    return () => {
      unsubscribe.catch((err) => console.log('failed: ', err))
    }
  }, [])
  return (
    <div>
      <Toaster />
    </div>
  )
}
export default Notification
