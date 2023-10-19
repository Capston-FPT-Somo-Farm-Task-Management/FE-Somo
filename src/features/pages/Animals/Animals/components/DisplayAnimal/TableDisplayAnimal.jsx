import {
  deleteAnimal,
  getAnimalActive,
} from 'features/slice/animal/animalSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Button, Table } from 'antd'
import Column from 'antd/es/table/Column'
import UpdateAnimal from './UpdateAnimal'
const TableDisplayAnimal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const animal = useSelector((state) => state.animal.data)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAnimalActive())
  }, [dispatch])

  const handleDelete = (id) => {
    dispatch(deleteAnimal(id)).then(() => {
      loadData()
    })
  }

  const openModal = (record) => {
    setSelectedData(record)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const loadData = () => {
    dispatch(getAnimalActive())
  }

  return (
    <>
      <Table dataSource={animal ? animal.data : ''} rowKey="id">
        <Column
          title="Tên vật nuôi"
          dataIndex="name"
          key="1"
          render={(text) => <h4>{text}</h4>}
        />
        <Column title="Mã vật nuôi" dataIndex="externalId" key="2" />
        <Column title="Khu vực" dataIndex="areaName" key="3" />
        <Column title="Vùng" dataIndex="zoneName" key="4" />
        <Column title="Chuồng" dataIndex="fieldName" key="5" />

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
      <UpdateAnimal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        selectedData={selectedData}
        loadData={loadData}
      />
    </>
  )
}
export default TableDisplayAnimal
