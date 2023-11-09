import { Form, Select } from "antd";
import React from "react";

function RepeatUpdate({ repeatValue, handleSelectRepeat, editingTask }) {
  return (
    <Form.Item
      label="Lặp lại"
      name="isRepeat"
      initialValue={editingTask ? editingTask.isRepeat : ""}
    >
      <Select
        value={repeatValue}
        onChange={handleSelectRepeat}
        placeholder="Không"
      >
        <Select.Option value="Không">Không</Select.Option>
        <Select.Option value="Có">Có</Select.Option>
      </Select>
    </Form.Item>
  );
}

export default RepeatUpdate;
