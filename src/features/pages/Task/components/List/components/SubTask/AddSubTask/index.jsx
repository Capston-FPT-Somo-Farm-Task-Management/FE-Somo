import { Button, DatePicker, Form, Input, Modal, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import React from "react";

function AddSubTask({
  addSubtaskVisible,
  closeAddSubtaskModal,
  form,
  handleAddSubTask,
  availableEmployees,
  description,
  handleDescription,
  editingTask,
  handleSelectStartDay,
  handleSelectEndDay
}) {
  const disabledDate = (current) => {
    if (!editingTask.startDate && !editingTask.endDate) {
      return false;
    }

    // Disable dates in the past relative to editingTask.startDate
    if (editingTask.startDate && editingTask.endDate) {
      const endDatePlusOne = dayjs(editingTask.endDate).add(1, "day");
      return (
        current < dayjs(editingTask.startDate).startOf("day") ||
        current > endDatePlusOne.startOf("day")
      );
    }
    return false;
  };

  return (
    <Modal
      title="Thêm công việc con"
      visible={addSubtaskVisible}
      onCancel={closeAddSubtaskModal}
      footer={[
        <Button form="createSubTask" type="dashed" htmlType="reset">
          Làm mới
        </Button>,
        <Button
          form="createSubTask"
          type="primary"
          danger
          onClick={closeAddSubtaskModal}
        >
          Huỷ
        </Button>,
        <Button form="createSubTask" type="primary" htmlType="submit">
          Hoàn thành
        </Button>,
      ]}
    >
      <Form
        layout="vertical"
        form={form}
        id="createSubTask"
        onFinish={handleAddSubTask}
      >
        <Form.Item
          label="Tên công việc con"
          name="name"
          required
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên công việc con",
            },
          ]}
        >
          <Input placeholder="Nhập tên công việc con" />
        </Form.Item>
        <Form.Item
          label="Người thực hiện"
          name="employeeId"
          required
          rules={[
            {
              required: true,
              message: "Vui lòng chọn người thực hiện",
            },
          ]}
        >
          <Select
            placeholder="Chọn người thực hiện"
            options={
              availableEmployees && availableEmployees.data
                ? availableEmployees.data.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))
                : null
            }
          />
        </Form.Item>
        <Space nowrap>
          <Form.Item
            label="Chọn thời gian bắt đầu"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ngày bắt đầu",
              },
            ]}
            name="startDay"
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
              onChange={handleSelectStartDay}
            />
          </Form.Item>
          <Form.Item
            label="Chọn thời gian kết thúc"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ngày kết thúc",
              },
            ]}
            name="endDay"
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
              onChange={handleSelectEndDay}
              // disabled={!editingTask.startDate}
            />
          </Form.Item>
        </Space>
        <Form.Item label="Mô tả" name="description">
          <TextArea
            value={description}
            onChange={handleDescription}
            rows={5}
            placeholder="Thêm mô tả chi tiết cho công việc"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddSubTask;
