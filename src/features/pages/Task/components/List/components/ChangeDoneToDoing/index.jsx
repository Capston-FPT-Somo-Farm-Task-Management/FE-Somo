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
          title="Chuyển sang thực hiện"
          open={taskDoneToDoingVisible}
          onCancel={closeChangeDoneToDoingModal}
          footer={[
            <Button form="doneToDoing" type="primary" htmlType="submit">
              Lưu thay đổi
            </Button>,
            <Button type="primary" onClick={closeChangeDoneToDoingModal}>
              Đóng
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
            <Form.Item
              label="Lý do chuyển sang thực hiện"
              name="description"
            >
              <Input
                placeholder="Nhập lý do chuyển"
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
