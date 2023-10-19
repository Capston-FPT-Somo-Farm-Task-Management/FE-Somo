import { Button, Table } from 'antd'
import { getPlantType } from 'features/slice/plantType/plantTypeSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Column from 'antd/es/table/Column'
import { deleteHabitantType } from 'features/slice/habitant/habitantTypeSlice'
import UpdateCropType from './UpdateCropType'

const TableDisplayCropType = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const plantType = useSelector((state) => state.plantType.data)
  const dataPlantType = plantType.data

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPlantType())
  }, [dispatch])

  const handleDelete = (id) => {
    dispatch(deleteHabitantType(id))
  }

  const openModal = (record) => {
    setSelectedData(record)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const loadData = () => {
    dispatch(getPlantType())
  }

  return (
    <>
      <Table dataSource={dataPlantType} rowKey="id">
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
          title="Tuỳ chọn"
          key="5"
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
      <UpdateCropType
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        selectedData={selectedData}
        loadData={loadData}
      />
    </>
  )
}
export default TableDisplayCropType
