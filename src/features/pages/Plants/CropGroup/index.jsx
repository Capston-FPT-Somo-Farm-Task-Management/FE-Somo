import { useDispatch } from 'react-redux'
import AddAndSearchCropGroup from './components/AddAndSearchCropGroup/AddAndSearchCropGroup'
import DisplayCropGroup from './components/DisplayCropGroup/DisplayCropGroup'
import { useSelector } from 'react-redux'
import { getFieldPlantByFarmId } from 'features/slice/field/fieldByFarm'
import { getMemberById } from 'features/slice/user/memberSlice'
import { useEffect } from 'react'
import { authServices } from 'services/authServices'
import { deleteField, updateField } from 'features/slice/field/fieldSlice'

const CropGroup = () => {
  const dispatch = useDispatch()
  const member = useSelector((state) => state.member.data)
  const fieldByFarm = useSelector((state) => state.fieldByFarm.data)
  const farmId = member.farmId

  useEffect(() => {
    dispatch(getMemberById(authServices.getUserId()))
    dispatch(getFieldPlantByFarmId(farmId))
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
    dispatch(getFieldPlantByFarmId(farmId))
  }

  return (
    <>
      <AddAndSearchCropGroup />
      <DisplayCropGroup
        fieldByFarm={fieldByFarm}
        onFinishDelete={onFinishDelete}
        onFinishUpdate={onFinishUpdate}
      />
    </>
  )
}
export default CropGroup
