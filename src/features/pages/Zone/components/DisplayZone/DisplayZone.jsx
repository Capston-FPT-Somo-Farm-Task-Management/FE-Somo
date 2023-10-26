import { Badge, Button, Table } from 'antd'
import Column from 'antd/es/table/Column'
import { useState } from 'react'
import UpdateZone from './UpdateZone'

const DisplayZone = ({
  zoneByFarm,
  onFinishDelete,
  onFinishUpdate,
  farmId,
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
      <Table rowKey="id" dataSource={zoneByFarm ? zoneByFarm.data : null}>
        <Column title="Tên vùng" dataIndex="name" key="1" />
        <Column title="Mã vùng" dataIndex="code" key="2" />
        <Column title="Diện tích" dataIndex="farmArea" key="3" />
        <Column title="Loại vùng" dataIndex="zoneTypeName" key="4" />
        <Column title="Tên khu vực" dataIndex="areaName" key="5" />
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
              onClick={() => onFinishDelete(record.id)}
            >
              Đổi
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
      <UpdateZone
        key={selectedData ? selectedData.id : null}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        selectedData={selectedData}
        onFinishUpdate={onFinishUpdate}
        farmId={farmId}
      />
    </>
  )
}
export default DisplayZone
