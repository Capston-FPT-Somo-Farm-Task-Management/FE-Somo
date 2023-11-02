import { Badge, Button, Table } from 'antd'
import { useState } from 'react'
import Column from 'antd/es/table/Column'
import UpdateCropType from './UpdateCropType'

const TableDisplayCropType = ({
  plantType,
  onFinishDeletePlantType,
  onFinishUpdatePlantType,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState(null)

  const handleDelete = (id) => {
    onFinishDeletePlantType(id)
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
        dataSource={plantType ? plantType.data : ''}
        rowKey="id"
        locale={{ emptyText: 'Chưa có loại cây trồng nào' }}
      >
        <Column
          title="Tên cây trồng"
          dataIndex="name"
          key="1"
          render={(text) => <h4>{text}</h4>}
        />
        <Column title="Nguồn gốc" dataIndex="origin" key="2" />
        <Column title="Môi trường sống" dataIndex="environment" key="3" />
        <Column title="Mô tả" dataIndex="description" key="4" />

        <Column
          title="Trạng thái"
          dataIndex="isActive"
          key="5"
          render={(isActive) =>
            isActive === true ? (
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
      <UpdateCropType
        key={selectedData ? selectedData.id : null}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        selectedData={selectedData}
        onFinishUpdatePlantType={onFinishUpdatePlantType}
      />
    </>
  )
}
export default TableDisplayCropType
