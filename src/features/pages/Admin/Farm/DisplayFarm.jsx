import React, { useState } from 'react'
import { Card } from 'antd'
import FarmDetail from './FarmDetail'
import { toast } from 'react-toastify'

const DisplayFarm = ({ farm }) => {
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

  return (
    <>
      <h2 style={headerStyle}>Lựa chọn nông trại để quản lý</h2>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}
      >
        {farm.map((item) => (
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
