import { Button, Modal, Steps, message, theme } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { DashOutlined } from '@ant-design/icons'
import Search from 'antd/es/input/Search'
import { steps } from './AddAndSearchAnimalsData'

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
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  }

  return (
    <>
      <div className="content">
        <h1>Chăn nuôi</h1>

        <div className="group">
          <span className="button-add">
            {/* Add Animal*/}
            <Button type="primary" onClick={showModal}>
              Tạo mới
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
              <Link to="">Tạo mới theo nhóm</Link>
            </Button>

            <Button type="dashed">
              <Link to="">
                <DashOutlined />
              </Link>
            </Button>
          </span>
          <span className="search-animal">
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
export default AddAndSearchAnimals
