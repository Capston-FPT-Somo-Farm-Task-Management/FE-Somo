import { useSelector } from 'react-redux'
import AddCropTypeAndPlant from './components/AddPlant/AddPlant'
import { useDispatch } from 'react-redux'
import { getMemberById } from 'features/slice/user/memberSlice'
import { getPlantByFarmId } from 'features/slice/plant/plantByFarmSlice'
import { getAreaActiveByFarmId } from 'features/slice/area/areaByFarmSlice'
import { authServices } from 'services/authServices'
import { useEffect } from 'react'
import {
  createPlant,
  deletePlant,
  updatePlant,
} from 'features/slice/plant/plantSlice'
import TableDisplayCrop from './components/DisplayCrop/TableDisplayCrop'
import AddPlant from './components/AddPlant/AddPlant'

const MyCrops = () => {
  const dispatch = useDispatch()
  const plantByFarm = useSelector((state) => state.plantByFarm.data)
  const areaByFarm = useSelector((state) => state.areaByFarm.data)
  const member = useSelector((state) => state.member.data)
  const farmId = member.farmId

  useEffect(() => {
    dispatch(getMemberById(authServices.getUserId()))
    dispatch(getPlantByFarmId(farmId))
    dispatch(getAreaActiveByFarmId(farmId))
  }, [dispatch])

  const onFinishCreatePlant = (values) => {
    dispatch(createPlant(values)).then(() => {
      loadDataPlant()
    })
  }

  const onFinishUpdatePlant = (values) => {
    dispatch(updatePlant(values)).then(() => {
      loadDataPlant()
    })
  }

  const onFinishDeletePlant = (id) => {
    dispatch(deletePlant(id)).then(() => {
      loadDataPlant()
    })
  }

  const loadDataPlant = () => {
    dispatch(getPlantByFarmId(farmId))
  }

  return (
    <>
      <AddPlant
        areaByFarm={areaByFarm}
        onFinishCreatePlant={onFinishCreatePlant}
        farmId={farmId}
      />
      <TableDisplayCrop
        farmId={farmId}
        areaByFarm={areaByFarm}
        plantByFarm={plantByFarm}
        onFinishUpdatePlant={onFinishUpdatePlant}
        onFinishDeletePlant={onFinishDeletePlant}
      />
    </>
  )
}
export default MyCrops
