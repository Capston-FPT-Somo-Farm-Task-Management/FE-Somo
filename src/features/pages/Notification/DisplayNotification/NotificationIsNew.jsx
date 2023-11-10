import React, { useEffect, useState } from 'react'
import { List, Popover } from 'antd'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import { authServices } from 'services/authServices'
import { getNotifyIsNewById } from 'features/slice/notification/notificationIsNewSlice'
import { getTaskById } from 'features/slice/task/taskByIdSlice'

const NotificationIsNew = ({ changeStatusNotify }) => {
  const dispatch = useDispatch()
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const taskById = useSelector((state) => state.taskById.data)

  // Load notify
  const notifyNew = useSelector((state) => state.notificationIsNew.data)
  // const [pageNumber, setPageNumber] = useState(1)

  console.log(notifyNew)

  useEffect(() => {
    dispatch(
      getNotifyIsNewById({
        pageNumber: 1,
        pageSize: 10,
        id: authServices.getUserId(),
      })
    )
  }, [dispatch])

  // const getMoreNotifyIsNew = () => {
  //   setPageNumber(pageNumber + 1)
  //   dispatch(getNotifyIsNewById(pageNumber))
  // }

  // Task detail
  useEffect(() => {
    dispatch(getTaskById(selectedTaskId))
  }, [dispatch, selectedTaskId])

  const getDetailNotify = (item) => {
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
        locale={{ emptyText: 'Không có thông báo chưa đọc' }}
        dataSource={notifyNew ? notifyNew : []}
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
                  <a>{item.message}</a>
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

export default NotificationIsNew
