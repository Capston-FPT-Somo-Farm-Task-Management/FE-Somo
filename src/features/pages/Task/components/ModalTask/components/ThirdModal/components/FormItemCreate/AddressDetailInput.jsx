import { Form, Input } from "antd";
import React from "react";

function AddressDetailInput({ addressDetail, setAddressDetail }) {
  return (
    <Form.Item
      label="Vị trí cụ thể"
      name="addressDetail"
      required
      rules={[
        {
          required: true,
          message: "Vui lòng nhập vị trí cụ thể",
        },
      ]}
    >
      <Input
        placeholder="Nhập vị trí cụ thể"
        value={addressDetail}
        onChange={(e) => setAddressDetail(e.target.value)}
      />
    </Form.Item>
  );
}

export default AddressDetailInput;
