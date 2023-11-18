import { useEffect } from 'react'
import AddMember from './AddMember'
import CardMember from './CardMember'
import TableMember from './TableMember'
import { useDispatch } from 'react-redux'
import { adminDeleteMember } from 'features/slice/user/memberSlice'
import { useSelector } from 'react-redux'
import { Divider } from 'antd'
import { getMemberByFarmId } from 'features/slice/user/memberByFarm'

const StatisticMember = () => {
  const dispatch = useDispatch()
  const memberByFarm = useSelector((state) => state.memberByFarm.data)
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
      <CardMember memberByFarm={memberByFarm} />
      <Divider dashed />
      <TableMember
        memberByFarm={memberByFarm}
        onFinishDelete={onFinishDelete}
      />
    </div>
  )
}
export default StatisticMember
