import { Button, Form, Select, Input, InputNumber, Modal } from 'antd'
import { getAreaActive } from 'features/slice/area/areaSlice'
import { getZoneByAreaAnimal } from 'features/slice/zone/zoneAnimalSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const UpdateAnimalGroup = ({
  isModalOpen,
  closeModal,
  selectedData,
  onFinishUpdate,
}) => {
  const [selectedAreaId, setSelectedAreaId] = useState(null)

  const area = useSelector((state) => state.area.data)

  const zoneAnimal = useSelector((state) => state.zoneAnimal.data)
  const dataZoneAnimal = zoneAnimal.data

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAreaActive())
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
      id: selectedData.id,
      name: values.name,
      status: 1,
      code: values.code,
      area: values.square,
      zoneId: values.zone.value,
    }
    console.log(finalValues)
    onFinishUpdate(finalValues)
    closeModal()
  }

  return (
    <>
      <Modal
        title="Cập nhật chuồng"
        open={isModalOpen}
        closeIcon
        onCancel={closeModal}
        footer={[
          <Button
            form="updateAnimalGroup"
            type="primary"
            htmlType="reset"
            danger
            onClick={closeModal}
          >
            Huỷ
          </Button>,
          <Button form="updateAnimalGroup" type="primary" htmlType="submit">
            Cập nhật
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-animal"
          id="updateAnimalGroup"
          onFinish={onFinish}
        >
          <div className="form-left">
            {/* ID Animal */}
            <Form.Item
              label="Mã chuồng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã chuồng',
                },
              ]}
              initialValue={selectedData ? selectedData.code : ''}
              name="code"
            >
              <Input placeholder="Nhập mã chuồng" />
            </Form.Item>

            {/* Name Animal */}
            <Form.Item
              label="Tên chuồng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên chuồng',
                },
              ]}
              initialValue={selectedData ? selectedData.name : ''}
              name="name"
            >
              <Input placeholder="Nhập tên chuồng" />
            </Form.Item>

            {/* Area */}
            <Form.Item
              label="Diện tích chuồng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập diện tích chuồng',
                },
              ]}
              initialValue={selectedData ? selectedData.area : ''}
              name="square"
            >
              <InputNumber min={0} addonAfter="m2" />
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
export default UpdateAnimalGroup
