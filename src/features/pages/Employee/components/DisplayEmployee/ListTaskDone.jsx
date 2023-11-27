import { Button, List } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getTaskDoneByEmployeeId } from 'features/slice/task/taskDoneSlice'
import { useSelector } from 'react-redux'
import TaskDetail from './TaskDetail'
import { getTaskById } from 'features/slice/task/taskByIdSlice'
import InfiniteScroll from 'react-infinite-scroll-component'

const ListTaskDone = ({ toggleTaskList, selectedDataDetail }) => {
  const [hasMore, setHasMore] = useState(true)
  const [pageNumber, setPageNumber] = useState(1)
  const dispatch = useDispatch()
  const taskDone = useSelector((state) => state.taskDone.data)
  const taskById = useSelector((state) => state.taskById.data)

  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState()

  const openModalDetail = async (record) => {
    const actionResult = await dispatch(getTaskById(record.id))
    const taskData = actionResult.payload
    setSelectedTask(taskData)
    setIsModalDetailOpen(true)
  }

  const closeModalDetail = () => {
    setSelectedTask(null)
    setIsModalDetailOpen(false)
  }

  const toggleTaskListBack = () => {
    toggleTaskList()
  }

  useEffect(() => {
    const loadListTaskDone = async () => {
      try {
        const response = await dispatch(
          getTaskDoneByEmployeeId({
            startDay: '',
            endDay: '',
            pageIndex: pageNumber,
            employeeId: selectedDataDetail.id,
          })
        ).unwrap()
        if (response && response.length === 0) {
          setHasMore(false)
        }
      } catch (error) {
        console.error('Failed to load listTaskDone:', error)
      }
    }
    loadListTaskDone()
  }, [dispatch])

  const fetchMoreData = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1)
  }

  return (
    <div>
      <Button type="default" onClick={toggleTaskListBack}>
        <ArrowLeftOutlined />
      </Button>
      <InfiniteScroll
        dataLength={taskDone.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4 style={{ textAlign: 'center' }}>...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            Bạn đã xem hết tất cả thông báo.
          </p>
        }
      >
        <List
          itemLayout="horizontal"
          dataSource={taskDone}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <a onClick={() => openModalDetail(item)}>{item?.name}</a>
                }
                description={item?.statusTaskType}
              />
            </List.Item>
          )}
        />
      </InfiniteScroll>

      <TaskDetail
        selectedTask={selectedTask}
        isModalDetailOpen={isModalDetailOpen}
        closeModalDetail={closeModalDetail}
      />
    </div>
  )
}
export default ListTaskDone
