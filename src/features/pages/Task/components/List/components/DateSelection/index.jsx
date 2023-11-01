import { DatePicker } from "antd";
import React from "react";

function DateSelectionComp({
  selectedDate,
  handleDateChange,
}) {
  return (
    <>
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        placeholder="Xem theo ngày"
        format="DD-MM-YYYY"
      />
    </>
  );
}

export default DateSelectionComp;
