import { DatePicker, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAreaActive } from "features/slice/area/areaSlice";
import { getZoneActive } from "features/slice/zone/zoneSlice";
import { getFieldByZone } from "features/slice/field/fieldByZoneSlice";
import { getEmployee } from "features/slice/employee/employeeSlice";
import { getTaskType } from "features/slice/task/taskTypeSlice";
import { getSupervisor } from "features/slice/supervisor/supervisorSlice";
import dayjs from "dayjs";
import MultiDatePicker from "react-multi-date-picker";
import TextArea from "antd/es/input/TextArea";
import { getMaterialActiveByFarmId } from "features/slice/material/materialActiveByFarmSlice";
import { getMemberById } from "features/slice/user/memberSlice";

function Other() {
  const [selectedAreaId, setSelectedAreaId] = useState(null);
  const [selectedZoneId, setSelectedZoneId] = useState(null);
  const [priorityValue, setPriorityValue] = useState("");
  const [description, setDescription] = useState("");
  const [employeesValue, setEmployeesValue] = useState(0);
  const [materialsValue, setMaterialsValue] = useState(0);
  const [remindValue, setRemindValue] = useState(0);
  const [repeatValue, setRepeatValue] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const member = useSelector((state) => state.member.data);

  const farmId = member.farmId;

  const area = useSelector((state) => state.area.data);

  const zone = useSelector((state) => state.zone.data);

  const fieldByZone = useSelector((state) => state.fieldByZone.data);
  const dataFieldByZone = fieldByZone.data;

  const taskType = useSelector((state) => state.taskType.data);

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
    dispatch(getMaterialActiveByFarmId(farmId));
  }, []);


  useEffect(() => {
    if (selectedAreaId) {
      dispatch(getZoneActive(selectedAreaId));
      form.setFieldsValue({
        zoneId: null,
        fieldId: null,
      });
    }
  }, [selectedAreaId]);

  useEffect(() => {
    if (selectedZoneId) {
      dispatch(getFieldByZone(selectedZoneId));
      form.setFieldsValue({
        fieldId: null,
      });
    }
  }, [selectedZoneId]);

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
      form={form}
    >
      <div className="form-left">
        <Form.Item
          label="Khu vực"
          required
          rules={[
            {
              required: true,
              message: "Vui lòng chọn khu vực",
            },
          ]}
          name="areaId"
        >
          <Select
            onChange={handleSelectAreaChange}
            placeholder="Chọn khu vực"
            options={
              area && area.data
                ? area.data.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))
                : null
            }
          />
        </Form.Item>
        <Form.Item
          label="Vùng"
          required
          rules={[
            {
              required: true,
              message: "Vui lòng chọn vùng",
            },
          ]}
          name="zoneId"
        >
          <Select
            onChange={handleSelectZoneChange}
            placeholder="Chọn vùng"
            options={
              zone && zone.data
                ? zone.data.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))
                : null
            }
          />
        </Form.Item>
        <Form.Item label="Địa điểm cụ thể" name="fieldId">
          <Select
            placeholder="Địa điểm cụ thể"
            options={dataFieldByZone?.map((item) => ({
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
              message: "Vui lòng chọn độ ưu tiên",
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
        <Form.Item
          label="Tên công việc"
          name="name"
          required
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên công việc",
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
              message: "Vui lòng chọn loại nhiệm vụ",
            },
          ]}
        >
          <Select
            placeholder="Chọn loại nhiệm vụ"
            options={taskType?.map((item) => ({
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
              message: "Vui lòng chọn người thực hiện",
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
              message: "Vui lòng chọn người giám sát",
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
              message: "Vui lòng chọn dụng cụ sử dụng",
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
            value={remindValue.toString()}
            onChange={(value) => setRemindValue(parseInt(value, 10))}
            placeholder="Không"
          >
            <Select.Option value="0">Không</Select.Option>
            <Select.Option value="5">Sau 5 phút</Select.Option>
            <Select.Option value="10">Sau 10 phút</Select.Option>
            <Select.Option value="15">Sau 15 phút</Select.Option>
            <Select.Option value="20">Sau 20 phút</Select.Option>
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

export default Other;
