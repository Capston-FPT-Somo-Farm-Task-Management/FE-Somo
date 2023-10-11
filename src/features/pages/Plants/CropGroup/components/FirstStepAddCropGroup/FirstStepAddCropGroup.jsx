import { Button, Form, Input, InputNumber, Modal, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getAreaActive, getAreas } from 'features/slice/area/areaSlice'
import { useEffect, useState } from 'react'
import { getZoneByAreaPlant } from 'features/slice/zone/zonePlantSlice'
import { createField } from 'features/slice/field/fieldSlice'

const FirstStepAddCropGroup = ({ isModalOpen, closeModal }) => {
  const [selectedAreaId, setSelectedAreaId] = useState(null)

  const area = useSelector((state) => state.area.data)
  const zonePlant = useSelector((state) => state.zonePlant.data)
  const dataZonePlant = zonePlant.data
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAreaActive())
  }, [])

  useEffect(() => {
    if (selectedAreaId) {
      dispatch(getZoneByAreaPlant(selectedAreaId))
    }
  }, [selectedAreaId])

  const handleSelectAreaChange = (value) => {
    setSelectedAreaId(value)
  }

  const onFinish = (values) => {
    const finalValues = {
      ...values,
      status: 0,
    }
    dispatch(createField(finalValues))
    closeModal()
  }

  return (
    <>
      <Modal
        title="Tạo vườn"
        open={isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button form="createCropGroup" type="dashed" htmlType="reset">
            Làm mới
          </Button>,
          <Button
            form="createCropGroup"
            type="primary"
            danger
            onClick={closeModal}
          >
            Huỷ
          </Button>,
          <Button form="createCropGroup" type="primary" htmlType="submit">
            Hoàn thành
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-crop-group"
          id="createCropGroup"
          onFinish={onFinish}
        >
          <div className="form-left">
            {/*  Name */}
            <Form.Item
              label="Tên vườn"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên vườn',
                },
              ]}
            >
              <Input placeholder="Nhập tên vườn" />
            </Form.Item>

            {/*  Code */}
            <Form.Item
              label="Mã vườn"
              name="code"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã vườn',
                },
              ]}
            >
              <Input placeholder="Nhập mã vườn" />
            </Form.Item>

            {/* Square*/}
            <Form.Item
              label="Diện tích"
              name="area"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập diện tích',
                },
              ]}
            >
              <InputNumber style={{ width: '100%' }} addonAfter="m2" min={0} />
            </Form.Item>
          </div>

          <div className="form-right">
            {/* Area */}
            <Form.Item label="Khu vực">
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
              name="zoneId"
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
              ></Select>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  )
}
export default FirstStepAddCropGroup
