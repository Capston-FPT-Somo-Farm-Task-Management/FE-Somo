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
          duration: 60000,
          position: 'top-right',
        }
      )
    })
    return () => {
      unsubscribe.catch((err) => console.log('failed: ', err))
    }
  }, [notification])
  return (
    <div>
      <Toaster />
    </div>
  )
}
export default Notification
