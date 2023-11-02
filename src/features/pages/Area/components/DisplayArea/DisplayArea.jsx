import { Badge, Button, Table } from 'antd'
import Column from 'antd/es/table/Column'
import UpdateArea from './UpdateArea'
import { useState } from 'react'

const DisplayArea = ({ areaByFarm, onFinishDelete, onFinishUpdate }) => {
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
      <Table
        rowKey="id"
        dataSource={areaByFarm ? areaByFarm.data : null}
        locale={{ emptyText: 'Chưa có khu vực' }}
      >
        <Column title="Tên khu vực" dataIndex="name" key="1" />
        <Column title="Mã khu vực" dataIndex="code" key="2" />
        <Column title="Diện tích" dataIndex="fArea" key="3" />
        <Column title="Tên trang trại" dataIndex="farmName" key="4" />
        <Column
          title="Trạng thái"
          dataIndex="status"
          key="5"
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
      <UpdateArea
        key={selectedData ? selectedData.id : null}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        selectedData={selectedData}
        onFinishUpdate={onFinishUpdate}
      />
    </>
  )
}
export default DisplayArea
