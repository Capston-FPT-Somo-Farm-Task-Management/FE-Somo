import {
  Button,
  Input,
  Modal,
  Form,
  Select,
  DatePicker,
  ColorPicker,
  Space,
  Row,
  Col,
  Steps, theme, message 
} from "antd";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  assignItem,
  priorityItem,
  repeatItem,
  statusItem,
  steps,
} from "./modalTask";

function ModalTask() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const statusDefault = "Đang làm";
  const repeatDefault = "Không lặp lại";
  const { RangePicker } = DatePicker;

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      console.log("From: ", dates[0], ", to: ", dates[1]);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    } else {
      console.log("Clear");
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //steps
  const { token } = theme.useToken()
  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent(current + 1)
  }
  const prev = () => {
    setCurrent(current - 1)
  }
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }))
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Thêm công việc
      </Button>
      <Modal
              title="Tạo mới"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Steps size="large" current={current} items={items} />
              <div >{steps[current].content}</div>
              <div
                style={{
                  marginTop: 24,
                }}
              >
                {current < steps.length - 1 && (
                  <Button type="primary" onClick={() => next()}>
                    Next
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button
                    type="primary"
                    onClick={() => message.success('Processing complete!')}
                  >
                    Done
                  </Button>
                )}
                {current > 0 && (
                  <Button
                    style={{
                      margin: '0 8px',
                    }}
                    onClick={() => prev()}
                  >
                    Previous
                  </Button>
                )}
              </div>
            </Modal>
      {/* <Modal
        title="Thêm công việc"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Đóng
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Thêm
          </Button>,
        ]}
      >
        <Form layout="vertical" className="form-task">
          <div className="form-left">
            <div className="title">
              <Form.Item label="Tiêu đề">
                <Input placeholder="Ví dụ: Cho heo ăn" />
              </Form.Item>
            </div>
            <div className="description">
              <Form.Item label="Mô tả">
                <ReactQuill
                  placeholder="Thêm mô tả chi tiết cho công việc"
                  value={description}
                  onChange={setDescription}
                />
              </Form.Item>
            </div>
            <div className="date">
              <Form.Item label="Chọn khoảng thời gian làm">
                <RangePicker
                  showTime
                  format="DD/MM/YYYY HH:mm"
                  onChange={onRangeChange}
                  placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                />
              </Form.Item>
            </div>
          </div>
          <div className="form-right">
            <div className="status">
              <Form.Item label="Trạng thái">
                <Select value={statusDefault} options={statusItem} />
              </Form.Item>
            </div>
            <div className="assigned-to">
              <Form.Item label="Giao cho">
                <Select options={assignItem} />
              </Form.Item>
            </div>
            <div className="priority">
              <Form.Item label="Mức độ ưu tiên">
                <Select options={priorityItem} />
              </Form.Item>
            </div>

            <div className="repeats">
              <Form.Item label="Lặp lại">
                <Select value={repeatDefault} options={repeatItem} />
              </Form.Item>
            </div>
            <div className="color-task">
              <Row align="middle">
                <Space>
                  <span>Chọn màu của công việc: </span>
                  <Col>
                    <ColorPicker
                      showText
                      panelRender={(panel) => (
                        <div className="custom-panel">
                          <div
                            style={{
                              fontSize: 12,
                              color: "rgba(0, 0, 0, 0.88)",
                              lineHeight: "20px",
                              marginBottom: 8,
                            }}
                          >
                            Color Picker
                          </div>
                          {panel}
                        </div>
                      )}
                    />
                  </Col>
                </Space>
              </Row>
            </div>
          </div>
        </Form>
      </Modal> */}
    </>
  );
}

export default ModalTask;
