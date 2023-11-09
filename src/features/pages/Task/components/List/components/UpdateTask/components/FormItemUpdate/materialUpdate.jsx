import { Form, Select } from "antd";
import React from "react";

function MaterialUpdate({
  materialsValue,
  handleMaterialChange,
  dataMaterial,
  editingTask,
}) {
  return (
    <Form.Item
      label="Dụng cụ"
      name="materialIds"
      initialValue={
        editingTask
          ? {
              label: editingTask.materialName,
              value: editingTask.materialIds,
            }
          : ""
      }
    >
      <Select
        placeholder="Chọn dụng cụ"
        mode="multiple"
        value={materialsValue}
        onChange={handleMaterialChange}
        options={
          dataMaterial && dataMaterial
            ? dataMaterial.map((item) => ({
                label: item.name,
                value: item.id,
              }))
            : null
        }
      />
    </Form.Item>
  );
}

export default MaterialUpdate;
