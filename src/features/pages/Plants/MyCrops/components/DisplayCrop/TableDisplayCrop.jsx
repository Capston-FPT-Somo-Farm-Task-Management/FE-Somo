import { Badge, Button, Table } from 'antd'
import { useState } from 'react'
import Column from 'antd/es/table/Column'
import UpdateCrop from './UpdateCrop'

const TableDisplayCrop = ({
  areaByFarm,
  plantByFarm,
  onFinishDeletePlant,
  onFinishUpdatePlant,
  farmId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState(null)

  const handleDelete = (id) => {
    onFinishDeletePlant(id)
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
      <Table
        dataSource={plantByFarm ? plantByFarm.data : null}
        rowKey="id"
        locale={{ emptyText: 'Chưa có cây trồng nào' }}
      >
        <Column
          title="Tên cây trồng"
          dataIndex="name"
          key="1"
          render={(text) => <h4>{text}</h4>}
        />
        <Column title="Mã cây trồng" dataIndex="externalId" key="2" />
        <Column title="Vườn" dataIndex="fieldName" key="3" />
        <Column title="Vùng" dataIndex="zoneName" key="4" />
        <Column title="Khu vực" dataIndex="areaName" key="5" />

        <Column
          title="Trạng thái"
          dataIndex="status"
          key="6"
          render={(status) =>
            status === 'Tồn tại' ? (
              <Badge status="success" text="Tồn tại" />
            ) : (
              <Badge status="error" text="Không tồn tại" />
            )
          }
        />

        <Column
          title="Tuỳ chọn"
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
      <UpdateCrop
        key={selectedData ? selectedData.id : null}
        farmId={farmId}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        selectedData={selectedData}
        areaByFarm={areaByFarm}
        onFinishUpdatePlant={onFinishUpdatePlant}
      />
    </>
  )
}
export default TableDisplayCrop
