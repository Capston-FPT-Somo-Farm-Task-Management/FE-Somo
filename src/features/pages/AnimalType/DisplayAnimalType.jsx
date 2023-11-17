import { useEffect, useState } from 'react'
import { Badge, Button, Table } from 'antd'
import Column from 'antd/es/table/Column'
import UpdateAnimalType from './UpdateAnimalType'
import DetailAnimalType from './DetailAnimalType'

const DisplayAnimalType = ({
  farmId,
  animalType,
  onFinishDeleteAnimalType,
  onFinishUpdateAnimalType,
  loadDataAnimalType,
}) => {
  useEffect(() => {
    loadDataAnimalType()
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState(null)

  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false)
  const [selectedDataDetail, setSelectedDataDetail] = useState(null)

  const handleDelete = (id) => {
    onFinishDeleteAnimalType(id)
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

  return (
    <>
      <Table
        dataSource={animalType ? animalType.data : ''}
        rowKey="id"
        locale={{ emptyText: 'Chưa có loại vật nuôi nào' }}
      >
        <Column
          title="Tên loại vật nuôi"
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
        {/* <Column title="Nguồn gốc" dataIndex="origin" key="2" />
        <Column title="Môi trường sống" dataIndex="environment" key="3" />
        <Column title="Mô tả" dataIndex="description" key="4" /> */}
        <Column
          title="Trạng thái"
          dataIndex="isActive"
          key="5"
          render={(isActive) =>
            isActive === true ? (
              <Badge status="success" text="Tồn tại" />
            ) : (
              <Badge status="error" text="Không tồn tại" />
            )
          }
        />
        <Column
          title="Đổi trạng thái"
          key="5"
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
          key="6"
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

      <DetailAnimalType
        key={selectedDataDetail ? selectedDataDetail.id : null}
        isModalDetailOpen={isModalDetailOpen}
        closeModalDetail={closeModalDetail}
        selectedDataDetail={selectedDataDetail}
      />

      <UpdateAnimalType
        key={selectedData ? selectedData.id : null}
        farmId={farmId}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        selectedData={selectedData}
        onFinishUpdateAnimalType={onFinishUpdateAnimalType}
      />
    </>
  )
}
export default DisplayAnimalType
