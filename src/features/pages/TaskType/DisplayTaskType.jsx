import { useEffect, useState } from 'react'
import UpdateTaskType from './UpdateTaskType'
import { Badge, Button, Table } from 'antd'
import Column from 'antd/es/table/Column'
import { useSelector } from 'react-redux'
import { getTaskTypeById } from 'features/slice/task/taskTypeByIdSlice'
import { useDispatch } from 'react-redux'

const DisplayTaskType = ({
  taskType,
  onFinishUpdateTaskType,
  loadData,
  onFinishDeleteTaskType,
}) => {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const taskTypeById = useSelector((state) => state.taskTypeById.data)

  useEffect(() => {
    async function fetchData() {
      if (selectedData) {
        await dispatch(getTaskTypeById(selectedData.id))
        loadData()
      }
    }

    fetchData()
  }, [selectedData, dispatch, loadData])

  const openModal = async (record) => {
    await dispatch(getTaskTypeById(record.id))
    loadData()
    setSelectedData(record)
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setSelectedData(null)
    setIsModalOpen(false)
  }

  return (
    <>
      <>
        <Table
          dataSource={taskType ? taskType?.data : null}
          rowKey="id"
          locale={{ emptyText: 'Chưa có loại công việc nào' }}
        >
          <Column
            title="Tên công việc"
            dataIndex="name"
            key="1"
            render={(text) => <h4>{text}</h4>}
          />
          <Column title="Loại công việc" dataIndex="status" key="2" />
          <Column
            title="Trạng thái"
            dataIndex="isDelete"
            key="3"
            render={(isDelete) =>
              isDelete === false ? (
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
                onClick={() => onFinishDeleteTaskType(record.id)}
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
        <UpdateTaskType
          key={selectedData ? selectedData.id : null}
          taskTypeById={taskTypeById}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          selectedData={selectedData}
          onFinishUpdateTaskType={onFinishUpdateTaskType}
        />
      </>
    </>
  )
}
export default DisplayTaskType
