import { Form, Input } from "antd";
import React from "react";

function NameTaskUpdate({ editingTask }) {
  return (
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
      initialValue={editingTask ? editingTask.name : ""}
    >
      <Input placeholder="Nhập tên công việc" />
    </Form.Item>
  );
}

export default NameTaskUpdate;
