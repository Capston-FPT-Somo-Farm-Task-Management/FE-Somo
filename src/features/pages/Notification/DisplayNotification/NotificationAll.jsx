import { Badge, List, Popover } from 'antd'
import { getAllNotify } from 'features/slice/notification/notificationSlice'
import { getTaskById } from 'features/slice/task/taskByIdSlice'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { authServices } from 'services/authServices'

const NotificationAll = ({ changeStatusNotify }) => {
  const dispatch = useDispatch()
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const taskById = useSelector((state) => state.taskById.data)

  // Load notify
  const notifyAll = useSelector((state) => state.notification.data)
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    dispatch(
      getAllNotify({
        pageNumber: 1,
        pageSize: 200,
        id: authServices.getUserId(),
      })
    )
  }, [dispatch, pageNumber])

  // Task detail
  useEffect(() => {
    dispatch(getTaskById(selectedTaskId))
  }, [dispatch, selectedTaskId])

  const getDetailNotify = (item) => {
    console.log(item)
    setSelectedTaskId(item.taskId)
    changeStatusNotify(item.id)
  }

  const content = (
    <div>
      <p>Tên công việc: {taskById ? taskById.data?.name : null}</p>
      <p>Trạng thái: {taskById ? taskById.data?.status : null}</p>
      <p>Mô tả: {taskById ? taskById.data?.description : null}</p>
      <p>Công cụ: {taskById ? taskById.data?.materialName : null}</p>
      <p>Độ ưu tiên: {taskById ? taskById.data?.priority : null}</p>
      <p>Người quản lý: {taskById ? taskById.data?.managerName : null}</p>
      <p>Nhân viên: {taskById ? taskById.data?.employeeName : null}</p>
      <p>Khu vực: {taskById ? taskById.data?.areaName : null}</p>
      <p>Vùng: {taskById ? taskById.data?.zoneName : null}</p>
      <p>Cụ thể: {taskById ? taskById.data?.fieldName : null}</p>
    </div>
  )

  return (
    <>
      <List
        itemLayout="horizontal"
        locale={{ emptyText: 'Chưa có thông báo' }}
        dataSource={notifyAll ? notifyAll : []}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Popover
                  title={item.message}
                  trigger="click"
                  content={content}
                  placement="topLeft"
                  onClick={() => getDetailNotify(item)}
                >
                  {item.isNew === true ? (
                    <a style={{ color: 'red' }}>{item.message}</a>
                  ) : (
                    <a>{item.message}</a>
                  )}
                </Popover>
              }
              description={item.time}
            />
          </List.Item>
        )}
      />
    </>
  )
}
export default NotificationAll
