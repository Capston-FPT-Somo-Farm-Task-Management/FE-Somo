import React, { useState } from 'react'

import { Button } from 'antd'
import Search from 'antd/es/input/Search'
import FirstStepAddPlant from '../FirstStepAddPlant/FirstStepAddPlant'

const AddPlant = ({ areaByFarm, onFinishCreatePlant, farmId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
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
              farmId={farmId}
              isModalOpen={isModalOpen}
              closeModal={closeModal}
              areaByFarm={areaByFarm}
              onFinishCreatePlant={onFinishCreatePlant}
            />
          </div>

          <div className="plant-operate-right">
            <Search placeholder="Tìm kiếm" allowClear />
          </div>
        </div>
      </div>
    </>
  )
}
export default AddPlant