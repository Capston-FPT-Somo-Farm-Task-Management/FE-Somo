import { Button, Form, Input, Modal, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getAreas } from 'features/slice/area/areaSlice'
import { useEffect } from 'react'
import { getZoneByAreaPlant } from 'features/slice/zone/zoneSlice'
import { useState } from 'react'
import { getPlantType } from 'features/slice/plantType/plantTypeSlice'
import { createPlant } from 'features/slice/plant/plantSlice'
import { getFieldByZonePlant } from 'features/slice/field/fieldSlice'

const FirstStepAddPlant = ({ isModalOpen, closeModal }) => {
  const [selectedAreaId, setSelectedAreaId] = useState(null)
  const [selectedZoneId, setSelectedZoneId] = useState(null)

  const area = useSelector((state) => state.area.data)
  const zone = useSelector((state) => state.zone.data)
  const field = useSelector((state) => state.field.data)

  const plantType = useSelector((state) => state.plantType.data)
  const dataPlantType = plantType.data
  
  const dataZone = zone.data
  const dataField = field.data

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAreas())
    dispatch(getPlantType())
  }, [])

  useEffect(() => {
    if (selectedAreaId) {
      dispatch(getZoneByAreaPlant(selectedAreaId))
    }
    if (selectedZoneId) {
      dispatch(getFieldByZonePlant(selectedZoneId))
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
    const finalValues = {
      ...values,
      height: parseFloat(values.height),
    }
    dispatch(createPlant(finalValues))
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
          initialValues={{ height: 0 }}
          onFinish={onFinish}
        >
          <div className="form-left">
            {/* ID Plant */}
            <Form.Item label="Mã cây trồng" required name="externalId">
              <Input placeholder="Nhập mã cây trồng" />
            </Form.Item>

            {/* Plant  Name */}
            <Form.Item label="Tên cây trồng" required name="name">
              <Input placeholder="Nhập tên cây trồng" />
            </Form.Item>

            {/* Plant Type */}
            <Form.Item label="Loại cây" required name="habitantTypeId">
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
              required
              rules={{ type: 'number' }}
              name="height"
            >
              <Input placeholder="Nhập chiều cao" type="number" min={0} />
            </Form.Item>
          </div>

          <div className="form-right">
            {/* Area */}
            <Form.Item label="Khu vực" required>
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
            <Form.Item label="Vùng" required>
              <Select
                placeholder="Chọn vùng"
                options={
                  Array.isArray(dataZone)
                    ? dataZone.map((item) => ({
                        label: item.name,
                        value: item.id,
                      }))
                    : []
                }
                onChange={handleSelectZoneChange}
              ></Select>
            </Form.Item>

            {/* Field */}
            <Form.Item label="Vườn" required name="fieldId">
              <Select
                placeholder="Chọn vườn"
                options={
                  Array.isArray(dataField)
                    ? dataField.map((item) => ({
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
