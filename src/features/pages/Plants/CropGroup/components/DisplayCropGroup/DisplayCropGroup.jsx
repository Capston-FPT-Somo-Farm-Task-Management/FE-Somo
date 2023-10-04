import { Table } from 'antd'
import { columns, onChange } from './DisplayCropGroupData'
import { useDispatch, useSelector } from 'react-redux'
import { getFieldPlant } from 'features/slice/field/fieldPlantSlice'
import { useEffect } from 'react'

const DisplayCropGroup = () => {
  const fieldPlant = useSelector((state) => state.fieldPlant.data)
  const field = fieldPlant.data
  console.log(fieldPlant)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFieldPlant())
  }, [])

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={field}
      onChange={onChange}
      rowSelection={{
        onSelect: (record) => {
          console.log({ record })
        },
      }}
    />
  )
}
export default DisplayCropGroup
