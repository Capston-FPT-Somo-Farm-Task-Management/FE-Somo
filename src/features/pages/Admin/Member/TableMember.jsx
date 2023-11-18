import { Avatar, Badge, Button, Modal, Table } from 'antd'
import Column from 'antd/es/table/Column'
import { useState } from 'react'
import DetailMember from './DetailMember'

const TableMember = ({ memberByFarm, onFinishDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)

  const showModal = (memberByFarm) => {
    setSelectedMember(memberByFarm)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <Table dataSource={memberByFarm ? memberByFarm.data : null} rowKey="id">
        <Column
          title="Tên nhân viên"
          dataIndex="name"
          key="1"
          render={(text, record) => (
            <h4 onClick={() => showModal(record)} style={{ cursor: 'pointer' }}>
              {text}
            </h4>
          )}
        />
        <Column title="Chức vụ" dataIndex="roleName" key="2" />
        <Column title="Số điện thoại" dataIndex="phoneNumber" key="3" />

        <Column
          title="Trạng thái"
          dataIndex="status"
          key="4"
          render={(status) =>
            status === 'Active' ? (
              <Badge status="success" text="Active" />
            ) : (
              <Badge status="error" text="Inactive" />
            )
          }
        />

        <Column
          title="Xoá"
          key="5"
          dataIndex="id"
          render={(_, record) => (
            <Button
              size="middle"
              danger
              onClick={() => onFinishDelete(record.id)}
            >
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
              // onClick={() => openModal(record)}
            >
              Cập nhật
            </Button>
          )}
        />
      </Table>
      <DetailMember
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        selectedMember={selectedMember}
      />
    </>
  )
}
export default TableMember
