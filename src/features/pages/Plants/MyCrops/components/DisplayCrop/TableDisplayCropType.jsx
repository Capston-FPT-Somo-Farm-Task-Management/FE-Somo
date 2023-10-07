import { Table } from 'antd'
import { getPlantType } from 'features/slice/plantType/plantTypeSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { columnsCropType } from './DisplayCropData'

const TableDisplayCropType = () => {
  const plantType = useSelector((state) => state.plantType.data)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPlantType())
  }, [])

  return (
    <Table rowKey="id" columns={columnsCropType} dataSource={plantType.data} />
  )
}
export default TableDisplayCropType
