import { useDispatch } from 'react-redux'
import AddAndSearchCropGroup from './components/AddAndSearchCropGroup/AddAndSearchCropGroup'
import DisplayCropGroup from './components/DisplayCropGroup/DisplayCropGroup'
import { useSelector } from 'react-redux'
import { getFieldPlantByFarmId } from 'features/slice/field/fieldByFarm'
import { getMemberById } from 'features/slice/user/memberSlice'
import { useEffect } from 'react'
import { authServices } from 'services/authServices'
import {
  createField,
  deleteField,
  updateField,
} from 'features/slice/field/fieldSlice'
import { getAreaActiveByFarmId } from 'features/slice/area/areaByFarm'

const CropGroup = () => {
  const dispatch = useDispatch()
  const member = useSelector((state) => state.member.data)
  const farmId = member.farmId
  const areaByFarm = useSelector((state) => state.areaByFarm.data)
  const fieldByFarm = useSelector((state) => state.fieldByFarm.data)

  useEffect(() => {
    dispatch(getMemberById(authServices.getUserId()))
    dispatch(getFieldPlantByFarmId(farmId))
    dispatch(getAreaActiveByFarmId(farmId))
  }, [dispatch])

  const onFinishCreate = (values) => {
    dispatch(createField(values)).then(() => {
      loadData()
    })
  }

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
      <AddAndSearchCropGroup
        areaByFarm={areaByFarm}
        onFinishCreate={onFinishCreate}
      />
      <DisplayCropGroup
        areaByFarm={areaByFarm}
        fieldByFarm={fieldByFarm}
        onFinishDelete={onFinishDelete}
        onFinishUpdate={onFinishUpdate}
      />
    </>
  )
}
export default CropGroup
