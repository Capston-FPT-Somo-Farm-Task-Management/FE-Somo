import { Button, Form, Input, InputNumber, Modal, Radio, Select } from 'antd'
import { updateAnimal } from 'features/slice/animal/animalSlice'
import { getAnimalType } from 'features/slice/animal/animalTypeSlice'
import { getAreaActive } from 'features/slice/area/areaSlice'
import { getFieldByZone } from 'features/slice/field/fieldByZoneSlice'
import { getZoneByAreaAnimal } from 'features/slice/zone/zoneAnimalSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const UpdateAnimal = ({ isModalOpen, closeModal, selectedData, loadData }) => {
  const [selectedAreaId, setSelectedAreaId] = useState(null)
  const [selectedZoneId, setSelectedZoneId] = useState(null)
  const [gender, setGender] = useState(true)

  const area = useSelector((state) => state.area.data)

  const zoneAnimal = useSelector((state) => state.zoneAnimal.data)
  const dataZoneAnimal = zoneAnimal.data

  const fieldByZone = useSelector((state) => state.fieldByZone.data)
  const dataFieldByZone = fieldByZone.data

  const animalType = useSelector((state) => state.animalType.data)
  const dataAnimalType = animalType.data

  const dispatch = useDispatch()

  useEffect(() => {
    if (isModalOpen) {
      if (selectedData) {
        setGender(selectedData.gender)
      }
    }
  }, [isModalOpen, selectedData])

  useEffect(() => {
    dispatch(getAreaActive())
    dispatch(getAnimalType())
  }, [])

  useEffect(() => {
    if (selectedAreaId) {
      dispatch(getZoneByAreaAnimal(selectedAreaId))
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
      weight: values.weight,
      gender: values.gender,
      habitantTypeId: values.habitantType.value,
      fieldId: values.field.value,
    }
    console.log(finalValues)
    dispatch(updateAnimal(finalValues)).then(() => {
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
            form="updateAnimal"
            type="primary"
            htmlType="reset"
            danger
            onClick={closeModal}
          >
            Huỷ
          </Button>,
          <Button form="updateAnimal" type="primary" htmlType="submit">
            Cập nhật
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-animal"
          id="updateAnimal"
          onFinish={onFinish}
        >
          <div className="form-left">
            {/* ID Animal */}
            <Form.Item
              label="Mã vật nuôi"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã vật nuôi',
                },
              ]}
              initialValue={selectedData ? selectedData.externalId : ''}
              name="externalId"
            >
              <Input placeholder="Nhập mã vật nuôi" />
            </Form.Item>

            {/* Name Animal */}
            <Form.Item
              label="Tên vật nuôi"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên vật nuôi',
                },
              ]}
              initialValue={selectedData ? selectedData.name : ''}
              name="name"
            >
              <Input placeholder="Nhập tên vật nuôi" />
            </Form.Item>

            {/* Animal Type */}
            <Form.Item
              label="Loại vật nuôi"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn loại vật nuôi',
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
                placeholder="Chọn loại vật nuôi"
                options={dataAnimalType?.map((type) => ({
                  label: type.name,
                  value: type.id,
                }))}
              ></Select>
            </Form.Item>

            {/* Weight */}
            <Form.Item
              label="Cân nặng vật nuôi (kg)"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập cân nặng vật nuôi',
                },
              ]}
              initialValue={selectedData ? selectedData.weight : ''}
              name="weight"
            >
              <InputNumber min={0} />
            </Form.Item>

            <Form.Item
              label="Giới tính"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn giới tính vật nuôi',
                },
              ]}
              name="gender"
              initialValue={gender}
            >
              <Radio.Group>
                <Radio value={true}>Đực/Trống</Radio>
                <Radio value={false}>Cái/Mái</Radio>
              </Radio.Group>
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
export default UpdateAnimal
