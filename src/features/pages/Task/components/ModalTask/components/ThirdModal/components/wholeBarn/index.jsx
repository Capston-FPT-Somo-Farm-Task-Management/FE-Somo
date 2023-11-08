import React from "react";
import { DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import MultiDatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

function WholeBarn({
  onFinish,
  handleSelectAreaChange,
  handleSelectZoneChange,
  handleSelectFieldChange,
  handlePriorityChange,
  handleSelectStartDate,
  handleSelectEndDate,
  handleDescriptionChange,
  handleTaskTypeChange,
  handleEmployeeChange,
  handleMaterialChange,
  handleSelectRemind,
  handleSelectRepeat,
  handleOverallEfforMinutes,
  handleOverallEffortHour,
  form,
  area,
  zoneAnimal,
  fieldByZone,
  priorityValue,
  description,
  overallEfforMinutes,
  overallEffortHour,
  dataTaskTypeLivestock,
  employeesValue,
  dataEmployee,
  supervisor,
  materialsValue,
  dataMaterial,
  remindValue,
  repeatValue,
  disabledDate,
  startDate,
  endDate
}) {
  const { TextArea } = Input;

  return (
    <Form
      layout="vertical"
      className="task-form"
      onFinish={onFinish}
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
              zoneAnimal && zoneAnimal.data
                ? zoneAnimal.data.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))
                : null
            }
          />
        </Form.Item>
        <Form.Item
          label="Chuồng"
          name="fieldId"
          required
          rules={[
            {
              required: true,
              message: "Vui lòng chọn chuồng",
            },
          ]}
        >
          <Select
            onChange={handleSelectFieldChange}
            placeholder="Chọn chuồng"
            options={
              fieldByZone && fieldByZone.data
                ? fieldByZone.data.map((item) => ({
                    label: item.nameCode,
                    value: item.id,
                  }))
                : null
            }
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
            onChange={handlePriorityChange}
            placeholder="Chọn độ ưu tiên"
          >
            <Select.Option value="Thấp">Thấp</Select.Option>
            <Select.Option value="Trung bình">Trung bình</Select.Option>
            <Select.Option value="Cao">Cao</Select.Option>
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
            format="HH:mm DD-MM-YYYY"
            disabledDate={disabledDate}
            showTime={{
              defaultValue: dayjs("00:00", "HH:mm"),
              format: "HH:mm",
            }}
            showSecond="false"
            onChange={handleSelectStartDate}
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
            format="HH:mm DD-MM-YYYY"
            disabledDate={disabledDate}
            showTime={{
              defaultValue: dayjs("00:00", "HH:mm"),
              format: "HH:mm",
            }}
            showSecond="false"
            onChange={handleSelectEndDate}
            disabled={!startDate}
          />
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <TextArea
            value={description}
            onChange={handleDescriptionChange}
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
          label="Loại công việc"
          name="taskTypeId"
          required
          rules={[
            {
              required: true,
              message: "Vui lòng chọn loại công việc",
            },
          ]}
        >
          <Select
            placeholder="Chọn loại công việc"
            options={dataTaskTypeLivestock?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            onChange={handleTaskTypeChange}
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
            options={
              supervisor && supervisor.data
                ? supervisor.data.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))
                : null
            }
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
            onChange={handleEmployeeChange}
            placeholder="Chọn người thực hiện"
            options={
              dataEmployee && dataEmployee.data
                ? dataEmployee.data.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))
                : null
            }
          />
        </Form.Item>
        <Form.Item
          label="Thời gian làm việc phải bỏ ra"
          style={{ marginBottom: 0 }}
          required
          rules={[
                {
                  required: true,
                  message: "Vui lòng chọn thời gian làm việc phải bỏ ra",
                },
              ]}
        >
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <Form.Item
              name="overallEffortHour"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn giờ làm việc",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Select
                placeholder="Chọn giờ"
                value={overallEffortHour}
                onChange={handleOverallEffortHour}
              >
                {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                  <Select.Option key={hour} value={hour.toString()}>
                    {hour < 10 ? `0${hour}` : hour}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="overallEfforMinutes"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn phút làm việc",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Select
                placeholder="Chọn phút"
                value={overallEfforMinutes}
                onChange={handleOverallEfforMinutes}
              >
                {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                  <Select.Option key={minute} value={minute.toString()}>
                    {minute < 10 ? `0${minute}` : minute}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item
          label="Dụng cụ"
          name="materialIds"
        >
          <Select
            placeholder="Chọn dụng cụ"
            mode="multiple"
            value={materialsValue}
            onChange={handleMaterialChange}
            options={dataMaterial?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </Form.Item>
        <Form.Item label="Nhắc lại" name="remind">
          <Select
            value={remindValue.toString()}
            onChange={handleSelectRemind}
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
            onChange={handleSelectRepeat}
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
            <MultiDatePicker
              style={{
                height: "32px",
              }}
              placeholder="Chọn ngày lặp lại"
              multiple
              format="YYYY-MM-DD"
              disabled={!endDate || !endDate.isValid()}
              minDate={
                new Date(new Date(endDate).getTime() + 24 * 60 * 60 * 1000)
              }
              plugins={[<DatePanel />]}
            />
          </Form.Item>
        )}
      </div>
    </Form>
  );
}

export default WholeBarn;
