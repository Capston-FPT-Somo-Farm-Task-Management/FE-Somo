import { Button, Modal, Steps, message, theme } from 'antd'
import React, { useState } from 'react'
import Search from 'antd/es/input/Search'
import { stepsType } from 'features/pages/Animals/Animals/components/AddAndSearchAnimals/AddAnimalData'

const AddAndSearchAnimalGroup = () => {
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

  const { token } = theme.useToken()
  const contentStyle = {
    lineHeight: '400px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  }

  return (
    <>
      <div>
        <div>
          <h1>Chăn nuôi</h1>
        </div>

        <div>
          <Button type="default" onClick={showModalType}>
            Tạo theo nhóm
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

          <span>
            <Search
              placeholder="Tìm kiếm"
              allowClear
              style={{
                marginLeft: '15px',
                width: 300,
              }}
            />
          </span>
        </div>
      </div>
    </>
  )
}
export default AddAndSearchAnimalGroup
