import React, { useState } from 'react'
import { Button, Card, Col, Row, Space } from 'antd'
import FarmDetail from './FarmDetail'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
import FormAddFarm from './FormAddFarm'

const DisplayFarm = ({ farm, onFinishCreate, onFinishDelete }) => {
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

  const getCardStyle = (numberOfFarms) => ({
    width: numberOfFarms === 1 ? '60%' : 370,
    margin: '16px auto',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    borderRadius: '10px',
  })

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

  // Add
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false)

  const openModalAdd = () => {
    setIsModalOpenAdd(true)
  }

  const closeModalAdd = () => {
    setIsModalOpenAdd(false)
  }

  const deleteFarm = (id) => {
    console.log(id)
    onFinishDelete(id)
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
            }}
            onClick={openModalAdd}
            type="primary"
          >
            Tạo trang trại
          </Button>

          <FormAddFarm
            isModalOpenAdd={isModalOpenAdd}
            closeModalAdd={closeModalAdd}
            onFinishCreate={onFinishCreate}
          />
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
      <Row gutter={[16, 16]} justify="center">
        {Array.isArray(farm) &&
          farm?.map((item) => (
            <Col
              xs={24}
              sm={farm.length === 1 ? 16 : 12}
              lg={farm.length === 1 ? 16 : 12}
              xl={farm.length === 1 ? 16 : 12}
            >
              <Card
                key={item.key}
                hoverable
                style={getCardStyle(farm.length)}
                cover={
                  <img
                    alt="Nông trại"
                    src={item.urlImage}
                    style={{
                      height: farm.length === 1 ? 300 : 190,
                      objectFit: 'cover',
                      borderTopLeftRadius: '10px',
                      borderTopRightRadius: '10px',
                    }}
                  />
                }
                actions={[
                  <span style={{ color: '#52c41a', fontSize: '18px' }}>
                    <EditOutlined />
                  </span>,
                  <span style={{ color: '#f5222d', fontSize: '18px' }}>
                    <DeleteOutlined onClick={() => deleteFarm(item.id)} />
                  </span>,
                ]}
              >
                <Card.Meta
                  onClick={() => showModal(item)}
                  title={<div style={{ fontWeight: 'bold' }}>{item.name}</div>}
                  description={
                    item.description.length > 30
                      ? item.description.substring(0, 30) + '...'
                      : item.description
                  }
                  style={{ padding: '0 12px 12px' }}
                />
              </Card>
            </Col>
          ))}
      </Row>
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
