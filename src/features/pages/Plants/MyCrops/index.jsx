import { useSelector } from 'react-redux'
import AddCropTypeAndPlant from './components/AddPlantAndPlantType/AddPlantAndPlantType'
import DisplayCrop from './components/DisplayCrop/DisplayCrop'
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
import {
  createHabitantType,
  deleteHabitantType,
  updateHabitantType,
} from 'features/slice/habitant/habitantTypeSlice'
import { getPlantType } from 'features/slice/plant/plantTypeSlice'

const MyCrops = () => {
  const dispatch = useDispatch()
  const plantByFarm = useSelector((state) => state.plantByFarm.data)
  const areaByFarm = useSelector((state) => state.areaByFarm.data)
  const plantType = useSelector((state) => state.plantType.data)
  const member = useSelector((state) => state.member.data)
  const farmId = member.farmId

  useEffect(() => {
    dispatch(getMemberById(authServices.getUserId()))
    dispatch(getPlantByFarmId(farmId))
    dispatch(getAreaActiveByFarmId(farmId))
    dispatch(getPlantType(farmId))
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

  // Type

  useEffect(() => {
    dispatch(getPlantType(farmId))
  }, [dispatch])

  const onFinishCreatePlantType = (values) => {
    dispatch(createHabitantType(values)).then(() => {
      loadDataPlantType()
    })
  }

  const onFinishUpdatePlantType = (values) => {
    dispatch(updateHabitantType(values)).then(() => {
      loadDataPlantType()
    })
  }

  const onFinishDeletePlantType = (id) => {
    dispatch(deleteHabitantType(id)).then(() => {
      loadDataPlantType()
    })
  }

  const loadDataPlantType = () => {
    dispatch(getPlantType(farmId))
  }

  return (
    <>
      <AddCropTypeAndPlant
        areaByFarm={areaByFarm}
        onFinishCreatePlant={onFinishCreatePlant}
        onFinishCreatePlantType={onFinishCreatePlantType}
        farmId={farmId}
      />
      <DisplayCrop
        areaByFarm={areaByFarm}
        plantByFarm={plantByFarm}
        plantType={plantType}
        farmId={farmId}
        loadDataPlantType={loadDataPlantType}
        onFinishDeletePlant={onFinishDeletePlant}
        onFinishUpdatePlant={onFinishUpdatePlant}
        onFinishUpdatePlantType={onFinishUpdatePlantType}
        onFinishDeletePlantType={onFinishDeletePlantType}
      />
    </>
  )
}
export default MyCrops
