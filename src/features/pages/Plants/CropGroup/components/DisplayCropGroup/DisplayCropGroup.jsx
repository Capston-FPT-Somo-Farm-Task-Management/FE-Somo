import { Button, Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getFieldPlant } from 'features/slice/field/fieldPlantSlice'
import { useEffect, useState } from 'react'
import Column from 'antd/es/table/Column'
import { deleteField } from 'features/slice/field/fieldSlice'
import UpdateCropGroup from './UpdateCropGroup'

const DisplayCropGroup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const fieldPlant = useSelector((state) => state.fieldPlant.data)
  const field = fieldPlant.data

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFieldPlant())
  }, [dispatch])

  const handleDelete = (id) => {
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
    dispatch(getFieldPlant())
  }

  return (
    <>
      <Table dataSource={field} rowKey="id" on>
        <Column
          title="Tên vườn"
          dataIndex="name"
          key="1"
          render={(text) => <h4>{text}</h4>}
        />
        <Column title="Mã vườn" dataIndex="code" key="2" />
        <Column title="Vùng" dataIndex="zoneName" key="3" />
        <Column title="Diện tích" dataIndex="area" key="4" />

        <Column
          title="Tuỳ chọn"
          key="5"
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
          key="6"
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
      <UpdateCropGroup
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        selectedData={selectedData}
        loadData={loadData}
      />
    </>
  )
}

export default DisplayCropGroup
