import { useEffect } from 'react'
import AddMember from './AddMember'
import CardMember from './CardMember'
import TableMember from './TableMember'
import { useDispatch } from 'react-redux'
import {
  adminDeleteMember,
  getMemberByFarmId,
} from 'features/slice/user/memberSlice'
import { useSelector } from 'react-redux'
import { Divider } from 'antd'

const StatisticMember = () => {
  const dispatch = useDispatch()
  const member = useSelector((state) => state.member.data)
  const farmId = localStorage.getItem('farmId')

  useEffect(() => {
    dispatch(getMemberByFarmId(farmId))
  }, [dispatch])

  const onFinishDelete = (id) => {
    console.log(id)
    dispatch(adminDeleteMember(id)).then(() => {
      loadData()
    })
  }

  const loadData = () => {
    dispatch(getMemberByFarmId(farmId))
  }

  return (
    <div>
      <AddMember />
      <CardMember member={member} />
      <Divider dashed />
      <TableMember member={member} onFinishDelete={onFinishDelete} />
    </div>
  )
}
export default StatisticMember
