import { useDispatch } from 'react-redux'
import DisplayNotification from './DisplayNotification/DisplayNotification'
import { changeNotifyIsRead } from 'features/slice/notification/notificationReadSlice'
import { authServices } from 'services/authServices'
import { getNotifyIsNewById } from 'features/slice/notification/notificationIsNewSlice'

const Notification = () => {
  const dispatch = useDispatch()

  const changeStatusNotify = (values) => {
    dispatch(changeNotifyIsRead(values)).then(() => {
      loadData()
    })
  }

  const loadData = () => {
    // dispatch(getNotifyIsNewById(authServices.getUserId()))
  }

  return (
    <div>
      <DisplayNotification changeStatusNotify={changeStatusNotify} />
    </div>
  )
}
export default Notification
