import { List, Modal } from 'antd'
import { getAllNotify } from 'features/slice/notification/notificationSlice'
import { getTaskById } from 'features/slice/task/taskByIdSlice'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { authServices } from 'services/authServices'

const NotificationAll = ({ changeStatusNotify }) => {
  const dispatch = useDispatch()
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const taskById = useSelector((state) => state.taskById.data)
  const [hasMore, setHasMore] = useState(true)

  // Load notify
  const notifyAll = useSelector((state) => state.notification.data)
  const totalPages = useSelector((state) => state.notification.totalPages)

  const [pageNumber, setPageNumber] = useState(1)

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    // Hàm này gửi yêu cầu tới API và xử lý phản hồi
    const loadNotifications = async () => {
      try {
        const response = await dispatch(
          getAllNotify({
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
        dataLength={notifyAll.length}
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
          locale={{ emptyText: 'Chưa có thông báo' }}
          dataSource={notifyAll ? notifyAll : []}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={
                  item.isNew === true ? (
                    <a style={{ color: 'red' }} onClick={showModal}>
                      {item.message}
                    </a>
                  ) : (
                    <a onClick={showModal}>{item.message}</a>
                  )
                }
                description={item.time}
              />
              <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                maskClosable={false}
              >
                {content}
              </Modal>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </>
  )
}
export default NotificationAll
