import { Divider } from 'antd'
import DisplayCard from './DisplayCard'
import TableZone from './TableZone'
import { useDispatch, useSelector } from 'react-redux'
import { getZoneByFarmId } from 'features/slice/zone/zoneByFarmSlice'
import { getMemberById } from 'features/slice/user/memberSlice'
import { useEffect } from 'react'
import { authServices } from 'services/authServices'
import { adminDeleteZone } from 'features/slice/zone/zoneSlice'

const StatisticZone = () => {
  const dispatch = useDispatch()
  const member = useSelector((state) => state.member.data)
  const farmId = member.farmId
  const zoneByFarm = useSelector((state) => state.zoneByFarm.data)

  useEffect(() => {
    dispatch(getMemberById(authServices.getUserId()))
    dispatch(getZoneByFarmId(farmId))
  }, [dispatch])

  const onFinishDelete = (id) => {
    dispatch(adminDeleteZone(id)).then(() => {
      loadData()
    })
  }

  const loadData = () => {
    dispatch(getZoneByFarmId(farmId))
  }
  return (
    <>
      <DisplayCard />
      <Divider dashed />
      <TableZone zoneByFarm={zoneByFarm} onFinishDelete={onFinishDelete} />
    </>
  )
}

export default StatisticZone
