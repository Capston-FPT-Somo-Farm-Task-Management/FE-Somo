import { useDispatch } from 'react-redux'
import AddZone from './components/AddZone/AddZone'
import DisplayZone from './components/DisplayZone/DisplayZone'
import { useSelector } from 'react-redux'
import { getMemberById } from 'features/slice/user/memberSlice'
import { authServices } from 'services/authServices'
import { getZoneByFarmId } from 'features/slice/zone/zoneByFarm'
import { useEffect } from 'react'
import {
  createZone,
  deleteZone,
  updateZone,
} from 'features/slice/zone/zoneSlice'

const Zone = () => {
  const dispatch = useDispatch()
  const member = useSelector((state) => state.member.data)
  const zoneByFarm = useSelector((state) => state.zoneByFarm.data)
  const farmId = member.farmId

  useEffect(() => {
    dispatch(getMemberById(authServices.getUserId()))
    dispatch(getZoneByFarmId(farmId))
  }, [dispatch])

  const onFinishCreate = (values) => {
    dispatch(createZone(values)).then(() => {
      loadData()
    })
  }

  const onFinishUpdate = (values) => {
    dispatch(updateZone(values)).then(() => {
      loadData()
    })
  }

  const onFinishDelete = (id) => {
    dispatch(deleteZone(id)).then(() => {
      loadData()
    })
  }

  const loadData = () => {
    dispatch(getZoneByFarmId(farmId))
  }

  return (
    <>
      <AddZone onFinishCreate={onFinishCreate} farmId={farmId} />
      <DisplayZone
        zoneByFarm={zoneByFarm}
        loadData={loadData}
        onFinishDelete={onFinishDelete}
        onFinishUpdate={onFinishUpdate}
        farmId={farmId}
      />
    </>
  )
}
export default Zone
