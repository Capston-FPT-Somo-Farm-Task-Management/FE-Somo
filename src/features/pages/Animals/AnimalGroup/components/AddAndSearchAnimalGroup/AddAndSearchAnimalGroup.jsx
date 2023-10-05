import { Button, Modal, Steps, message, theme } from 'antd'
import React, { useState } from 'react'
import Search from 'antd/es/input/Search'
import { stepsType } from 'features/pages/Animals/Animals/components/AddAnimalAndAnimalType/AddAnimalAndAnimalTypeData'
import FirstStepAddAnimalGroup from '../FirstStepAddAnimalGroup/FirstStepAddAnimalGroup'

const AddAndSearchAnimalGroup = () => {
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
        <h3>Chuồng</h3>

        <div className="animal-group-operate">
          <div className="animal-group-operate-left">
            <Button type="primary" onClick={openModal}>
              Thêm chuồng
            </Button>

            <FirstStepAddAnimalGroup
              isModalOpen={isModalOpen}
              closeModal={closeModal}
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
export default AddAndSearchAnimalGroup
