import React, { useState } from 'react'
import { Badge, Modal } from 'antd'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { Descriptions } from 'antd'
// import Gallery from "react-images";

const TaskDetail = ({ visible, onCancel, taskData }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false)
  const evidenceData = useSelector((state) => state.evidence.data)
  const dataEvidence = evidenceData && evidenceData.data

  if (!taskData) {
    return null
  }

  const openLightbox = (index) => {
    setCurrentIndex(index)
    setLightboxIsOpen(true)
  }

  const closeLightbox = () => {
    setCurrentIndex(0)
    setLightboxIsOpen(false)
  }

  const images = dataEvidence.flatMap((evidence) => evidence.urlImage)
  const formattedImages = images.map((url) => ({ src: url }))

  const onNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const onPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + images.length - 1) % images.length
    )
  }

  const formattedStartDate = dayjs(taskData.startDate).format(
    'HH:mm DD-MM-YYYY'
  )
  const formattedEndDate = dayjs(taskData.endDate).format('HH:mm DD-MM-YYYY')

  const renderSubFields = () => {
    if (externalId) {
      if (fieldStatus === 'Thực vật') {
        return <span>Mã cây trồng: {plantName}</span>
      } else if (fieldStatus === 'Động vật') {
        return <span>Mã vật nuôi: {liveStockName}</span>
      }
    }
    return null
  }

  const { externalId, fieldStatus, liveStockName, plantName } = taskData

  const dataTask = [
    {
      key: '1',
      label: 'Tên công việc',
      children: taskData.name,
    },
    {
      key: '2',
      label: 'Loại công việc',
      children: taskData.taskTypeName,
    },
    {
      key: '3',
      label: 'Trạng thái',
      children: taskData.status,
    },
    {
      key: '4',
      label: 'Ưu tiên',
      children: (
        <Badge
          status="processing"
          color={
            taskData.priority === 'Cao nhất'
              ? 'red'
              : taskData.priority === 'Cao'
              ? 'orange'
              : taskData.priority === 'Trung bình'
              ? 'yellow'
              : taskData.priority === 'Thấp'
              ? 'green'
              : taskData.priority === 'Thấp nhất'
              ? 'blue'
              : 'default' // Màu mặc định nếu không khớp với bất kỳ điều kiện nào
          }
          text={taskData.priority}
        />
      ),
    },
    {
      key: '5',
      label: 'Ngày bắt đầu',
      children: formattedStartDate,
    },
    {
      key: '6',
      label: 'Ngày kết thúc',
      children: formattedEndDate,
    },
    {
      key: '7',
      label: 'Dụng cụ',
      children: taskData.materialName,
      span: 3,
    },
    {
      key: '8',
      label: 'Người giám sát',
      children: taskData.supervisorName,
    },
    {
      key: '9',
      label: 'Người thực hiện',
      children: taskData.employeeName,
      span: 2,
    },
    {
      key: '10',
      label: 'Địa điểm thực hiện',
      children: (
        <>
          Khu vực: {taskData.areaName}
          <br />
          Vùng: {taskData.zoneName}
          <br />
          Vị trí cụ thể: {taskData.fieldName}
          <br />
          {renderSubFields()}
          <br />
          Mô tả: {taskData.description}
          <br />
        </>
      ),
    },
  ]

  const renderImages = () => {
    if (dataEvidence && dataEvidence.length > 0) {
      return dataEvidence.map((evidence, index) => (
        <div key={evidence.id}>
          <p>{evidence.time}</p>
          <p>{evidence.description}</p>
          {console.log(evidence.id)}
          {evidence.urlImage.map((url, imageIndex) => (
            <div className="img-evidence" key={imageIndex}>
              <img src={url} alt={`evidence-${imageIndex}`} />
            </div>
          ))}
        </div>
      ))
    } else {
      return <p>Chưa có bằng chứng báo cáo</p>
    }
  }

  return (
    <Modal
      title="Chi tiết công việc"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={1000}
      className="modal-detail"
    >
      <Descriptions bordered items={dataTask} />

      <div className="evidence">{renderImages()}</div>
    </Modal>
  )
}

export default TaskDetail
