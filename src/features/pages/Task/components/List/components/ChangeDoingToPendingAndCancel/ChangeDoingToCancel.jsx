import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

const ChangeDoingToCancel = ({
  currentTaskId,
  taskDoingToCancelModalVisible,
  closeChangeDoingToCancelModal,
  handleChangeDoingToCancelTask,
  description,
  handleDescription,
}) => {
  return (
    <>
      {taskDoingToCancelModalVisible && (
        <Modal
          title="Hủy bỏ"
          open={taskDoingToCancelModalVisible}
          onCancel={closeChangeDoingToCancelModal}
          footer={[
            <Button form="doingToCancel" type="primary" htmlType="submit">
              Đồng ý
            </Button>,
          ]}
        >
          <Form
            layout="vertical"
            onFinish={() => handleChangeDoingToCancelTask(currentTaskId)}
            id="doingToCancel"
          >
            <Form.Item label="Huỷ bỏ công việc" name="description">
              <TextArea
                placeholder="Nhập lý do hủy bỏ"
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

export default ChangeDoingToCancel;
