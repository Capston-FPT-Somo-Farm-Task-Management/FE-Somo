import { Button, Modal, Steps, theme, message } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { DashOutlined } from '@ant-design/icons'
import { steps } from './AddCropTypeAndPlantData'

const AddCropTypeAndPlant = () => {
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
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  }
  return (
    <>
      <div>
        <div>
          <h1>Cây trồng</h1>
        </div>

        <div>
          <span>
            {/* Add Animal*/}
            <Button type="primary" onClick={showModal}>
              Tạo mới loại cây
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
            <Button type="default">
              <Link to="">Tạo mới cây</Link>
            </Button>

            <Button type="dashed">
              <Link to="">
                <DashOutlined />
              </Link>
            </Button>
          </span>
        </div>
      </div>
    </>
  )
}
export default AddCropTypeAndPlant
