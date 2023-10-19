import { Button, Table } from 'antd'
import { columns, data, onChange } from './DisplayAnimalGroupData'
import { useDispatch, useSelector } from 'react-redux'
import { getFieldAnimal } from 'features/slice/field/fieldAnimalSlice'
import { useEffect, useState } from 'react'
import Column from 'antd/es/table/Column'
import { deleteField } from 'features/slice/field/fieldSlice'
import UpdateAnimalGroup from './UpdateAnimalGroup'

const DisplayAnimalGroup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const fieldAnimal = useSelector((state) => state.fieldAnimal.data)
  const field = fieldAnimal.data

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFieldAnimal())
  }, [])

  const handleDelete = (id) => {
    console.log(id)
    dispatch(deleteField(id))
  }

  const openModal = (record) => {
    setSelectedData(record)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const loadData = () => {
    dispatch(getFieldAnimal())
  }

  return (
    <>
      <Table dataSource={field} rowKey="id" on>
        <Column
          title="Tên chuồng"
          dataIndex="name"
          key="1"
          render={(text) => <h4>{text}</h4>}
        />
        <Column title="Vùng" dataIndex="zoneName" key="2" />
        <Column title="Diện tích" dataIndex="area" key="3" />

        <Column
          title="Tuỳ chọn"
          key="4"
          dataIndex="id"
          render={(_, record) => (
            <Button
              size="middle"
              danger
              onClick={() => handleDelete(record.id)}
            >
              Xoá
            </Button>
          )}
        />

        <Column
          title="Cập nhật"
          key="5"
          dataIndex="id"
          render={(_, record) => (
            <Button
              type="primary"
              size="middle"
              onClick={() => openModal(record)}
            >
              Cập nhật
            </Button>
          )}
        />
      </Table>
      <UpdateAnimalGroup
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        selectedData={selectedData}
        loadData={loadData}
      />
    </>
  )
}
export default DisplayAnimalGroup
