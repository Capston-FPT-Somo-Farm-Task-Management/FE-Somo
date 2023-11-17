import { Button } from 'antd'
import FormAddTaskType from './FormAddTaskType'
import { useState } from 'react'
import Search from 'antd/es/input/Search'
import FormUploadExcel from './FormUploadExcel'

const AddTaskType = ({
  onFinishCreateTaskType,
  getTemplate,
  getTaskTypeByExcel,
  onFinishCreateTaskTypeExcel,
  handleSearch,
}) => {
  const [isModalOpenType, setIsModalOpenType] = useState(false)

  const openModalType = () => {
    setIsModalOpenType(true)
  }

  const closeModalType = () => {
    setIsModalOpenType(false)
  }

  const [isModalOpenExcel, setIsModalOpenExcel] = useState(false)

  const openModalExcel = () => {
    setIsModalOpenExcel(true)
  }

  const closeModalExcel = () => {
    setIsModalOpenExcel(false)
  }

  // ----------------------------------------------
  const getTaskTypeTemplate = () => {
    getTemplate()
  }

  const getTaskTypeExcel = () => {
    getTaskTypeByExcel()
  }

  return (
    <>
      <div className="plant-content content">
        <h3>Loại công việc</h3>

        <div className="plant-operate">
          <div className="plant-operate-left">
            {/* Add Task Type */}
            <Button type="primary" onClick={openModalType}>
              Tạo loại công việc
            </Button>
            <FormAddTaskType
              isModalOpenType={isModalOpenType}
              closeModalType={closeModalType}
              onFinishCreateTaskType={onFinishCreateTaskType}
              // farmId={farmId}
            />

            <Button type="default" onClick={getTaskTypeTemplate}>
              Tải tệp excel mẫu
            </Button>

            <Button type="dashed" onClick={getTaskTypeExcel}>
              Tải xuống loại công việc
            </Button>
            <Button type="dashed" onClick={openModalExcel}>
              Tạo loại công việc bằng tệp excel
            </Button>
            <FormUploadExcel
              isModalOpenExcel={isModalOpenExcel}
              closeModalExcel={closeModalExcel}
              onFinishCreateTaskTypeExcel={onFinishCreateTaskTypeExcel}
            />
          </div>

          <div className="plant-operate-right">
            <Search
              placeholder="Tìm kiếm"
              allowClear
              style={{
                marginLeft: '15px',
                width: 300,
              }}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default AddTaskType
