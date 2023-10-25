import { Button } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { DashOutlined } from '@ant-design/icons'
import Search from 'antd/es/input/Search'
import FirstStepAddAnimal from '../FirstStepAddAnimal/FirstStepAddAnimal'
import FirstStepAddAnimalType from '../FirstStepAddAnimalType/FirstStepAddAnimalType'

const AddAnimalAndAnimalType = ({
  onFinishCreateAnimal,
  onFinishCreateAnimalType,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenType, setIsModalOpenType] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Type

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
            {/* Add Animal*/}
            <Button type="primary" onClick={openModal}>
              Thêm vật nuôi
            </Button>
            <FirstStepAddAnimal
              isModalOpen={isModalOpen}
              closeModal={closeModal}
              onFinishCreateAnimal={onFinishCreateAnimal}
            />

            {/* Add Animal Type */}
            <Button type="default" onClick={openModalType}>
              Tạo mới loại vật nuôi
            </Button>
            <FirstStepAddAnimalType
              isModalOpenType={isModalOpenType}
              closeModalType={closeModalType}
              onFinishCreateAnimalType={onFinishCreateAnimalType}
            />

            <Button type="dashed">
              <Link to="">
                <DashOutlined />
              </Link>
            </Button>
          </div>

          <div className="animal-operate-right">
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
export default AddAnimalAndAnimalType
