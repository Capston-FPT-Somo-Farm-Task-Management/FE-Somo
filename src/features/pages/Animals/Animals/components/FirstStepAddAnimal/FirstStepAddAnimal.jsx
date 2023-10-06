import React, { useEffect, useState } from 'react'
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  Space,
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getAnimalType } from 'features/slice/animal/animalTypeSlice'
import { createAnimal } from 'features/slice/animal/animalSlice'
import { getFieldByZone } from 'features/slice/field/fieldByZoneSlice'
import { getAreas } from 'features/slice/area/areaSlice'
import { getZoneByAreaAnimal } from 'features/slice/zone/zoneAnimalSlice'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'
dayjs.extend(customParseFormat)

const FirstStepAddAnimal = ({ isModalOpen, closeModal }) => {
  const [selectedAreaId, setSelectedAreaId] = useState(null)
  const [selectedZoneId, setSelectedZoneId] = useState(null)

  const area = useSelector((state) => state.area.data)
  const zoneAnimal = useSelector((state) => state.zoneAnimal.data)
  const fieldByZone = useSelector((state) => state.fieldByZone.data)

  const animalType = useSelector((state) => state.animalType.data)
  const dataAnimalType = animalType.data

  const dataZoneAnimal = zoneAnimal.data
  const dataFieldByZone = fieldByZone.data

  console.log(dataFieldByZone);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAreas())
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

  const cancelModal = () => {
    closeModal()
  }

  const onFinish = (values) => {
    const finalValues = {
      ...values,
      dateOfBirth: dayjs(values.dateOfBirth).format(
        'YYYY-MM-DD[T]HH:mm:ss.SSS'
      ),
    }
    dispatch(createAnimal(finalValues))
    
    closeModal()

    window.location.reload();
  }

  const disabledDate = (current) => {
    return current && current > dayjs().endOf('day')
  }

  // const range = (start, end) => {
  //   const result = []
  //   for (let i = start; i < end; i++) {
  //     result.push(i)
  //   }
  //   return result
  // }

  // const disabledDateTime = () => ({
  //   disabledHours: () => range(0, 24).splice(4, 20),
  //   disabledMinutes: () => range(30, 60),
  //   disabledSeconds: () => [55, 56],
  // })

  return (
    <>
      <Modal
        title="Thêm mới vật nuôi"
        open={isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button form="createAnimal" type="dashed" htmlType="reset">
            Làm mới
          </Button>,
          <Button
            form="createAnimal"
            type="primary"
            danger
            onClick={cancelModal}
          >
            Huỷ
          </Button>,
          <Button form="createAnimal" type="primary" htmlType="submit">
            Hoàn thành
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-animal"
          id="createAnimal"
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
              name="habitantTypeId"
            >
              <Select
                placeholder="Chọn loại vật nuôi"
                options={dataAnimalType?.map((type) => ({
                  label: type.name,
                  value: type.id,
                }))}
              ></Select>
            </Form.Item>

            {/* Date of Birth */}
            <Form.Item
              label="Ngày sinh"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn ngày sinh của vật nuôi',
                },
              ]}
              name="dateOfBirth"
            >
              <DatePicker
                placeholder="Chọn ngày sinh"
                format="YYYY-MM-DD[T]HH:mm:ss.SSS"
                disabledDate={disabledDate}
                // disabledTime={disabledDateTime}
                showTime={{
                  defaultValue: dayjs('00:00:00', 'HH:mm:ss'),
                }}
              />
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
export default FirstStepAddAnimal
