import { Button, Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { deletePlant, getPlantActive } from 'features/slice/plant/plantSlice'
import Column from 'antd/es/table/Column'
import UpdateCrop from './UpdateCrop'

const TableDisplayCrop = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const plant = useSelector((state) => state.plant.data)
  const dataPlantActive = plant.data

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPlantActive())
  }, [dispatch])

  const handleDelete = (id) => {
    dispatch(deletePlant(id))
  }

  const openModal = (record) => {
    setSelectedData(record)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const loadData = () => {
    dispatch(getPlantActive())
  }

  return (
    <>
      <Table dataSource={dataPlantActive} rowKey="id">
        <Column
          title="Tên cây trồng"
          dataIndex="name"
          key="1"
          render={(text) => <h4>{text}</h4>}
        />
        <Column title="Mã cây trồng" dataIndex="externalId" key="2" />
        <Column title="Khu vực" dataIndex="areaName" key="3" />
        <Column title="Vùng" dataIndex="zoneName" key="4" />
        <Column title="Vườn" dataIndex="fieldName" key="5" />

        <Column
          title="Tuỳ chọn"
          key="6"
          dataIndex="id"
          render={(_, record) => (
            <Button
              size="middle"
              danger
              onClick={() => handleDelete(record.id)}
            >
              Xoá
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
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        selectedData={selectedData}
        loadData={loadData}
      />
    </>
  )
}
export default TableDisplayCrop
