import { Form, Select } from "antd";
import React from "react";
import MultiDatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

function RepeatSelect({ repeatValue, handleSelectRepeat, endDate }) {
  return (
    <>
      <Form.Item label="Lặp lại" name="isRepeat">
        <Select
          value={repeatValue}
          onChange={handleSelectRepeat}
          placeholder="Không"
        >
          <Select.Option value="Không">Không</Select.Option>
          <Select.Option value="Có">Có</Select.Option>
        </Select>
      </Form.Item>
      {repeatValue && (
        <Form.Item label="Lặp những ngày" name="dates">
            <MultiDatePicker
              style={{
                height: "32px",
              }}
              placeholder="Chọn ngày lặp lại"
              multiple
              format="YYYY-MM-DD"
              disabled={!endDate || !endDate.isValid()}
              minDate={
                new Date(new Date(endDate).getTime() + 24 * 60 * 60 * 1000)
              }
              plugins={[<DatePanel />]}
            />
          </Form.Item>
      )}
    </>
  );
}

export default RepeatSelect;
