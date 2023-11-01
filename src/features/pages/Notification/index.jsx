import { useDispatch } from 'react-redux'
import DisplayNotification from './DisplayNotification/DisplayNotification'
import { useSelector } from 'react-redux'
import { authServices } from 'services/authServices'
import { useEffect } from 'react'
import { changeNotifyIsRead } from 'features/slice/notification/notificationReadSlice'
import { countNewNotify } from 'features/slice/notification/notificationCountSlice'

const Notification = () => {
  const dispatch = useDispatch()

  const countNew = useSelector((state) => state.notificationCount.data)

  useEffect(() => {
    dispatch(countNewNotify(authServices.getUserId()))
  }, [dispatch])

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
      <DisplayNotification
        changeStatusNotify={changeStatusNotify}
        countNew={countNew}
      />
    </div>
  )
}
export default Notification
