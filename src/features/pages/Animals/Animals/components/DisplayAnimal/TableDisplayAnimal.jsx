import { getAnimals } from 'features/slice/animal/animalSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { columns, onChange } from './DisplayAnimalData'
import { Table } from 'antd'
const TableDisplayAnimal = () => {
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
    />
  )
}
export default TableDisplayAnimal
