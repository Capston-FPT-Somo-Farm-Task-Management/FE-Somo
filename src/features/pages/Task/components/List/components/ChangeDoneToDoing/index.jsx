import { Button, Form, Input, Modal } from "antd";
import React from "react";

const ChangeDoneToDoing = ({
  selectedTask,
  taskDoneToDoingVisible,
  closeChangeDoneToDoingModal,
  handleChangeDoneToDoing,
  description,
  handleDescription,
}) => {
  return (
    <>
      {taskDoneToDoingVisible && (
        <Modal
          title="Yêu cầu làm lại"
          open={taskDoneToDoingVisible}
          onCancel={closeChangeDoneToDoingModal}
          footer={[
            <Button onClick={closeChangeDoneToDoingModal}>
              Đóng
            </Button>,
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
              <Input
                placeholder="Nhập lý do"
                value={description}
                onChange={handleDescription}
              />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default ChangeDoneToDoing;
