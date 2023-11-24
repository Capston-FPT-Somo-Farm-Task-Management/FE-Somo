import React, { useState } from 'react'
import { Button, Card, Space } from 'antd'
import FarmDetail from './FarmDetail'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'

const DisplayFarm = ({ farm }) => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFarm, setSelectedFarm] = useState(null)

  const showModal = (farm) => {
    setSelectedFarm(farm)
    setIsModalOpen(true)
  }

  const handleOk = (farmId) => {
    localStorage.setItem('farmId', farmId)
    toast.success('Đổi trang trại thành công')
    closeModal()
    navigate('/dashboard')
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const cardStyle = {
    width: 240,
    margin: '16px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    borderRadius: '10px',
  }

  const headerStyle = {
    textAlign: 'center',
    fontSize: '24px',
    color: '#545454',
    fontWeight: '600',
    margin: '16px 0',
    fontFamily: 'Arial, sans-serif',
  }

  const backToFarm = () => {
    navigate('/dashboard')
  }

  return (
    <>
      {localStorage.getItem('farmId') ? (
        <Space
          style={{
            width: '100%',
            justifyContent: 'space-between',
            marginTop: '20px',
          }}
        >
          <Button style={{ marginLeft: '20px' }} onClick={backToFarm}>
            <ArrowLeftOutlined />
            Trang chủ
          </Button>
          <Button
            style={{
              marginRight: '20px',
              backgroundColor: '#849b5c',
              color: 'white',
            }}
          >
            Tạo trang trại
          </Button>
        </Space>
      ) : (
        <Space
          style={{
            width: '100%',
            justifyContent: 'space-between',
            marginTop: '20px',
          }}
        >
          <div></div>
          <Button
            style={{
              marginRight: '20px',
              backgroundColor: '#849b5c',
              color: 'white',
            }}
          >
            Tạo trang trại
          </Button>
        </Space>
      )}

      <h2 style={headerStyle}>Lựa chọn nông trại để quản lý</h2>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}
      >
        {farm?.map((item) => (
          <Card
            key={item.key}
            hoverable
            style={cardStyle}
            cover={
              <img
                alt="Nông trại"
                src={item.urlImage}
                style={{
                  height: 140,
                  objectFit: 'cover',
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px',
                }}
              />
            }
            onClick={() => showModal(item)}
          >
            <Card.Meta
              title={<div style={{ fontWeight: 'bold' }}>{item.name}</div>}
              description={
                item.description.length > 30
                  ? item.description.substring(0, 30) + '...'
                  : item.description
              }
              style={{ padding: '0 12px 12px' }}
            />
          </Card>
        ))}
      </div>
      <FarmDetail
        farm={selectedFarm}
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  )
}

export default DisplayFarm
