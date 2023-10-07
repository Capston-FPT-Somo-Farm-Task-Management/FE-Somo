import { Table } from 'antd'
import { columnsCrop, onChange } from './DisplayCropData'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getPlants } from 'features/slice/plant/plantSlice'

const TableDisplayCrop = () => {
  const plant = useSelector((state) => state.plant.data)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPlants())
  }, [])

  return (
    <Table
      rowKey="id"
      columns={columnsCrop}
      dataSource={plant}
      onChange={onChange}
      // rowSelection={{
      //   onSelect: (record) => {
      //     console.log({ record })
      //   },
      // }}
    />
  )
}
export default TableDisplayCrop
