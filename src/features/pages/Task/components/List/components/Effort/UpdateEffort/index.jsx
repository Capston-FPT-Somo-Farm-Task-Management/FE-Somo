import { Button, Form, Input, Modal } from "antd";
import React from "react";

function UpdateEffort({
  editEffortVisible,
  closeEditEffortModal,
  handleUpdateEffort,
  currentTaskId,
  editingEffort,
}) {
  return (
    <>
      {editEffortVisible && (
        <Modal
          title="Sửa chấm công"
          open={editEffortVisible}
          onCancel={closeEditEffortModal}
          footer={[
            <Button form="updateEffort" type="primary" htmlType="submit">
              Lưu thay đổi
            </Button>,
            <Button type="primary" onClick={closeEditEffortModal}>
              Đóng
            </Button>,
          ]}
        >
          <Form
            layout="vertical"
            onFinish={(values) => {
              handleUpdateEffort(
                currentTaskId,
                editingEffort.employeeId,
                values.actualEffortHour,
                values.actualEfforMinutes
              );
            }}
            id="updateEffort"
            key={editingEffort ? editingEffort.employeeId : "new"}
          >
            <Form.Item
              label="Số giờ chấm công"
              name="actualEffortHour"
              required
              initialValue={editingEffort ? editingEffort.totalActualEffortHour : null}
            >
              <Input placeholder="Nhập số giờ chấm công" />
            </Form.Item>
            <Form.Item
              label="Số phút chấm công"
              name="actualEfforMinutes"
              required
              initialValue={editingEffort ? editingEffort.totalActualEfforMinutes : null}
            >
              <Input placeholder="Nhập số phút chấm công" />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
}

export default UpdateEffort;
