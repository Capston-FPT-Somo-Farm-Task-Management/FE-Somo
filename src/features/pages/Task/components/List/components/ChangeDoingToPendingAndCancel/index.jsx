import { Button, Form, Input, Modal } from "antd";
import React from "react";

const ChangeDoingToPendingAndCancel = ({
  selectedTask,
  taskDoingToPendingAndCancelModalVisible,
  closeChangeDoingToPendingAndCancelModal,
  handleChangeDoingToPendingAndCancelTask,
  description,
  handleDescription,
}) => {
  console.log(selectedTask);
  return (
    <>
      {taskDoingToPendingAndCancelModalVisible && (
        <Modal
          title="Chuyển trạng thái"
          open={taskDoingToPendingAndCancelModalVisible}
          onCancel={closeChangeDoingToPendingAndCancelModal}
          footer={[
            <Button form="dongToPendingAndCancel" type="primary" htmlType="submit">
              Chuyển
            </Button>,
            <Button type="primary" onClick={closeChangeDoingToPendingAndCancelModal}>
              Đóng
            </Button>,
          ]}
        >
          <Form
            layout="vertical"
            onFinish={() => {
                handleChangeDoingToPendingAndCancelTask(selectedTask.id);
            }}
            id="dongToPendingAndCancel"
          >
            <Form.Item
              label="Lý do chuyển"
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

export default ChangeDoingToPendingAndCancel;
