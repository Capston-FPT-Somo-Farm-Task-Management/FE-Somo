import React, { useState } from "react";
import { Checkbox } from "antd";

const CheckParent = ({ onCheckChange }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    onCheckChange(isChecked ? 0 : 1); // Truyền số 0 hoặc 1 tùy thuộc vào trạng thái của checkbox
  };

  return (
    <div className="checkParent">
      <Checkbox checked={checked} onChange={handleChange}>
        Có ngày lặp lại
      </Checkbox>
    </div>
  );
};

export default CheckParent;
