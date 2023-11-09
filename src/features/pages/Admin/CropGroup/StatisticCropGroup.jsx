import { Divider } from 'antd'
import DisplayCard from './DisplayCard'
import TableCropGroup from './TableCropGroup'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getFieldPlantByFarmId } from 'features/slice/field/fieldPlantSlice'
import { getMemberById } from 'features/slice/user/memberSlice'
import { useEffect } from 'react'
import { authServices } from 'services/authServices'
import { adminDeleteField } from 'features/slice/field/fieldSlice'

const StatisticCropGroup = () => {
  const dispatch = useDispatch()
  const member = useSelector((state) => state.member.data)
  const farmId = member.farmId
  const fieldPlant = useSelector((state) => state.fieldPlant.data)

  useEffect(() => {
    dispatch(getMemberById(authServices.getUserId()))
    dispatch(getFieldPlantByFarmId(farmId))
  }, [dispatch])

  const onFinishDelete = (id) => {
    dispatch(adminDeleteField(id)).then(() => {
      loadData()
    })
  }

  const loadData = () => {
    dispatch(getFieldPlantByFarmId(farmId))
  }
  return (
    <>
      <DisplayCard fieldPlant={fieldPlant} />
      <Divider dashed />
      <TableCropGroup fieldPlant={fieldPlant} onFinishDelete={onFinishDelete} />
    </>
  )
}

export default StatisticCropGroup
