import { Badge, Button, Image, Table } from 'antd'
import Column from 'antd/es/table/Column'
import { useEffect, useState } from 'react'
import UpdateMaterial from './UpdateMaterial'
import { getMaterialById } from 'features/slice/material/materialById'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const DisplayMaterial = ({
  material,
  onFinishDelete,
  onFinishUpdate,
  farmId,
  loadData,
}) => {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const materialById = useSelector((state) => state.materialById.data)

  useEffect(() => {
    if (selectedData) {
      dispatch(getMaterialById(selectedData.id)).then(() => {
        loadData()
      })
    }
  }, [selectedData, dispatch])

  const openModal = (record) => {
    dispatch(getMaterialById(record.id)).then(() => {
      loadData()
    })
    console.log(record)
    setSelectedData(record)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedData(null)
    setIsModalOpen(false)
  }

  return (
    <>
      <Table
        rowKey="id"
        dataSource={material ? material.data : null}
        locale={{ emptyText: 'Chưa có công cụ nào' }}
      >
        <Column title="Tên công cụ" dataIndex="name" key="1" />
        <Column
          title="Hình ảnh"
          dataIndex="urlImage"
          key="2"
          render={(text, record) => <Image width={50} src={record.urlImage} />}
        />
        <Column
          title="Trạng thái"
          dataIndex="status"
          key="3"
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
          key="4"
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
      <UpdateMaterial
        key={selectedData ? selectedData.id : null}
        materialById={materialById}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        selectedData={selectedData}
        onFinishUpdate={onFinishUpdate}
        farmId={farmId}
      />
    </>
  )
}
export default DisplayMaterial
