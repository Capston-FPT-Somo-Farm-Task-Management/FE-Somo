import { useDispatch } from 'react-redux'
import AddZone from './components/AddZone/AddZone'
import { useSelector } from 'react-redux'
import { getMemberById } from 'features/slice/user/memberSlice'
import { authServices } from 'services/authServices'
import { getZoneByFarmId } from 'features/slice/zone/zoneByFarmSlice'
import { useEffect } from 'react'
import {
  createZone,
  deleteZone,
  updateZone,
} from 'features/slice/zone/zoneSlice'
import { getAreaActiveByFarmId } from 'features/slice/area/areaByFarmSlice'
import { getZoneType } from 'features/slice/zone/zoneTypeSlice'
import TableDisplayZone from './components/DisplayZone/TableDisplayZone'

const Zone = () => {
  const dispatch = useDispatch()
  const member = useSelector((state) => state.member.data)
  const farmId = member.farmId
  const zoneByFarm = useSelector((state) => state.zoneByFarm.data)
  const areaByFarm = useSelector((state) => state.areaByFarm.data)
  const zoneType = useSelector((state) => state.zoneType.data)

  useEffect(() => {
    dispatch(getMemberById(authServices.getUserId()))
    dispatch(getAreaActiveByFarmId(farmId))
    dispatch(getZoneByFarmId(farmId))
    dispatch(getZoneType())
  }, [dispatch])

  const onFinishCreateZone = (values) => {
    dispatch(createZone(values)).then(() => {
      loadData()
    })
  }

  const onFinishUpdateZone = (values) => {
    dispatch(updateZone(values)).then(() => {
      loadData()
    })
  }

  const onFinishDeleteZone = (id) => {
    dispatch(deleteZone(id)).then(() => {
      loadData()
    })
  }

  const loadData = () => {
    dispatch(getZoneByFarmId(farmId))
  }

  return (
    <>
      <AddZone
        areaByFarm={areaByFarm}
        zoneType={zoneType}
        onFinishCreateZone={onFinishCreateZone}
      />
      <TableDisplayZone
        areaByFarm={areaByFarm}
        zoneByFarm={zoneByFarm}
        zoneType={zoneType}
        onFinishUpdateZone={onFinishUpdateZone}
        onFinishDeleteZone={onFinishDeleteZone}
      />
    </>
  )
}
export default Zone
