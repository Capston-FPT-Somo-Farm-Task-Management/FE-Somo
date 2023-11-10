import { Divider } from 'antd'
import DisplayCard from './DisplayCard'
import DisplayChartTask from './DisplayChartTask'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getMemberById } from 'features/slice/user/memberSlice'
import { getAreaByFarmId } from 'features/slice/area/areaByFarmSlice'
import { useEffect } from 'react'
import { authServices } from 'services/authServices'
import { getZoneByFarmId } from 'features/slice/zone/zoneByFarmSlice'
import { getFieldPlantByFarmId } from 'features/slice/field/fieldPlantSlice'
import { getFieldAnimalByFarmId } from 'features/slice/field/fieldAnimalSlice'

const Dashboard = () => {
  const dispatch = useDispatch()
  const areaByFarm = useSelector((state) => state.areaByFarm.data)
  const zoneByFarm = useSelector((state) => state.zoneByFarm.data)
  const fieldPlant = useSelector((state) => state.fieldPlant.data)
  const fieldAnimal = useSelector((state) => state.fieldAnimal.data)

  const member = useSelector((state) => state.member.data)
  // const farmId = member.farmId
  const farmId = localStorage.getItem('farmId')

  useEffect(() => {
    dispatch(getMemberById(authServices.getUserId()))
    dispatch(getAreaByFarmId(farmId))
    dispatch(getZoneByFarmId(farmId))
    dispatch(getFieldPlantByFarmId(farmId))
    dispatch(getFieldAnimalByFarmId(farmId))
  }, [dispatch])

  return (
    <>
      <DisplayCard
        areaByFarm={areaByFarm}
        zoneByFarm={zoneByFarm}
        fieldAnimal={fieldAnimal}
        fieldPlant={fieldPlant}
      />
      <Divider dashed />
      <DisplayChartTask />
    </>
  )
}
export default Dashboard
