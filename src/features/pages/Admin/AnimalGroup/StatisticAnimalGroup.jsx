import { Divider } from 'antd'
import DisplayCard from './DisplayCard'
import { TableAnimalGroup } from './TableAnimalGroup'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getMemberById } from 'features/slice/user/memberSlice'
import { getFieldAnimalByFarmId } from 'features/slice/field/fieldAnimalSlice'
import { authServices } from 'services/authServices'
import { adminDeleteField } from 'features/slice/field/fieldSlice'

const StatisticAnimalGroup = () => {
  const dispatch = useDispatch()
  const member = useSelector((state) => state.member.data)
  const farmId = member.farmId
  const fieldAnimal = useSelector((state) => state.fieldAnimal.data)

  useEffect(() => {
    dispatch(getMemberById(authServices.getUserId()))
    dispatch(getFieldAnimalByFarmId(farmId))
  }, [dispatch])

  const onFinishDelete = (id) => {
    dispatch(adminDeleteField(id)).then(() => {
      loadData()
    })
  }

  const loadData = () => {
    dispatch(getFieldAnimalByFarmId(farmId))
  }

  return (
    <>
      <DisplayCard fieldAnimal={fieldAnimal} />
      <Divider dashed />
      <TableAnimalGroup
        fieldAnimal={fieldAnimal}
        onFinishDelete={onFinishDelete}
      />
    </>
  )
}
export default StatisticAnimalGroup
