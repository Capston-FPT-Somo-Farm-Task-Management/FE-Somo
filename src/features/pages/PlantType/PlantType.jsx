import { useDispatch } from 'react-redux'
import AddPlantType from './AddPlantType'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { authServices } from 'services/authServices'
import { getMemberById } from 'features/slice/user/memberSlice'
import { getPlantType } from 'features/slice/plant/plantTypeSlice'
import {
  createHabitantType,
  deleteHabitantType,
  updateHabitantType,
} from 'features/slice/habitant/habitantTypeSlice'
import DisplayPlantType from './DisplayPlantType'

const PlantType = () => {
  const dispatch = useDispatch()
  const plantType = useSelector((state) => state.plantType.data)
  const member = useSelector((state) => state.member.data)
  const farmId = member.farmId

  useEffect(() => {
    dispatch(getMemberById(authServices.getUserId()))
    dispatch(getPlantType(farmId))
  }, [dispatch])
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
      <AddPlantType
        onFinishCreatePlantType={onFinishCreatePlantType}
        farmId={farmId}
      />
      <DisplayPlantType
        plantType={plantType}
        farmId={farmId}
        loadDataPlantType={loadDataPlantType}
        onFinishUpdatePlantType={onFinishUpdatePlantType}
        onFinishDeletePlantType={onFinishDeletePlantType}
      />
    </>
  )
}
export default PlantType
