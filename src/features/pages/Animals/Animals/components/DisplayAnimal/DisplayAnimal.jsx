import { Table } from 'antd'
import { columns, onChange } from './DisplayAnimalData'
import { getAnimals } from 'features/slice/animal/animalSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const DisplayAnimal = () => {
  const animal = useSelector((state) => state.animal.data)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAnimals())
  }, [])

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={animal}
      onChange={onChange}
      rowSelection={{
        onSelect: (record) => {
          console.log({ record })
        },
      }}
    />
  )
}
export default DisplayAnimal
