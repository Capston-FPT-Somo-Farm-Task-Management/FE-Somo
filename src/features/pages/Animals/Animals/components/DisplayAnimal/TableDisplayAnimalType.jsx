import { getAnimalType } from 'features/slice/animal/animalTypeSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { columnsAnimalType } from './DisplayAnimalData'
import { Table } from 'antd'

const TableDisplayAnimalType = () => {
  const animalType = useSelector((state) => state.animalType.data)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAnimalType())
  }, [])

  return (
    <Table
      rowKey="id"
      columns={columnsAnimalType}
      dataSource={animalType.data}
    />
  )
}
export default TableDisplayAnimalType
