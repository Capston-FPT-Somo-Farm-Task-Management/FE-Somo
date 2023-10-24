import { Button, Form, Input, InputNumber, Modal, Select } from 'antd'
import { getAreaActive } from 'features/slice/area/areaSlice'
import { getFieldByZone } from 'features/slice/field/fieldByZoneSlice'
import { updatePlant } from 'features/slice/plant/plantSlice'
import { getPlantType } from 'features/slice/plantType/plantTypeSlice'
import { getZoneByAreaPlant } from 'features/slice/zone/zonePlantSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const UpdateCrop = ({ isModalOpen, closeModal, selectedData, loadData }) => {
  const [selectedAreaId, setSelectedAreaId] = useState(null)
  const [selectedZoneId, setSelectedZoneId] = useState(null)

  const area = useSelector((state) => state.area.data)

  const zonePlant = useSelector((state) => state.zonePlant.data)
  const dataZonePlant = zonePlant.data

  const fieldByZone = useSelector((state) => state.fieldByZone.data)
  const dataFieldByZone = fieldByZone.data

  const plantType = useSelector((state) => state.plantType.data)
  const dataPlantType = plantType.data

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAreaActive())
    dispatch(getPlantType())
  }, [])

  useEffect(() => {
    if (selectedAreaId) {
      dispatch(getZoneByAreaPlant(selectedAreaId))
    }
    if (selectedZoneId) {
      dispatch(getFieldByZone(selectedZoneId))
    }
  }, [selectedAreaId, selectedZoneId])

  const handleSelectAreaChange = (value) => {
    setSelectedAreaId(value)
  }

  const handleSelectZoneChange = (value) => {
    setSelectedZoneId(value)
  }

  const onFinish = (values) => {
    const finalValues = {
      id: selectedData.id,
      name: values.name,
      externalId: values.externalId,
      height: values.height,
      habitantTypeId: values.habitantType.value,
      fieldId: values.field.value,
    }
    dispatch(updatePlant(finalValues)).then(() => {
      loadData()
      setTimeout(() => {
        closeModal()
      }, 500)
    })
  }
  return (
    <>
      <Modal
        title="Cập nhật vật nuôi"
        open={isModalOpen}
        closeIcon
        onCancel={closeModal}
        footer={[
          <Button
            form="updatePlant"
            type="primary"
            htmlType="reset"
            danger
            onClick={closeModal}
          >
            Huỷ
          </Button>,
          <Button form="updatePlant" type="primary" htmlType="submit">
            Cập nhật
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-plant"
          id="updatePlant"
          onFinish={onFinish}
        >
          <div className="form-left">
            {/* ID Animal */}
            <Form.Item
              label="Mã cây trồng"
              initialValue={selectedData ? selectedData.externalId : ''}
              name="externalId"
            >
              <Input placeholder="Nhập mã vật nuôi" readOnly />
            </Form.Item>

            {/* Name Animal */}
            <Form.Item
              label="Tên cây trồng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên cây trồng',
                },
              ]}
              initialValue={selectedData ? selectedData.name : ''}
              name="name"
            >
              <Input placeholder="Nhập tên cây trồng" />
            </Form.Item>

            {/* Animal Type */}
            <Form.Item
              label="Loại cây trồng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn loại cây trồng',
                },
              ]}
              name="habitantType"
              initialValue={
                selectedData
                  ? {
                      label: selectedData.habitantTypeName,
                      value: selectedData.habitantTypeId,
                    }
                  : ''
              }
            >
              <Select
                placeholder="Chọn loại cây trồng"
                options={dataPlantType?.map((type) => ({
                  label: type.name,
                  value: type.id,
                }))}
              ></Select>
            </Form.Item>

            {/* Height */}
            <Form.Item
              label="Chiều cao cây trồng (m)"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập cân nặng vật nuôi',
                },
              ]}
              initialValue={selectedData ? selectedData.height : ''}
              name="height"
            >
              <InputNumber min={0} addonAfter="m" />
            </Form.Item>
          </div>

          <div className="form-right">
            {/* Area */}
            <Form.Item
              label="Khu vực"
              name="area"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn khu vực',
                },
              ]}
              initialValue={
                selectedData
                  ? {
                      label: selectedData.areaName,
                      value: selectedData.areaId,
                    }
                  : ''
              }
            >
              <Select
                placeholder="Chọn khu vực"
                options={area.data?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                onChange={handleSelectAreaChange}
              ></Select>
            </Form.Item>

            {/* Zone */}
            <Form.Item
              label="Vùng"
              name="zone"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn vùng',
                },
              ]}
              initialValue={
                selectedData
                  ? {
                      label: selectedData.zoneName,
                      value: selectedData.zoneId,
                    }
                  : ''
              }
            >
              <Select
                placeholder="Chọn vùng"
                options={
                  Array.isArray(dataZonePlant)
                    ? dataZonePlant.map((item) => ({
                        label: item.name,
                        value: item.id,
                      }))
                    : []
                }
                onChange={handleSelectZoneChange}
              ></Select>
            </Form.Item>

            {/* Field */}
            <Form.Item
              label="Vườn"
              name="field"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn vườn',
                },
              ]}
              initialValue={
                selectedData
                  ? {
                      label: selectedData.fieldName,
                      value: selectedData.fieldId,
                    }
                  : ''
              }
            >
              <Select
                placeholder="Chọn vườn"
                options={
                  Array.isArray(dataFieldByZone)
                    ? dataFieldByZone.map((item) => ({
                        label: item.name,
                        value: item.id,
                      }))
                    : []
                }
              ></Select>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  )
}
export default UpdateCrop
