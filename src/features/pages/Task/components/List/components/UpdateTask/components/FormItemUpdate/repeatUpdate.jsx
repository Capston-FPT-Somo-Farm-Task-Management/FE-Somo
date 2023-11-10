import { Form, Select } from "antd";
import React from "react";
import MultiDatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

function RepeatUpdate({ repeatValue, handleSelectRepeat, editingTask, endDate }) {
  const disableRepeat = endDate ? !endDate.isValid() : null;
  const repeatData = editingTask.isRepeat === true ? "Có" : "Không";
  const dateRepeateArray =
    editingTask && editingTask.dateRepeate
      ? editingTask.dateRepeate.map((date) => new Date(date))
      : [];
  return (
    <>
    <Form.Item
      label="Lặp lại"
      name="isRepeat"
      initialValue={repeatData}
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
    {editingTask.isRepeat === true || repeatValue ? (
      <Form.Item
      label="Lặp những ngày"
      name="dateRepeate"
      initialValue={dateRepeateArray}
    >
      <MultiDatePicker
        style={{
          height: "32px",
        }}
        placeholder="Chọn ngày lặp lại"
        multiple
        format="YYYY-MM-DD"
        disabled={!editingTask.endDate || disableRepeat}
        minDate={new Date(new Date(endDate ? endDate : editingTask.endDate).getTime() + 24 * 60 * 60 * 1000)}
        plugins={[<DatePanel />]}
      />
    </Form.Item>
    ) : null}
    </>
  );
}

export default RepeatUpdate;
