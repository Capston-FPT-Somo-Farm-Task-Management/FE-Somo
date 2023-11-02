import { Badge, Button, Table } from 'antd'
import Column from 'antd/es/table/Column'
import { useState } from 'react'
import UpdateZone from './UpdateZone'

const TableDisplayZone = ({
  areaByFarm,
  zoneByFarm,
  zoneType,
  onFinishUpdateZone,
  onFinishDeleteZone,
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
      <Table
        rowKey="id"
        dataSource={zoneByFarm ? zoneByFarm.data : null}
        locale={{ emptyText: 'Chưa có vùng nào' }}
      >
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
              onClick={() => onFinishDeleteZone(record.id)}
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
      <UpdateZone
        key={selectedData ? selectedData.id : null}
        areaByFarm={areaByFarm}
        zoneType={zoneType}
        onFinishUpdateZone={onFinishUpdateZone}
        selectedData={selectedData}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
    </>
  )
}
export default TableDisplayZone
