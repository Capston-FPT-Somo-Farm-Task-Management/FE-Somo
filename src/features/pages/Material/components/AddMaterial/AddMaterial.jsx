import { Button, Form } from 'antd'
import { useState } from 'react'
import FormAddMaterial from '../FormAddMaterial/FormAddMaterial'
import Search from 'antd/es/input/Search'

const AddMaterial = ({ onFinishCreate, farmId, handleSearch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <>
        <div className="animal-group-content content">
          <h3>Công cụ</h3>

          <div className="animal-group-operate">
            <div className="animal-group-operate-left">
              <Button type="primary" onClick={openModal}>
                Thêm công cụ
              </Button>

              <FormAddMaterial
                farmId={farmId}
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
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </>
    </>
  )
}
export default AddMaterial
