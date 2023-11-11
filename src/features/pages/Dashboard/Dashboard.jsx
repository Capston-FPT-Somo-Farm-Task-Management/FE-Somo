import { useSelector } from 'react-redux'
import ChartTaskWeek from './ChartTaskWeek'
import { getMemberById } from 'features/slice/user/memberSlice'
import { getTaskByWeek } from 'features/slice/task/taskByWeekSlice'
import { useDispatch } from 'react-redux'
import { authServices } from 'services/authServices'
import { useEffect } from 'react'
import PieChartTaskWeek from './PieChartTaskWeek'
import { Divider } from 'antd'

const Dashboard = () => {
  const dispatch = useDispatch()
  const member = useSelector((state) => state.member.data)
  const taskByWeek = useSelector((state) => state.taskByWeek.data)
  const memberId = member.id

  useEffect(() => {
    dispatch(getMemberById(authServices.getUserId()))
    dispatch(getTaskByWeek(memberId))
  }, [dispatch])

  return (
    <>
      <PieChartTaskWeek taskByWeek={taskByWeek} />
      <Divider dashed />
      <ChartTaskWeek taskByWeek={taskByWeek} />
    </>
  )
}
export default Dashboard
