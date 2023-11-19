import { Badge, Button, Table } from 'antd'
import { useState } from 'react'
import Column from 'antd/es/table/Column'
import UpdateCropGroup from './UpdateCropGroup'
import DetailCropGroup from './DetailCropGroup'

const DisplayCropGroup = ({
  areaByFarm,
  fieldPlant,
  onFinishDelete,
  onFinishUpdate,
  searchTerm,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState(null)

  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false)
  const [selectedDataDetail, setSelectedDataDetail] = useState(null)

  const openModal = (record) => {
    setSelectedData(record)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedData(null)
  }

  // Detail
  const openModalDetail = (record) => {
    setSelectedDataDetail(record)
    setIsModalDetailOpen(true)
  }
  const closeModalDetail = () => {
    setSelectedDataDetail(null)
    setIsModalDetailOpen(false)
  }

  const searchPlantGroup = fieldPlant
    ? fieldPlant?.data?.filter((m) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  return (
    <>
      <Table dataSource={searchPlantGroup} rowKey="id">
        <Column
          title="Tên vườn"
          dataIndex="name"
          key="1"
          render={(text, record) => (
            <h4
              onClick={() => openModalDetail(record)}
              style={{ cursor: 'pointer' }}
            >
              {text}
            </h4>
          )}
        />{' '}
        <Column title="Mã vườn" dataIndex="code" key="2" />
        {/* <Column title="Diện tích" dataIndex="area" key="3" />
        <Column title="Vùng" dataIndex="zoneName" key="4" />
        <Column title="Khu vực" dataIndex="areaName" key="5" /> */}
        <Column
          title="Trạng thái"
          dataIndex="isDelete"
          key="5"
          filters={[
            { text: 'Hiện', value: false },
            { text: 'Ẩn', value: true },
          ]}
          onFilter={(value, record) => record.isDelete === value}
          render={(isDelete) =>
            isDelete === false ? (
              <Badge status="success" text="Hiện" />
            ) : (
              <Badge status="error" text="Ẩn" />
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

      <DetailCropGroup
        key={selectedDataDetail ? selectedDataDetail.id : null}
        isModalDetailOpen={isModalDetailOpen}
        closeModalDetail={closeModalDetail}
        selectedDataDetail={selectedDataDetail}
      />

      <UpdateCropGroup
        key={selectedData ? selectedData.id : null}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        selectedData={selectedData}
        areaByFarm={areaByFarm}
        onFinishUpdate={onFinishUpdate}
      />
    </>
  )
}

export default DisplayCropGroup
