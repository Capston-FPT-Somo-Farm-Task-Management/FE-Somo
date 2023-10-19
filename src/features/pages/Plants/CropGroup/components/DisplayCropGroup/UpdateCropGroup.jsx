import { Button, Form, Select, Input, InputNumber, Modal } from 'antd'
import { getAreaActive } from 'features/slice/area/areaSlice'
import { updateHabitantType } from 'features/slice/habitant/habitantTypeSlice'
import { getZoneByAreaPlant } from 'features/slice/zone/zonePlantSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const UpdateCropGroup = ({
  isModalOpen,
  closeModal,
  selectedData,
  loadData,
}) => {
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
    console.log(selectedData)
    setSelectedAreaId(value)
  }

  const onFinish = (values) => {
    const finalValues = {
      id: selectedData.id,
      name: values.name,
      status: 0,
      code: values.code,
      area: values.square,
      zoneId: values.zone.value,
    }
    dispatch(updateHabitantType(finalValues)).then(() => {
      loadData()
      setTimeout(() => {
        closeModal()
      }, 500)
    })
  }

  return (
    <>
      <Modal
        title="Cập nhật vườn"
        open={isModalOpen}
        closeIcon
        onCancel={closeModal}
        footer={[
          <Button
            form="updatePlantGroup"
            type="primary"
            htmlType="reset"
            danger
            onClick={closeModal}
          >
            Huỷ
          </Button>,
          <Button form="updatePlantGroup" type="primary" htmlType="submit">
            Cập nhật
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-animal"
          id="updatePlantGroup"
          onFinish={onFinish}
        >
          <div className="form-left">
            <Form.Item
              label="Mã vườn"
              initialValue={selectedData ? selectedData.code : ''}
              name="code"
            >
              <Input readOnly />
            </Form.Item>

            {/* Name Animal */}
            <Form.Item
              label="Tên vườn"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên vườn',
                },
              ]}
              initialValue={selectedData ? selectedData.name : ''}
              name="name"
            >
              <Input placeholder="Nhập tên vườn" />
            </Form.Item>

            {/* Area */}
            <Form.Item
              label="Diện tích vườn"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập diện tích vườn',
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
export default UpdateCropGroup
