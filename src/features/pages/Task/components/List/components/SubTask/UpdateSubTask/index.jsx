import { Button, DatePicker, Form, Input, Modal, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import React from "react";

function UpdateSubTask({
  editSubTaskModalVisible,
  closeEditSubTaskModal,
  handleUpdateSubTask,
  editingSubTask,
  description,
  handleDescription,
  editingTask
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
    <>
      {editSubTaskModalVisible && (
        <Modal
          title="Sửa công việc con"
          open={editSubTaskModalVisible}
          onCancel={closeEditSubTaskModal}
          footer={[
            <Button form="updateSubTask" type="primary" htmlType="submit">
              Lưu thay đổi
            </Button>,
            <Button type="primary" onClick={closeEditSubTaskModal}>
              Đóng
            </Button>,
          ]}
        >
          <Form
            layout="vertical"
            onFinish={(values) => {
              handleUpdateSubTask(
                editingSubTask.subtaskId,
                editingSubTask.employeeId,
                values.name,
                values.startDay,
                values.endDay,
                values.description
              );
            }}
            id="updateSubTask"
            key={editingSubTask ? editingSubTask.employeeId : "new"}
          >
            <Form.Item
              label="Tên công việc con"
              name="name"
              required
              initialValue={editingSubTask.name}
            >
              <Input placeholder="Nhập tên công việc con" />
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
                initialValue={
                  editingSubTask ? dayjs(editingSubTask.startDay) : null
                }
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
                  // onChange={handleSelectStartDate}
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
                initialValue={
                  editingSubTask ? dayjs(editingSubTask.endDay) : null
                }
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
                  // onChange={handleSelectEndDate}
                  // disabled={!editingTask.startDate}
                />
              </Form.Item>
            </Space>
            <Form.Item
              label="Mô tả"
              name="description"
              initialValue={description}
            >
              <TextArea
                value={description}
                onChange={handleDescription}
                rows={5}
                placeholder="Thêm mô tả chi tiết cho công việc"
              />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
}

export default UpdateSubTask;
