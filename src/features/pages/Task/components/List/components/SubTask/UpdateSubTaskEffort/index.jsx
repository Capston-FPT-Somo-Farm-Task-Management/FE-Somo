import { Button, Form, Input, Modal } from "antd";
import React from "react";

function UpdateSubTaskEffort({
  editSubTaskEffortModalVisible,
  closeEditSubTaskEffortModal,
  handleUpdateSubTaskEffort,
  editingSubTask,
}) {
  return (
    <>
      {editSubTaskEffortModalVisible && (
        <Modal
          title="Sửa chấm công"
          open={editSubTaskEffortModalVisible}
          onCancel={closeEditSubTaskEffortModal}
          footer={[
            <Button form="updateSubTaskEffort" type="primary" htmlType="submit">
              Lưu thay đổi
            </Button>,
            <Button type="primary" onClick={closeEditSubTaskEffortModal}>
              Đóng
            </Button>,
          ]}
        >
          <Form
            layout="vertical"
            onFinish={(values) => {
              handleUpdateSubTaskEffort(
                editingSubTask.subtaskId,
                editingSubTask.employeeId,
                values.actualEffortHour,
                values.actualEfforMinutes
              );
            }}
            id="updateSubTaskEffort"
            key={editingSubTask ? editingSubTask.employeeId : "new"}
          >
            <Form.Item
              label="Số giờ chấm công"
              name="actualEffortHour"
              required
              initialValue={editingSubTask ? editingSubTask.actualEffortHour  : null}
            >
              <Input placeholder="Nhập số giờ chấm công" />
            </Form.Item>
            <Form.Item
              label="Số phút chấm công"
              name="actualEfforMinutes"
              required
              initialValue={editingSubTask ? editingSubTask.actualEfforMinutes : null}
            >
              <Input placeholder="Nhập số phút chấm công" />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
}

export default UpdateSubTaskEffort;
