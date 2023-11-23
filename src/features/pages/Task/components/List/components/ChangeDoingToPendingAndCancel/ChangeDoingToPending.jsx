import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

const ChangeDoingToPending = ({
  currentTaskId,
  taskDoingToPendingModalVisible,
  closeChangeDoingToPendingModal,
  handleChangeDoingToPendingTask,
  description,
  handleDescription,
}) => {
  return (
    <>
      {taskDoingToPendingModalVisible && (
        <Modal
          title="Tạm hoãn"
          open={taskDoingToPendingModalVisible}
          onCancel={closeChangeDoingToPendingModal}
          footer={[
            <Button form="doingToPending" type="primary" htmlType="submit">
              Đồng ý
            </Button>,
          ]}
        >
          <Form
            layout="vertical"
            onFinish={() => handleChangeDoingToPendingTask(currentTaskId)}
            id="doingToPending"
          >
            <Form.Item label="Đổi sang tạm hoãn" name="description">
              <TextArea
                placeholder="Nhập lý do hoãn"
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

export default ChangeDoingToPending;
