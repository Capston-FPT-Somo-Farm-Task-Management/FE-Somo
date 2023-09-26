import { Button, Modal, Steps, message, theme } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { DashOutlined } from '@ant-design/icons'
import Search from 'antd/es/input/Search'
import { steps, stepsType } from './AddAnimalData'

const AddAndSearchAnimals = () => {
  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  // Steps
  const { token } = theme.useToken()
  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent(current + 1)
  }
  const prev = () => {
    setCurrent(current - 1)
  }

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }))

  const contentStyle = {
    lineHeight: '400px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    marginTop: 16,
  }

  // ----------------------------------------------------------
  const [isModalOpenType, setIsModalOpenType] = useState(false)

  const showModalType = () => {
    setIsModalOpenType(true)
  }

  const handleOkAnimalGroup = () => {
    setIsModalOpenType(false)
  }
  const handleCancelAnimalGroup = () => {
    setIsModalOpenType(false)
  }

  // Steps
  const [currentType, setCurrentType] = useState(0)

  const nextType = () => {
    setCurrentType(currentType + 1)
  }
  const prevType = () => {
    setCurrentType(currentType - 1)
  }
  const itemsType = stepsType.map((itemType) => ({
    key: itemType.title,
    title: itemType.title,
  }))

  return (
    <>
      <div className="animal-content content">
        <h3>Chăn nuôi</h3>

        <div className="animal-operate">
          <div className="animal-operate-left">
            {/* Add Animal*/}
            <Button type="primary" onClick={showModal}>
              Thêm vật nuôi
            </Button>

            <Modal
              title="Tạo mới"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Steps size="large" current={current} items={items} />
              <div style={contentStyle}>{steps[current].content}</div>
              <div
                style={{
                  marginTop: 24,
                }}
              >
                {current < steps.length - 1 && (
                  <Button type="primary" onClick={() => next()}>
                    Next
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button
                    type="primary"
                    onClick={() => message.success('Processing complete!')}
                  >
                    Done
                  </Button>
                )}
                {current > 0 && (
                  <Button
                    style={{
                      margin: '0 8px',
                    }}
                    onClick={() => prev()}
                  >
                    Previous
                  </Button>
                )}
              </div>
            </Modal>

            {/* Add group */}
            <Button type="default" onClick={showModalType}>
              Thêm chuồng
            </Button>

            <Modal
              title="Tạo mới"
              open={isModalOpenType}
              onOk={handleOkAnimalGroup}
              onCancel={handleCancelAnimalGroup}
            >
              <Steps size="large" current={currentType} items={itemsType} />
              <div style={contentStyle}>{stepsType[currentType].content}</div>
              <div
                style={{
                  marginTop: 24,
                }}
              >
                {currentType < stepsType.length - 1 && (
                  <Button type="primary" onClick={() => nextType()}>
                    Next
                  </Button>
                )}
                {currentType === stepsType.length - 1 && (
                  <Button
                    type="primary"
                    onClick={() => message.success('Processing complete!')}
                  >
                    Done
                  </Button>
                )}
                {currentType > 0 && (
                  <Button
                    style={{
                      margin: '0 8px',
                    }}
                    onClick={() => prevType()}
                  >
                    Previous
                  </Button>
                )}
              </div>
            </Modal>

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
export default AddAndSearchAnimals
