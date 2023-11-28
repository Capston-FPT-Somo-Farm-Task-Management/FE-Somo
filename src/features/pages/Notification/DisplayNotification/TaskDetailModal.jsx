const { Modal } = require('antd')

const TaskDetailModal = ({ taskById, isModalOpen, closeModal, content }) => {
  console.log(taskById);

  return (
    <Modal
      title="Chi tiết công việc"
      open={isModalOpen}
      onOk={closeModal}
      onCancel={closeModal}
    >
      <div>{content}</div>
    </Modal>
  )
}

export default TaskDetailModal
