import {
  deleteAnimal,
  getAnimalActive,
  getAnimals,
} from 'features/slice/animal/animalSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Button, Table } from 'antd'
import Column from 'antd/es/table/Column'
const TableDisplayAnimal = () => {
  const animal = useSelector((state) => state.animal.data)
  const dataAnimalActive = animal.data
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAnimalActive())
  }, [])

  const handleDelete = (id) => {
    console.log(id)
    dispatch(deleteAnimal(id))
  }

  return (
    <Table dataSource={dataAnimalActive} rowKey="id">
      <Column
        title="Tên cây trồng"
        dataIndex="name"
        key="1"
        render={(text) => <h4>{text}</h4>}
      />
      <Column title="Mã cây trồng" dataIndex="externalId" key="2" />
      <Column title="Khu vực" dataIndex="areaName" key="3" />
      <Column title="Vùng" dataIndex="zoneName" key="4" />
      <Column title="Vườn" dataIndex="fieldName" key="5" />

      <Column
        title="Tuỳ chọn"
        key="6"
        dataIndex="id"
        render={(_, record) => (
          <Button size="middle" danger onClick={() => handleDelete(record.id)}>
            Xoá
          </Button>
        )}
      />

      <Column
        title="Cập nhật"
        key="7"
        dataIndex="id"
        render={(_, record) => (
          <Button
            type="primary"
            size="middle"
            onClick={() => console.log('ss')}
          >
            Cập nhật
          </Button>
        )}
      />
    </Table>
  )
}
export default TableDisplayAnimal
