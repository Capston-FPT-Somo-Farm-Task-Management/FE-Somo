import { Button, Form, Input, InputNumber, Modal, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getAreaActive } from 'features/slice/area/areaSlice'
import { useEffect } from 'react'
import { useState } from 'react'
import { getPlantType } from 'features/slice/plantType/plantTypeSlice'
import { createPlant } from 'features/slice/plant/plantSlice'
import { getZoneByAreaPlant } from 'features/slice/zone/zonePlantSlice'
import { getFieldByZone } from 'features/slice/field/fieldByZoneSlice'

const FirstStepAddPlant = ({ isModalOpen, closeModal }) => {
  const [selectedAreaId, setSelectedAreaId] = useState(null)
  const [selectedZoneId, setSelectedZoneId] = useState(null)

  const area = useSelector((state) => state.area.data)
  const zonePlant = useSelector((state) => state.zonePlant.data)
  const fieldByZone = useSelector((state) => state.fieldByZone.data)

  const plantType = useSelector((state) => state.plantType.data)
  const dataPlantType = plantType.data

  const dataZonePlant = zonePlant.data
  const dataFieldByZone = fieldByZone.data

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

  const cancelModal = () => {
    closeModal()
  }
  const onFinish = (values) => {
    dispatch(createPlant(values))
    closeModal()
  }

  return (
    <>
      <Modal
        title="Tạo mới cây trồng"
        open={isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button form="createPlant" type="dashed" htmlType="reset">
            Làm mới
          </Button>,
          <Button
            form="createPlant"
            type="primary"
            danger
            onClick={cancelModal}
          >
            Huỷ
          </Button>,
          <Button form="createPlant" type="primary" htmlType="submit">
            Hoàn thành
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-plant"
          id="createPlant"
          onFinish={onFinish}
        >
          <div className="form-left">
            {/* ID Plant */}
            <Form.Item
              label="Mã cây trồng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã cây trồng',
                },
              ]}
              name="externalId"
            >
              <Input placeholder="Nhập mã cây trồng" />
            </Form.Item>

            {/* Plant  Name */}
            <Form.Item
              label="Tên cây trồng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên cây trồng',
                },
              ]}
              name="name"
            >
              <Input placeholder="Nhập tên cây trồng" />
            </Form.Item>

            {/* Plant Type */}
            <Form.Item
              label="Loại cây"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn loại cây trồng',
                },
              ]}
              name="habitantTypeId"
            >
              <Select
                placeholder="Chọn loại cây"
                options={dataPlantType?.map((type) => ({
                  label: type.name,
                  value: type.id,
                }))}
              ></Select>
            </Form.Item>

            {/* Height Name */}
            <Form.Item
              label="Chiều cao cây trồng (m)"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập chiều cao cây trồng',
                },
              ]}
              name="height"
            >
              <InputNumber min={0} />
            </Form.Item>
          </div>

          <div className="form-right">
            {/* Area */}
            <Form.Item
              label="Khu vực"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn khu vực',
                },
              ]}
            >
              <Select
                placeholder="Chọn khu vực"
                options={area?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                onChange={handleSelectAreaChange}
              ></Select>
            </Form.Item>

            {/* Zone */}
            <Form.Item
              label="Vùng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn vùng',
                },
              ]}
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
              name="fieldId"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn vườn',
                },
              ]}
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
export default FirstStepAddPlant
