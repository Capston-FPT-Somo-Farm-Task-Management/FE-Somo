import { Button, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

function AddSubTask({
  addSubtaskVisible,
  closeAddSubtaskModal,
  form,
  handleAddSubTask,
  availableEmployees,
  description,
  handleDescription,
}) {
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
