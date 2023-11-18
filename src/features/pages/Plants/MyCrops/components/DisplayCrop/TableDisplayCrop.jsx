import { Badge, Button, Table } from 'antd'
import { useState } from 'react'
import Column from 'antd/es/table/Column'
import UpdateCrop from './UpdateCrop'
import DetailCrop from './DetailCrop'

const TableDisplayCrop = ({
  areaByFarm,
  plantByFarm,
  onFinishDeletePlant,
  onFinishUpdatePlant,
  farmId,
  searchTerm,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState(null)

  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false)
  const [selectedDataDetail, setSelectedDataDetail] = useState(null)

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

  // Detail
  const openModalDetail = (record) => {
    setSelectedDataDetail(record)
    setIsModalDetailOpen(true)
  }
  const closeModalDetail = () => {
    setSelectedDataDetail(null)
    setIsModalDetailOpen(false)
  }

  const searchPlant = plantByFarm
    ? plantByFarm?.data?.filter((m) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  return (
    <>
      <Table dataSource={searchPlant} rowKey="id">
        <Column
          title="Tên cây trồng"
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
        <Column title="Mã cây trồng" dataIndex="externalId" key="2" />
        {/* <Column title="Vườn" dataIndex="fieldName" key="3" />
        <Column title="Vùng" dataIndex="zoneName" key="4" />
        <Column title="Khu vực" dataIndex="areaName" key="5" /> */}
        <Column
          title="Trạng thái"
          dataIndex="status"
          key="6"
          filters={[
            { text: 'Tồn tại', value: 'Tồn tại' },
            { text: 'Không tồn tại', value: 'Không tồn tại' },
          ]}
          onFilter={(value, record) => record.status.indexOf(value) === 0}
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

      <DetailCrop
        key={selectedDataDetail ? selectedDataDetail.id : null}
        isModalDetailOpen={isModalDetailOpen}
        closeModalDetail={closeModalDetail}
        selectedDataDetail={selectedDataDetail}
      />

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
