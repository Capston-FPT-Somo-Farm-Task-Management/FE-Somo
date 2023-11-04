import { Badge, Button, Table } from 'antd'
import Column from 'antd/es/table/Column'
import { useState } from 'react'
import UpdateEmployee from './UpdateEmployee'

const DisplayEmployee = ({
  employeeByFarm,
  onFinishDelete,
  onFinishUpdate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState(null)

  const openModal = (record) => {
    setSelectedData(record)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Table rowKey="id" dataSource={employeeByFarm ? employeeByFarm : null}>
        <Column title="Tên nhân viên" dataIndex="name" key="1" />
        <Column title="Mã nhân viên" dataIndex="code" key="2" />
        <Column title="Loại nhiệm vụ" dataIndex="taskTypeName" key="3" />
        <Column
          title="Trạng thái"
          dataIndex="status"
          key="3"
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
          key="6"
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
          key="7"
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
      <UpdateEmployee
        key={selectedData ? selectedData.id : null}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        selectedData={selectedData}
        onFinishUpdate={onFinishUpdate}
      />
    </>
  )
}
export default DisplayEmployee
