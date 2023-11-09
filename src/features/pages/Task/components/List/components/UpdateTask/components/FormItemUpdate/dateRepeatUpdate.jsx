import { Form } from "antd";
import React from "react";
import MultiDatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

function DateRepeatUpdate({ endDate, editingTask }) {
  return (
    <Form.Item
      label="Lặp những ngày"
      name="dates"
      initialValue={editingTask ? editingTask.dates : ""}
    >
      <MultiDatePicker
        style={{
          height: "32px",
        }}
        placeholder="Chọn ngày lặp lại"
        multiple
        format="YYYY-MM-DD"
        disabled={!endDate || !endDate.isValid()}
        minDate={new Date(new Date(endDate).getTime() + 24 * 60 * 60 * 1000)}
        plugins={[<DatePanel />]}
      />
    </Form.Item>
  );
}

export default DateRepeatUpdate;
