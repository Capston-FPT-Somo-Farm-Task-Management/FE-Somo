import { Button, Form, Input, InputNumber, Modal, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getAreas } from 'features/slice/area/areaSlice'
import { getZoneByAreaAnimal } from 'features/slice/zone/zoneAnimalSlice'
import { createField } from 'features/slice/field/fieldSlice'

const FirstStepAddAnimalGroup = ({ isModalOpen, closeModal }) => {
  const [selectedAreaId, setSelectedAreaId] = useState(null)

  const area = useSelector((state) => state.area.data)
  const zoneAnimal = useSelector((state) => state.zoneAnimal.data)
  const dataZoneAnimal = zoneAnimal.data
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAreas())
  }, [])

  useEffect(() => {
    if (selectedAreaId) {
      dispatch(getZoneByAreaAnimal(selectedAreaId))
    }
  }, [selectedAreaId])

  const handleSelectAreaChange = (value) => {
    setSelectedAreaId(value)
  }

  const onFinish = (values) => {
    const finalValues = {
      ...values,
      status: 1,
    }
    console.log(finalValues)
    dispatch(createField(finalValues))
    closeModal()

    window.location.reload();
  }

  return (
    <>
      <Modal
        title="Tạo chuồng"
        open={isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button form="createAnimalGroup" type="dashed" htmlType="reset">
            Làm mới
          </Button>,
          <Button
            form="createAnimalGroup"
            type="primary"
            danger
            onClick={closeModal}
          >
            Huỷ
          </Button>,
          <Button form="createAnimalGroup" type="primary" htmlType="submit">
            Hoàn thành
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-animal-group"
          id="createAnimalGroup"
          onFinish={onFinish}
        >
          <div className="form-left">
            {/*  Name */}
            <Form.Item
              label="Tên chuồng"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên chuồng',
                },
              ]}
            >
              <Input placeholder="Nhập tên chuồng" />
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
                  Array.isArray(dataZoneAnimal)
                    ? dataZoneAnimal.map((item) => ({
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
export default FirstStepAddAnimalGroup
