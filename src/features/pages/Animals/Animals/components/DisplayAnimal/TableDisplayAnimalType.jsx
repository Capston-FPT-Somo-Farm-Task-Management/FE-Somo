import { getAnimalType } from 'features/slice/animal/animalTypeSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Table } from 'antd'
import Column from 'antd/es/table/Column'
import { deleteHabitantType } from 'features/slice/habitant/habitantTypeSlice'

const TableDisplayAnimalType = () => {
  const animalType = useSelector((state) => state.animalType.data)
  const dataAnimalType = animalType.data

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAnimalType())
  }, [])

  const handleDelete = (id) => {
    dispatch(deleteHabitantType(id))
  }

  return (
    <Table dataSource={dataAnimalType} rowKey="id">
      <Column
        title="Tên vật nuôi"
        dataIndex="name"
        key="1"
        render={(text) => <h4>{text}</h4>}
      />
      <Column title="Nguồn gốc" dataIndex="origin" key="2" />
      <Column title="Môi trường sống" dataIndex="environment" key="3" />
      <Column title="Mô tả" dataIndex="description" key="4" />
      <Column
        title="Tuỳ chọn"
        key="5"
        dataIndex="id"
        render={(_, record) => (
          <Button size="middle" danger onClick={() => handleDelete(record.id)}>
            Xoá
          </Button>
        )}
      />

      <Column
        title="Cập nhật"
        key="6"
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
export default TableDisplayAnimalType
