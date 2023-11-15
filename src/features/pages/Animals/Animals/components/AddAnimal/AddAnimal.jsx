import { Button } from 'antd'
import React, { useState } from 'react'
import Search from 'antd/es/input/Search'
import FirstStepAddAnimal from '../FirstStepAddAnimal/FirstStepAddAnimal'

const AddAnimal = ({ farmId, areaByFarm, onFinishCreateAnimal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
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
              farmId={farmId}
              isModalOpen={isModalOpen}
              closeModal={closeModal}
              areaByFarm={areaByFarm}
              onFinishCreateAnimal={onFinishCreateAnimal}
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
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default AddAnimal
