import { Form, Select } from "antd";
import React from "react";

function PlantUpdate({ dataPlant, editingTask }) {
  console.log(editingTask);
  console.log(dataPlant);
  const plantItem =
    dataPlant &&
    dataPlant.find((item) => item.externalId === editingTask.externalId);

  const plantIdValue = plantItem ? plantItem.id : 1; // đang không biết sao mà nó nhận plantItem bị false
  console.log(plantIdValue);
  return (
    <Form.Item
      label="Mã cây trồng"
      name="plantId"
      required
      rules={[
        {
          required: true,
          message: "Vui lòng nhập mã cây trồng",
        },
      ]}
      initialValue={
        editingTask 
          ? {
              label: editingTask.externalId,
              value: plantIdValue,
            }
          : ""
      }
    >
      <Select
        placeholder="Chọn mã cây trồng"
        options={dataPlant?.map((item) => ({
          label: item.externalId,
          value: item.id,
        }))}
      />
    </Form.Item>
  );
}

export default PlantUpdate;
