import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { DashOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Search from 'antd/es/input/Search'
import FirstStepAddPlant from '../FirstStepAddPlant/FirstStepAddPlant'
import FirstStepAddPlantType from '../FirstStepAddPlantType/FirstStepAddPlantType'

const AddPlantAndPlantType = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const [isModalOpenType, setIsModalOpenType] = useState(false)

  const openModalType = () => {
    setIsModalOpenType(true)
  }

  const closeModalType = () => {
    setIsModalOpenType(false)
  }

  return (
    <>
      <div className="plant-content content">
        <h3>Cây trồng</h3>

        <div className="plant-operate">
          <div className="plant-operate-left">
            {/* Add Plant*/}
            <Button type="primary" onClick={openModal}>
              Tạo mới cây
            </Button>
            <FirstStepAddPlant
              isModalOpen={isModalOpen}
              closeModal={closeModal}
            />

            {/* Add Plant Type */}
            <Button type="default" onClick={openModalType}>
              Tạo mới loại cây
            </Button>
            <FirstStepAddPlantType
              isModalOpenType={isModalOpenType}
              closeModalType={closeModalType}
            />

            <Button type="dashed">
              <Link to="">
                <DashOutlined />
              </Link>
            </Button>
          </div>

          <div className="plant-operate-right">
            <Search placeholder="Tìm kiếm" allowClear />
          </div>
        </div>
      </div>
    </>
  )
}
export default AddPlantAndPlantType
