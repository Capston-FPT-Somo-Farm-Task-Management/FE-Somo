import { Badge, Button, Table } from 'antd'
import { useState } from 'react'
import Column from 'antd/es/table/Column'
import UpdateCropGroup from './UpdateCropGroup'

const DisplayCropGroup = ({ fieldByFarm, onFinishDelete, onFinishUpdate }) => {
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
      <Table dataSource={fieldByFarm ? fieldByFarm.data : null} rowKey="id" on>
        <Column
          title="Tên vườn"
          dataIndex="name"
          key="1"
          render={(text) => <h4>{text}</h4>}
        />
        <Column title="Mã vườn" dataIndex="code" key="2" />
        <Column title="Diện tích" dataIndex="area" key="3" />
        <Column title="Vùng" dataIndex="zoneName" key="4" />
        <Column title="Khu vực" dataIndex="areaName" key="5" />

        <Column
          title="Trạng thái"
          dataIndex="isDelete"
          key="5"
          render={(isDelete) =>
            isDelete === false ? (
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
      <UpdateCropGroup
        key={selectedData ? selectedData.id : null}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        selectedData={selectedData}
        onFinishUpdate={onFinishUpdate}
      />
    </>
  )
}

export default DisplayCropGroup
