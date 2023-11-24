import { Button, List } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getTaskDoneByEmployeeId } from 'features/slice/task/taskDoneSlice'
import { useSelector } from 'react-redux'
import TaskDetail from './TaskDetail'
import { getTaskById } from 'features/slice/task/taskByIdSlice'

const ListTaskDone = ({ toggleTaskList, selectedDataDetail }) => {
  const taskDone = useSelector((state) => state.taskDone.data)
  const taskById = useSelector((state) => state.taskById.data)

  const dispatch = useDispatch()

  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState()

  useEffect(() => {
    dispatch(
      getTaskDoneByEmployeeId({
        startDay: '',
        endDay: '',
        pageIndex: 1,
        employeeId: selectedDataDetail.id,
      })
    )
  }, [dispatch, selectedDataDetail, selectedTask])

  const openModalDetail = async (record) => {
    console.log(record.id)
    const actionResult = await dispatch(getTaskById(record.id))
    const taskData = actionResult.payload
    console.log(taskData?.data?.id)
    setSelectedTask(taskData)
    setIsModalDetailOpen(true)
  }

  const closeModalDetail = () => {
    setSelectedTask(null)
    setIsModalDetailOpen(false)
  }

  return (
    <div>
      <Button type="default" onClick={toggleTaskList}>
        <ArrowLeftOutlined />
      </Button>

      <List
        itemLayout="horizontal"
        dataSource={taskDone}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              title={<a onClick={() => openModalDetail(item)}>{item?.name}</a>}
              description={item?.statusTaskType}
            />
          </List.Item>
        )}
      />

      <TaskDetail
        selectedTask={selectedTask}
        isModalDetailOpen={isModalDetailOpen}
        closeModalDetail={closeModalDetail}
      />
    </div>
  )
}
export default ListTaskDone
