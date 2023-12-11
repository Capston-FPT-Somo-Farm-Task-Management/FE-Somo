import { Button, DatePicker, Form, Input, Modal } from "antd";
import dayjs from "dayjs";
import React from "react";

const { TextArea } = Input;

const ChangeDoneToDoing = ({
  selectedTask,
  taskDoneToDoingVisible,
  closeChangeDoneToDoingModal,
  handleChangeDoneToDoing,
  description,
  handleDescription,
  disabledDate,
  handleSelectDeadlineForDone,
}) => {
  return (
    <>
      {taskDoneToDoingVisible && (
        <Modal
          title="Yêu cầu làm lại"
          open={taskDoneToDoingVisible}
          onCancel={closeChangeDoneToDoingModal}
          footer={[
            <Button onClick={closeChangeDoneToDoingModal}>Đóng</Button>,
            <Button form="doneToDoing" type="primary" danger htmlType="submit">
              Xác nhận
            </Button>,
          ]}
        >
          <Form
            layout="vertical"
            onFinish={() => {
              handleChangeDoneToDoing(selectedTask.id);
            }}
            id="doneToDoing"
          >
            <Form.Item label="Lý do phải làm lại" name="description">
              <TextArea
                placeholder="Nhập lý do"
                value={description}
                rows={5}
                onChange={handleDescription}
              />
            </Form.Item>
            <Form.Item
              label="Thời gian kết thúc mới"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngày bắt đầu",
                },
              ]}
              name="startDate"
            >
              <DatePicker
                placeholder="Chọn thời gian bắt đầu"
                format="HH:mm DD-MM-YYYY"
                disabledDate={disabledDate}
                showTime={{
                  defaultValue: dayjs("00:00", "HH:mm"),
                  format: "HH:mm",
                }}
                showSecond="false"
                onChange={handleSelectDeadlineForDone}
              />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default ChangeDoneToDoing;
