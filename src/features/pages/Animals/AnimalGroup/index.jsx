import { useDispatch, useSelector } from 'react-redux'
import AddAndSearchAnimalGroup from './components/AddAndSearchAnimalGroup/AddAndSearchAnimalGroup'
import DisplayAnimalGroup from './components/DisplayAnimalGroup/DisplayAnimalGroup'
import { getFieldAnimalByFarmId } from 'features/slice/field/fieldByFarm'
import { useEffect } from 'react'
import { getMemberById } from 'features/slice/user/memberSlice'
import { authServices } from 'services/authServices'
import { deleteField, updateField } from 'features/slice/field/fieldSlice'

const AnimalGroup = () => {
  const dispatch = useDispatch()
  const member = useSelector((state) => state.member.data)
  const fieldByFarm = useSelector((state) => state.fieldByFarm.data)
  const farmId = member.farmId

  useEffect(() => {
    dispatch(getMemberById(authServices.getUserId()))
    dispatch(getFieldAnimalByFarmId(farmId))
  }, [dispatch])

  // const onFinishCreate = (values) => {
  //   const finalValues = {
  //     farmId: farmId,
  //     ...values,
  //   }
  //   dispatch(createArea(finalValues)).then(() => {
  //     loadData()
  //   })
  // }

  const onFinishUpdate = (values) => {
    dispatch(updateField(values)).then(() => {
      loadData()
    })
  }

  const onFinishDelete = (id) => {
    dispatch(deleteField(id)).then(() => {
      loadData()
    })
  }

  const loadData = () => {
    dispatch(getFieldAnimalByFarmId(farmId))
  }

  return (
    <>
      <AddAndSearchAnimalGroup />
      <DisplayAnimalGroup
        fieldByFarm={fieldByFarm}
        onFinishDelete={onFinishDelete}
        onFinishUpdate={onFinishUpdate}
      />
    </>
  )
}
export default AnimalGroup
