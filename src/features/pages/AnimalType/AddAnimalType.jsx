import { useState } from 'react'
import FormAddAnimalType from './FormAddAnimalType'
import { Button } from 'antd'
import Search from 'antd/es/input/Search'

const AddAnimalType = ({ farmId, onFinishCreateAnimalType, handleSearch }) => {
  const [isModalOpenType, setIsModalOpenType] = useState(false)

  const openModalType = () => {
    setIsModalOpenType(true)
  }

  const closeModalType = () => {
    setIsModalOpenType(false)
  }

  return (
    <>
      <div className="animal-content content">
        <h3>Chăn nuôi</h3>

        <div className="animal-operate">
          <div className="animal-operate-left">
            {/* Add Animal Type */}
            <Button type="primary" onClick={openModalType}>
              Tạo mới loại vật nuôi
            </Button>
            <FormAddAnimalType
              farmId={farmId}
              isModalOpenType={isModalOpenType}
              closeModalType={closeModalType}
              onFinishCreateAnimalType={onFinishCreateAnimalType}
            />
          </div>

          <div className="animal-operate-right">
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
export default AddAnimalType
