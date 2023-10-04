import { Table } from 'antd'
import { columns, data, onChange } from './DisplayAnimalGroupData'
import { useDispatch, useSelector } from 'react-redux'
import { getFieldAnimal } from 'features/slice/field/fieldAnimalSlice'
import { useEffect } from 'react'

const DisplayAnimalGroup = () => {
  const fieldAnimal = useSelector((state) => state.fieldAnimal.data)
  const field = fieldAnimal.data

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFieldAnimal())
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
export default DisplayAnimalGroup
