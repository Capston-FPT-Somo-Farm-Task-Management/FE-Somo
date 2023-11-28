import React, { useEffect, useState } from 'react'
import { List } from 'antd'
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
  const [hasMore, setHasMore] = useState(true)

  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const response = await dispatch(
          getNotifyIsNewById({
            pageNumber: pageNumber,
            pageSize: 10,
            id: authServices.getUserId(),
          })
        ).unwrap()
        if (response && response.length === 0) {
          setHasMore(false)
        }
      } catch (error) {
        console.error('Failed to load notifications:', error)
      }
    }

    loadNotifications()
  }, [dispatch, pageNumber])

  // Task detail
  useEffect(() => {
    dispatch(getTaskById(selectedTaskId))
  }, [dispatch, selectedTaskId])

  // const getDetailNotify = (item) => {
  //   setSelectedTaskId(item.taskId)
  //   changeStatusNotify(item.id)
  // }

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

  const fetchMoreData = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1)
  }

  return (
    <>
      <InfiniteScroll
        dataLength={notifyNew ? notifyNew.length : null}
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
          locale={{ emptyText: 'Không có thông báo chưa đọc' }}
          dataSource={notifyNew ? notifyNew : []}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={<a>{item.message}</a>}
                description={item.time}
              />
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </>
  )
}

export default NotificationIsNew
