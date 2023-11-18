import { useState } from 'react'
import { Badge, Button, Table } from 'antd'
import Column from 'antd/es/table/Column'
import UpdateAnimal from './UpdateAnimal'
import DetailAnimal from './DetailAnimal'

const TableDisplayAnimal = ({
  farmId,
  areaByFarm,
  animalByFarm,
  animalTypeActive,
  onFinishDeleteAnimal,
  onFinishUpdateAnimal,
  searchTerm,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState(null)

  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false)
  const [selectedDataDetail, setSelectedDataDetail] = useState(null)

  const handleDelete = (id) => {
    onFinishDeleteAnimal(id)
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

  const searchAnimal = animalByFarm
    ? animalByFarm?.data?.filter((m) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  return (
    <>
      <Table
        dataSource={searchAnimal}
        rowKey="id"
        locale={{ emptyText: 'Chưa có vật nuôi nào' }}
      >
        <Column
          title="Tên vật nuôi"
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
        <Column title="Mã vật nuôi" dataIndex="externalId" key="2" />
        {/* <Column title="Chuồng" dataIndex="fieldName" key="3" />
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
          title="Đổi trạng thái"
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

      <DetailAnimal
        key={selectedDataDetail ? selectedDataDetail.id : null}
        isModalDetailOpen={isModalDetailOpen}
        closeModalDetail={closeModalDetail}
        selectedDataDetail={selectedDataDetail}
      />

      <UpdateAnimal
        key={selectedData ? selectedData.id : null}
        farmId={farmId}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        animalTypeActive={animalTypeActive}
        selectedData={selectedData}
        areaByFarm={areaByFarm}
        onFinishUpdateAnimal={onFinishUpdateAnimal}
      />
    </>
  )
}
export default TableDisplayAnimal
