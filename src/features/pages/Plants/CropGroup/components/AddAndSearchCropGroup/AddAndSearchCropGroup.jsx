import { Button, Modal, Steps, message, theme } from 'antd'
import Search from 'antd/es/input/Search'
import { useState } from 'react'
import { stepsType } from './AddCropGroupData'

const AddAndSearchCropGroup = () => {
  const [isModalOpenType, setIsModalOpenType] = useState(false)

  const showModalType = () => {
    setIsModalOpenType(true)
  }

  const handleOkCropGroup = () => {
    setIsModalOpenType(false)
  }
  const handleCancelCropGroup = () => {
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
    marginTop: 16,
  }

  return (
    <>
      <div className="crop-group-content content">
        <h3>Vườn</h3>

        <div className="crop-group-operate">
          <div className="crop-group-operate-left">
            <Button type="primary" onClick={showModalType}>
              Thêm vườn
            </Button>

            <Modal
              title="Tạo mới"
              open={isModalOpenType}
              onOk={handleOkCropGroup}
              onCancel={handleCancelCropGroup}
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
          </div>

          <div className="crop-group-operate-right">
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
export default AddAndSearchCropGroup
