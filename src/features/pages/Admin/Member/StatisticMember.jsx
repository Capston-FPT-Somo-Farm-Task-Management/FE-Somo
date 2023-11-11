import { useEffect } from 'react'
import AddMember from './AddMember'
import CardMember from './CardMember'
import TableMember from './TableMember'
import { useDispatch } from 'react-redux'
import { getMemberByFarmId } from 'features/slice/user/memberSlice'
import { useSelector } from 'react-redux'
import { Divider } from 'antd'

const StatisticMember = () => {
  const dispatch = useDispatch()
  const member = useSelector((state) => state.member.data)
  const farmId = localStorage.getItem('farmId')

  console.log(member)
  useEffect(() => {
    dispatch(getMemberByFarmId(farmId))
  }, [dispatch])

  return (
    <div>
      <AddMember />
      <CardMember />
      <Divider dashed />
      <TableMember member={member} />
    </div>
  )
}
export default StatisticMember
