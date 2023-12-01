import { DatePicker } from "antd";
import React from "react";

function DateSelectionComp({
  selectedDate,
  handleDateChange,
}) {
  return (
    <>
    <p>Xem theo ngày</p>
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        placeholder="Chọn ngày"
        format="DD-MM-YYYY"
        style={{width: "80%", marginBottom: "20px"}}
      />
    </>
  );
}

export default DateSelectionComp;
