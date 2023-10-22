import { Button, Form, Input, InputNumber, Modal, Select } from 'antd'
import { getAreaActiveByFarmId } from 'features/slice/area/areaByFarm'
import { getZoneType } from 'features/slice/zone/zoneTypeSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const UpdateZone = ({
  isModalOpen,
  closeModal,
  selectedData,
  onFinishUpdate,
  farmId,
}) => {
  const areaByFarm = useSelector((state) => state.areaByFarm.data)
  const zoneType = useSelector((state) => state.zoneType.data)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAreaActiveByFarmId(farmId))
    dispatch(getZoneType())
  }, [dispatch])

  const onFinish = (values) => {
    const finalValues = {
      id: selectedData.id,
      ...values,
    }
    onFinishUpdate(finalValues)
    closeModal()
  }

  return (
    <>
      <Modal
        title="Cập nhật vùng"
        open={isModalOpen}
        closeIcon
        onCancel={closeModal}
        footer={[
          <Button
            form="updateZone"
            type="primary"
            htmlType="reset"
            danger
            onClick={closeModal}
          >
            Huỷ
          </Button>,
          <Button form="updateZone" type="primary" htmlType="submit">
            Cập nhật
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-animal"
          id="updateZone"
          onFinish={onFinish}
        >
          {/* Zone Name */}
          <div className="form-left">
            <Form.Item
              label="Tên vùng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên vùng',
                },
              ]}
              name="name"
              initialValue={selectedData ? selectedData.name : ''}
            >
              <Input placeholder="Nhập tên vùng" />
            </Form.Item>

            {/* Area Code */}
            <Form.Item
              label="Mã vùng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã vùng',
                },
              ]}
              name="code"
              initialValue={selectedData ? selectedData.code : ''}
            >
              <Input placeholder="Nhập mã vùng" />
            </Form.Item>

            <Form.Item
              label="Diện tích (m2)"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập diện tích khu vực',
                },
              ]}
              name="farmArea"
              initialValue={selectedData ? selectedData.farmArea : ''}
            >
              <InputNumber min={0} addonAfter="m2" />
            </Form.Item>
          </div>

          <div className="form-right">
            <Form.Item
              label="Loại vùng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn loại vùng',
                },
              ]}
              name="zoneTypeId"
              initialValue={selectedData ? selectedData.zoneTypeId : ''}
            >
              <Select
                placeholder="Chọn loại vùng"
                options={zoneType?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              ></Select>
            </Form.Item>

            {/* Area */}
            <Form.Item
              label="Khu vực"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn khu vực',
                },
              ]}
              name="areaId"
              initialValue={selectedData ? selectedData.areaId : ''}
            >
              <Select
                placeholder="Chọn khu vực"
                options={areaByFarm?.data?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              ></Select>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  )
}
export default UpdateZone
