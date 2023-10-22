import { Button, Form, Input, InputNumber, Modal, Select } from 'antd'
import { getAreaActiveByFarmId } from 'features/slice/area/areaByFarm'
import { getZoneType } from 'features/slice/zone/zoneTypeSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const FormAddZone = ({ isModalOpen, closeModal, onFinishCreate, farmId }) => {
  const areaByFarm = useSelector((state) => state.areaByFarm.data)
  const zoneType = useSelector((state) => state.zoneType.data)
  console.log(areaByFarm)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAreaActiveByFarmId(farmId))
    dispatch(getZoneType())
  }, [dispatch])

  const onFinish = (values) => {
    onFinishCreate(values)
    closeModal()
  }
  return (
    <>
      <Modal
        title="Thêm vùng"
        open={isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button form="createZone" type="dashed" htmlType="reset">
            Làm mới
          </Button>,
          <Button form="createZone" type="primary" danger onClick={closeModal}>
            Huỷ
          </Button>,
          <Button form="createZone" type="primary" htmlType="submit">
            Hoàn thành
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-animal"
          id="createZone"
          onFinish={onFinish}
        >
          <div className="form-left">
            {/* Name Animal */}
            <Form.Item
              label="Tên vùng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên vùng',
                },
              ]}
              name="name"
            >
              <Input placeholder="Nhập tên vùng" />
            </Form.Item>

            <Form.Item
              label="Mã vùng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã vùng',
                },
              ]}
              name="code"
            >
              <Input placeholder="Nhập mã vùng" />
            </Form.Item>

            {/* Area */}
            <Form.Item
              label="Diện tích vùng (m2)"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập cân nặng vật nuôi',
                },
              ]}
              name="farmArea"
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
export default FormAddZone
