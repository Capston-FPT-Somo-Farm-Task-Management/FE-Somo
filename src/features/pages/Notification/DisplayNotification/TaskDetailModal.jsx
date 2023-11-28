const { Modal } = require('antd')

const TaskDetailModal = ({ taskById, isModalOpen, closeModal }) => {
  return (
    <Modal
      title="Chi tiết công việc"
      open={isModalOpen}
      onOk={closeModal}
      onCancel={closeModal}
      style={{ zIndex: 3050 }} // CSS inline để đặt z-index
    >
      <p>content</p>
    </Modal>
  )
}

export default TaskDetailModal
