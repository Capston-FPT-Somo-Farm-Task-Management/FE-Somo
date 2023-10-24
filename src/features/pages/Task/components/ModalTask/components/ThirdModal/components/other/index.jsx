import { DatePicker, Form, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getAreaActive } from 'features/slice/area/areaSlice';
import { getZoneActive } from 'features/slice/zone/zoneSlice';
import { getFieldByZone } from 'features/slice/field/fieldByZoneSlice';
import { getTaskType } from 'features/slice/task/taskType';
import { getEmployee } from 'features/slice/employee/employeeSlice';
import { getSupervisor } from 'features/slice/supervisor/supervisorSlice';
import { getMaterial } from 'features/slice/material/materialSlice';
import dayjs from 'dayjs';
import MultiDatePicker from "react-multi-date-picker";
import TextArea from 'antd/es/input/TextArea';


function Other() {
  const [selectedAreaId, setSelectedAreaId] = useState(null);
  const [selectedZoneId, setSelectedZoneId] = useState(null);
  const [priorityValue, setPriorityValue] = useState("");
  const [description, setDescription] = useState("");
  const [employeesValue, setEmployeesValue] = useState(0);
  const [materialsValue, setMaterialsValue] = useState(0);
  const [remindValue, setRemindValue] = useState(0);
  const [repeatValue, setRepeatValue] = useState(false);


  const dispatch = useDispatch();

  const area = useSelector((state) => state.area.data);

  const zone = useSelector((state) => state.zone.data);
  const dataZone = zone.data;

  const fieldByZone = useSelector((state) => state.fieldByZone.data);
  const dataFieldByZone = fieldByZone.data;

  const taskType = useSelector(
    (state) => state.taskType.data
  );

  const dataEmployee = useSelector((state) => state.employee.data);

  const supervisor = useSelector((state) => state.supervisor.data);
  const dataSupervisor = supervisor.data;

  const material = useSelector((state) => state.material.data);
  const dataMaterial = material.data;

  useEffect(() => {
    dispatch(getAreaActive());
    dispatch(getTaskType());
    dispatch(getEmployee());
    dispatch(getSupervisor());
    dispatch(getMaterial());
  }, []);

  useEffect(() => {
    if (selectedAreaId) {
      dispatch(getZoneActive(selectedAreaId));
    }
    if (selectedZoneId) {
      dispatch(getFieldByZone(selectedZoneId));
    }
  }, [selectedAreaId, selectedZoneId]);

  const handleSelectAreaChange = (value) => {
    setSelectedAreaId(value);
  };
  const handleSelectZoneChange = (value) => {
    setSelectedZoneId(value);
  };

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };


  return (
    <Form
      layout="vertical"
      className="task-whole-garden"
      // onFinish={onFinish}
      id="createTask"
    >
      <div className="form-left">
        <Form.Item
          label="Khu vực"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn khu vực",
            },
          ]}
          required
        >
          <Select
            onChange={handleSelectAreaChange}
            options={area.data?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="Vùng"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn vùng",
            },
          ]}
          required
        >
          <Select
            onChange={handleSelectZoneChange}
            options={dataZone?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </Form.Item>
        <Form.Item label="Vườn" name="fieldId">
          <Select
            options={dataFieldByZone?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </Form.Item>
        <Form.Item label="Độ ưu tiên" required>
          <Select
            value={priorityValue}
            onChange={(value) => setPriorityValue(value)}
          >
            <Select.Option value="lowest">Thấp nhất</Select.Option>
            <Select.Option value="low">Thấp</Select.Option>
            <Select.Option value="medium">Trung bình</Select.Option>
            <Select.Option value="high">Cao</Select.Option>
            <Select.Option value="highest">Cao nhất</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Chọn thời gian bắt đầu"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn thời gian bắt đầu",
            },
          ]}
          name="startDate"
        >
          <DatePicker
            placeholder="Chọn thời gian bắt đầu"
            format="YYYY-MM-DD[T]HH:mm:ss.SSS"
            disabledDate={disabledDate}
            showTime={{
              defaultValue: dayjs("00:00:00", "HH:mm:ss"),
            }}
          />
        </Form.Item>
        <Form.Item
          label="Chọn thời gian kết thúc"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn khoảng thời gian kết thúc",
            },
          ]}
          name="endDate"
        >
          <DatePicker
            placeholder="Chọn thời gian kết thúc"
            format="YYYY-MM-DD[T]HH:mm:ss.SSS"
            disabledDate={disabledDate}
            showTime={{
              defaultValue: dayjs("00:00:00", "HH:mm:ss"),
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
        <Form.Item label="Tên công việc" required>
          <Input placeholder="Nhập tên công việc" />
        </Form.Item>
        <Form.Item label="Loại nhiệm vụ" required>
          <Select
            options={taskType?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </Form.Item>
        <Form.Item label="Người thực hiện" name="employeeIds" required>
          <Select
            mode="multiple"
            value={employeesValue}
            onChange={(value) => setEmployeesValue(value)}
            options={dataEmployee?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </Form.Item>
        <Form.Item label="Người giám sát" name="receiverId" required>
          <Select
            options={dataSupervisor?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </Form.Item>
        <Form.Item label="Dụng cụ">
          <Select
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
            onChange={(value) => setRepeatValue(value === "Có")}
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
  );
}

export default Other