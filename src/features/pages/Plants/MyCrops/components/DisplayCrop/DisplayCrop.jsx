import { Table } from 'antd'
import { columns, onChange } from './DisplayCropData'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getPlants } from 'features/slice/plant/plantSlice'

const DisplayCrop = () => {
  const plant = useSelector((state) => state.plant.data)
  console.log(plant)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPlants())
  }, [])

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={plant}
      onChange={onChange}
      rowSelection={{
        onSelect: (record) => {
          console.log({ record })
        },
      }}
    />
  )
}
export default DisplayCrop
