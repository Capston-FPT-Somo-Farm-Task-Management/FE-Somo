import { Form, Select } from "antd";
import React from "react";

const IsImportantUpdate = ({
  editingTask,
  importantValue,
  handleSelectImportant,
}) => {
  return (
    <Form.Item label="Được từ chối nữa không?" name="isImportant">
      <Select
        value={importantValue}
        onChange={handleSelectImportant}
        placeholder="Được"
      >
        <Select.Option value={false}>Được</Select.Option>
        <Select.Option value={true}>Không</Select.Option>
      </Select>
    </Form.Item>
  );
};

export default IsImportantUpdate;
