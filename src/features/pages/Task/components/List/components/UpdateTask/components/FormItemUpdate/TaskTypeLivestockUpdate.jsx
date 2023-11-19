import { Form, Select } from "antd";
import React from "react";

function TaskTypeLivestockUpdate({
  dataTaskTypeLivestock,
  handleTaskTypeChange,
  editingTask,
  isDraft
}) {
  return (
    <Form.Item
      label="Loại công việc"
      name="taskTypeId"
      required
      rules={[
        {
          required: !isDraft,
          message: "Vui lòng chọn loại công việc",
        },
      ]}
      initialValue={editingTask ? editingTask.taskTypeId : 0}
    >
      <Select
        placeholder="Chọn loại công việc"
        options={
          dataTaskTypeLivestock && dataTaskTypeLivestock
            ? dataTaskTypeLivestock.map((item) => ({
                label: item.name,
                value: item.id,
              }))
            : null
        }
        onChange={handleTaskTypeChange}
      />
    </Form.Item>
  );
}

export default TaskTypeLivestockUpdate;
