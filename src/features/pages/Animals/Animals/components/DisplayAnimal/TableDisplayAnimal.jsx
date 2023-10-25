import { useState } from 'react'
import { Badge, Button, Table } from 'antd'
import Column from 'antd/es/table/Column'
import UpdateAnimal from './UpdateAnimal'

const TableDisplayAnimal = ({
  animalByFarm,
  onFinishDeleteAnimal,
  onFinishUpdateAnimal,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState(null)

  const handleDelete = (id) => {
    onFinishDeleteAnimal(id)
  }

  const openModal = (record) => {
    setSelectedData(record)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Table dataSource={animalByFarm ? animalByFarm.data : null} rowKey="id">
        <Column
          title="Tên vật nuôi"
          dataIndex="name"
          key="1"
          render={(text) => <h4>{text}</h4>}
        />
        <Column title="Mã vật nuôi" dataIndex="externalId" key="2" />
        <Column title="Chuồng" dataIndex="fieldName" key="3" />
        <Column title="Vùng" dataIndex="zoneName" key="4" />
        <Column title="Khu vực" dataIndex="areaName" key="5" />

        <Column
          title="Trạng thái"
          dataIndex="status"
          key="6"
          render={(status) =>
            status === 'Active' ? (
              <Badge status="success" text="Active" />
            ) : (
              <Badge status="error" text="Inactive" />
            )
          }
        />

        <Column
          title="Đổi trạng thái"
          key="7"
          dataIndex="id"
          render={(_, record) => (
            <Button
              size="middle"
              danger
              onClick={() => handleDelete(record.id)}
            >
              Đổi
            </Button>
          )}
        />

        <Column
          title="Cập nhật"
          key="8"
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
      <UpdateAnimal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        selectedData={selectedData}
        onFinishUpdateAnimal={onFinishUpdateAnimal}
      />
    </>
  )
}
export default TableDisplayAnimal
