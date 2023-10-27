import React, { useEffect, useState } from 'react'
import { DatePicker, Form, Input, Select } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { getAreaActive } from 'features/slice/area/areaSlice'
import { getZoneByAreaPlant } from 'features/slice/zone/zonePlantSlice'
import { getFieldByZone } from 'features/slice/field/fieldByZoneSlice'
import { getTaskTypePlant } from 'features/slice/task/taskTypePlantSlice'
import { getSupervisor } from 'features/slice/supervisor/supervisorSlice'
import { getEmployee } from 'features/slice/employee/employeeSlice'
import { getMaterial } from 'features/slice/material/materialSlice'
import { getPlantActive } from 'features/slice/plant/plantSlice'
import { createTask } from 'features/slice/task/taskSlice'
import dayjs from 'dayjs'
import MultiDatePicker from 'react-multi-date-picker'

function SpecificPlant() {
  const [selectedAreaId, setSelectedAreaId] = useState(null)
  const [selectedZoneId, setSelectedZoneId] = useState(null)
  const [employeesValue, setEmployeesValue] = useState(0)
  const [materialsValue, setMaterialsValue] = useState(0)
  const [priorityValue, setPriorityValue] = useState('')
  const [remindValue, setRemindValue] = useState(0)
  const [repeatValue, setRepeatValue] = useState(false)
  const [startDate, setStartDate] = useState()
  const [description, setDescription] = useState('')

  const area = useSelector((state) => state.area.data)

  const zonePlant = useSelector((state) => state.zonePlant.data)
  const dataPlantZone = zonePlant.data

  const plant = useSelector((state) => state.plant.data)
  const dataPlant = plant.data

  const fieldByZone = useSelector((state) => state.fieldByZone.data)
  const dataFieldByZone = fieldByZone.data

  const taskTypePlant = useSelector((state) => state.taskTypePlant.data)
  const dataTaskTypePlant = taskTypePlant.data

  const supervisor = useSelector((state) => state.supervisor.data)
  const dataSupervisor = supervisor.data

  console.log(dataSupervisor)

  const dataEmployee = useSelector((state) => state.employee.data)

  const material = useSelector((state) => state.material.data)
  const dataMaterial = material.data

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAreaActive())
    dispatch(getTaskTypePlant())
    dispatch(getPlantActive())
    dispatch(getSupervisor())
    dispatch(getEmployee())
    dispatch(getMaterial())
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

  const transformData = (originalData) => {
    const transformedData = {
      employeeIds: originalData.employeeIds,
      materialIds: originalData.materialIds,
      dates: originalData.dates,
      farmTask: {
        name: originalData.name,
        startDate: originalData.startDate,
        endDate: originalData.endDate,
        description: originalData.description,
        priority: originalData.priority,
        isRepeat: originalData.isRepeat,
        suppervisorId: originalData.suppervisorId,
        fieldId: originalData.fieldId,
        taskTypeId: originalData.taskTypeId,
        managerId: originalData.managerId,
        otherId: originalData.otherId,
        plantId: originalData.plantId,
        liveStockId: originalData.liveStockId,
        remind: originalData.remind,
      },
    }

    return transformedData
  }

  const onFinish = (values) => {
    const startDateFormatted = dayjs(startDate).format(
      'YYYY-MM-DD[T]HH:mm:ss.SSS'
    )

    const startTime = dayjs(startDate).format('HH:mm:ss.SSS')

    const selectedDates = values.dates.map((date) =>
      dayjs(date).format('YYYY-MM-DD')
    )

    const combinedDates = selectedDates.map((date) => `${date}T${startTime}`)

    const finalValues = {
      ...values,
      startDate: startDateFormatted,
      endDate: dayjs(values.endDate).format('YYYY-MM-DD[T]HH:mm:ss.SSS'),
      dates: combinedDates,
      // employeeIds: employeesValue,
      priority: priorityValue,
      remind: remindValue,
      isRepeat: repeatValue,
      description: description,
      suppervisorId: 11,
      managerId: 5,
      otherId: 0,
    }

    const transformedValues = transformData(finalValues)

    dispatch(createTask(transformedValues))
  }

  const disabledDate = (current) => {
    return current && current < dayjs().startOf('day')
  }

  const { TextArea } = Input

  return (
    <Form
      layout="vertical"
      className="task-specific-plant"
      onFinish={onFinish}
      id="createTask"
    >
      <div className="form-left">
        <Form.Item
          label="Khu vực"
          required
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn khu vực',
            },
          ]}
          name="area"
        >
          <Select
            onChange={handleSelectAreaChange}
            placeholder="Chọn khu vực"
            options={area.data?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="Vùng"
          required
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn vùng',
            },
          ]}
          name="zone"
        >
          <Select
            onChange={handleSelectZoneChange}
            placeholder="Chọn vùng"
            options={dataPlantZone?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Vườn"
          name="fieldId"
          required
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn vườn',
            },
          ]}
        >
          <Select
            placeholder="Chọn vườn"
            options={dataFieldByZone?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="Mã cây trồng"
          name="plantId"
          required
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mã cây trồng',
            },
          ]}
        >
          <Select
            placeholder="Chọn mã cây trồng"
            options={dataPlant?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="Độ ưu tiên"
          name="priority"
          required
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn độ ưu tiên',
            },
          ]}
        >
          <Select
            value={priorityValue}
            onChange={(value) => setPriorityValue(value)}
            placeholder="Chọn độ ưu tiên"
          >
            <Select.Option value="Thấp nhất">Thấp nhất</Select.Option>
            <Select.Option value="Thấp">Thấp</Select.Option>
            <Select.Option value="Trung bình">Trung bình</Select.Option>
            <Select.Option value="Cao">Cao</Select.Option>
            <Select.Option value="Cao nhất">Cao nhất</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Chọn thời gian bắt đầu"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn thời gian bắt đầu',
            },
          ]}
          name="startDate"
        >
          <DatePicker
            placeholder="Chọn thời gian bắt đầu"
            format="YYYY-MM-DD[T]HH:mm:ss.SSS"
            disabledDate={disabledDate}
            showTime={{
              defaultValue: dayjs('00:00:00', 'HH:mm:ss'),
            }}
          />
        </Form.Item>
        <Form.Item
          label="Chọn thời gian kết thúc"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn khoảng thời gian kết thúc',
            },
          ]}
          name="endDate"
        >
          <DatePicker
            placeholder="Chọn thời gian kết thúc"
            format="YYYY-MM-DD[T]HH:mm:ss.SSS"
            disabledDate={disabledDate}
            showTime={{
              defaultValue: dayjs('00:00:00', 'HH:mm:ss'),
            }}
          />
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="Thêm mô tả chi tiết cho công việc"
          />
        </Form.Item>
      </div>
      <div className="form-right">
        <Form.Item
          label="Tên công việc"
          name="name"
          required
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên công việc',
            },
          ]}
        >
          <Input placeholder="Nhập tên công việc" />
        </Form.Item>
        <Form.Item
          label="Loại nhiệm vụ"
          name="taskTypeId"
          required
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn loại nhiệm vụ',
            },
          ]}
        >
          <Select
            placeholder="Chọn loại nhiệm vụ"
            options={dataTaskTypePlant?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="Người thực hiện"
          name="employeeIds"
          required
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn người thực hiện',
            },
          ]}
        >
          <Select
            mode="multiple"
            value={employeesValue}
            onChange={(value) => setEmployeesValue(value)}
            placeholder="Chọn người thực hiện"
            options={dataEmployee?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="Người giám sát"
          name="suppervisorId"
          required
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn người giám sát',
            },
          ]}
        >
          <Select
            placeholder="Chọn người giám sát"
            options={dataSupervisor?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Dụng cụ"
          name="materialIds"
          required
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn dụng cụ sử dụng',
            },
          ]}
        >
          <Select
            placeholder="Chọn dụng cụ"
            mode="multiple"
            value={materialsValue}
            onChange={(value) => setMaterialsValue(value)}
            options={dataMaterial?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </Form.Item>
        <Form.Item label="Nhắc lại" name="remind">
          <Select
            value={remindValue}
            onChange={(value) => setRemindValue(value)}
            placeholder="Không"
          >
            <Select.Option value="0">0</Select.Option>
            <Select.Option value="5">5</Select.Option>
            <Select.Option value="10">10</Select.Option>
            <Select.Option value="15">15</Select.Option>
            <Select.Option value="20">20</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Lặp lại" name="isRepeat">
          <Select
            value={repeatValue}
            onChange={(value) => setRepeatValue(value === 'Có')}
            placeholder="Không"
          >
            <Select.Option value="Không">Không</Select.Option>
            <Select.Option value="Có">Có</Select.Option>
          </Select>
        </Form.Item>

        {repeatValue && (
          <Form.Item
            label="Lặp những ngày"
            name="dates"
            rules={[{ required: true }]}
          >
            <MultiDatePicker multiple format="YYYY-MM-DD" />
          </Form.Item>
        )}
      </div>
    </Form>
  )
}

export default SpecificPlant
