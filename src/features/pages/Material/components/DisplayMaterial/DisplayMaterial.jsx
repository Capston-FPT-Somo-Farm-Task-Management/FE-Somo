import { Badge, Button, Table } from 'antd'
import Column from 'antd/es/table/Column'
import { useState } from 'react'
import UpdateMaterial from './UpdateMaterial'

const DisplayMaterial = ({ material, onFinishDelete, onFinishUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState(null)

  const openModal = (record) => {
    setSelectedData(record)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedData(null)
    setIsModalOpen(false)
  }

  return (
    <>
      <Table
        rowKey="id"
        dataSource={material ? material.data : null}
        pagination={true}
      >
        <Column title="Tên công cụ" dataIndex="name" key="1" />
        <Column
          title="Trạng thái"
          dataIndex="status"
          key="2"
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
          key="3"
          dataIndex="id"
          render={(_, record) => (
            <Button
              size="middle"
              danger
              onClick={() => onFinishDelete(record.id)}
            >
              Đổi
            </Button>
          )}
        />

        <Column
          title="Cập nhật"
          key="4"
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
      <UpdateMaterial
        key={selectedData ? selectedData.id : null}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        selectedData={selectedData}
        onFinishUpdate={onFinishUpdate}
      />
    </>
  )
}
export default DisplayMaterial
