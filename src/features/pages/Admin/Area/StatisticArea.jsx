import { useDispatch, useSelector } from 'react-redux'
import TableArea from './TableArea'
import { useEffect } from 'react'
import { getMemberById } from 'features/slice/user/memberSlice'
import { getAreaByFarmId } from 'features/slice/area/areaByFarmSlice'
import { authServices } from 'services/authServices'
import DisplayCard from './DisplayCard'
import { Divider } from 'antd'
import { adminDeleteArea } from 'features/slice/area/areaSlice'

const StatisticArea = () => {
  const dispatch = useDispatch()

  const member = useSelector((state) => state.member.data)
  const areaByFarm = useSelector((state) => state.areaByFarm.data)
  const farmId = member.farmId

  useEffect(() => {
    dispatch(getMemberById(authServices.getUserId()))
    dispatch(getAreaByFarmId(farmId))
  }, [dispatch])

  const onFinishDelete = (id) => {
    dispatch(adminDeleteArea(id)).then(() => {
      loadData()
    })
  }

  const loadData = () => {
    dispatch(getAreaByFarmId(farmId))
  }

  return (
    <>
      <DisplayCard areaByFarm={areaByFarm} />
      <Divider dashed />
      <TableArea areaByFarm={areaByFarm} onFinishDelete={onFinishDelete} />
    </>
  )
}
export default StatisticArea
