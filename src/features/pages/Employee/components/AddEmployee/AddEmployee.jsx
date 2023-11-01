import { Button } from 'antd'
import Search from 'antd/es/input/Search'
import { useState } from 'react'
import FormAddEmployee from '../FormAddEmployee/FormAddEmployee'

const AddEmployee = ({ onFinishCreate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className="animal-group-content content">
        <h3>Nhân viên</h3>

        <div className="animal-group-operate">
          <div className="animal-group-operate-left">
            <Button type="primary" onClick={openModal}>
              Thêm nhân viên
            </Button>
            <FormAddEmployee
              isModalOpen={isModalOpen}
              closeModal={closeModal}
              onFinishCreate={onFinishCreate}
            />
          </div>

          <div className="animal-group-operate-right">
            <Search
              placeholder="Tìm kiếm"
              allowClear
              style={{
                marginLeft: '15px',
                width: 300,
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default AddEmployee
