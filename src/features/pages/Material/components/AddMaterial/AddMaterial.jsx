import { Button } from 'antd'
import { useState } from 'react'
import FormAddMaterial from '../FormAddMaterial/FormAddMaterial'
import Search from 'antd/es/input/Search'

const AddMaterial = ({ onFinishCreate }) => {
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
    </>
  )
}
export default AddMaterial
