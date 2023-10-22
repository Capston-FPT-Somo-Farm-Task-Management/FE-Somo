import { Button } from 'antd'
import Search from 'antd/es/input/Search'
import { useState } from 'react'
import FormAddArea from '../FormAddArea/FormAddArea'

const AddArea = ({ farmId, onFinishCreate }) => {
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
        <h3>Khu vực</h3>

        <div className="animal-group-operate">
          <div className="animal-group-operate-left">
            <Button type="primary" onClick={openModal}>
              Thêm khu vực
            </Button>

            <FormAddArea
              isModalOpen={isModalOpen}
              closeModal={closeModal}
              farmId={farmId}
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
export default AddArea
