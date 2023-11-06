import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

function UpdateSubTask({ editSubTaskModalVisible, closeEditSubTaskModal, handleUpdateSubTask, editingSubTask, description, handleDescription }) {
  return (
    <>
      {editSubTaskModalVisible && (
        <Modal
          title="Sửa công việc con"
          visible={editSubTaskModalVisible}
          onCancel={closeEditSubTaskModal}
          footer={[
            <Button form="updateSubTask" type="primary" htmlType="submit">
              Lưu thay đổi
            </Button>,
            <Button type="primary" onClick={closeEditSubTaskModal}>
              Đóng
            </Button>,
          ]}
        >
          <Form
            layout="vertical"
            onFinish={handleUpdateSubTask}
            id="updateSubTask"
            key={editingSubTask ? editingSubTask.employeeId : "new"}
          >
            <Form.Item
              label="Tên công việc con"
              name="name"
              required
              initialValue={editingSubTask.name}
            >
              <Input placeholder="Nhập tên công việc con" />
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="description"
              initialValue={description}
            >
              <TextArea
                value={description}
                onChange={handleDescription}
                rows={5}
                placeholder="Thêm mô tả chi tiết cho công việc"
              />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
}

export default UpdateSubTask;
