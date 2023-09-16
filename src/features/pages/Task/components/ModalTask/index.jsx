import { Button, Input, Modal, Form, Select, DatePicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function ModalTask() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Thêm công việc
      </Button>
      <Modal
        title="Thêm công việc"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
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
                <ReactQuill placeholder="Thêm mô tả chi tiết cho công việc" value={description} onChange={setDescription} />
              </Form.Item>
            </div>
            <div className="associated">
              <Form.Item label="Liên quan đến">
                <Select>
                  <Select.Option value="plants">Trồng trọt</Select.Option>
                  <Select.Option value="livestock">Chăn nuôi</Select.Option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="form-right">
            <div className="status">
              <Form.Item label="Trạng thái">
                <Select>
                  <Select.Option value="todo">Đang làm</Select.Option>
                  <Select.Option value="done">Hoàn thành</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="assigned-to">
              <Form.Item label="Giao cho">
                <Select>
                  <Select.Option value="supervisor1">Minh Anh</Select.Option>
                  <Select.Option value="supervisor2">Hoàng Vũ</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="priority">
              <Form.Item label="Mức độ ưu tiên">
                <Select>
                  <Select.Option value="highest">Cao nhất</Select.Option>
                  <Select.Option value="high">Cao</Select.Option>
                  <Select.Option value="medium">Trung bình</Select.Option>
                  <Select.Option value="low">Thấp</Select.Option>
                  <Select.Option value="lowest">Thấp nhất</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="start-date">
              <Form.Item label="Ngày bắt đầu">
                <DatePicker format="DD/MM/YYYY" placeholder="dd/mm/yyyy" />
              </Form.Item>
            </div>
            <div className="start-time">
              <Select placeholder="Giờ">
                <Select.Option value="00">00</Select.Option>
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
                <Select.Option value="3">3</Select.Option>
                <Select.Option value="4">4</Select.Option>
                <Select.Option value="5">5</Select.Option>
                <Select.Option value="6">6</Select.Option>
                <Select.Option value="7">7</Select.Option>
                <Select.Option value="8">8</Select.Option>
                <Select.Option value="9">9</Select.Option>
                <Select.Option value="10">10</Select.Option>
                <Select.Option value="11">11</Select.Option>
                <Select.Option value="12">12</Select.Option>
                <Select.Option value="13">13</Select.Option>
                <Select.Option value="14">14</Select.Option>
                <Select.Option value="15">15</Select.Option>
                <Select.Option value="16">16</Select.Option>
                <Select.Option value="17">17</Select.Option>
                <Select.Option value="18">18</Select.Option>
                <Select.Option value="19">19</Select.Option>
                <Select.Option value="20">20</Select.Option>
                <Select.Option value="21">21</Select.Option>
                <Select.Option value="22">22</Select.Option>
                <Select.Option value="23">23</Select.Option>
              </Select>
              <Select placeholder="Phút">
                <Select.Option value="00">00</Select.Option>
                <Select.Option value="15">15</Select.Option>
                <Select.Option value="30">30</Select.Option>
                <Select.Option value="45">45</Select.Option>
              </Select>
            </div>
            <div className="due-date">
              <Form.Item label="Ngày Kết thúc">
                <DatePicker format="DD/MM/YYYY" placeholder="dd/mm/yyyy" />
              </Form.Item>
            </div>
            <div className="due-time">
              <Select placeholder="Giờ">
                <Select.Option value="00">00</Select.Option>
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
                <Select.Option value="3">3</Select.Option>
                <Select.Option value="4">4</Select.Option>
                <Select.Option value="5">5</Select.Option>
                <Select.Option value="6">6</Select.Option>
                <Select.Option value="7">7</Select.Option>
                <Select.Option value="8">8</Select.Option>
                <Select.Option value="9">9</Select.Option>
                <Select.Option value="10">10</Select.Option>
                <Select.Option value="11">11</Select.Option>
                <Select.Option value="12">12</Select.Option>
                <Select.Option value="13">13</Select.Option>
                <Select.Option value="14">14</Select.Option>
                <Select.Option value="15">15</Select.Option>
                <Select.Option value="16">16</Select.Option>
                <Select.Option value="17">17</Select.Option>
                <Select.Option value="18">18</Select.Option>
                <Select.Option value="19">19</Select.Option>
                <Select.Option value="20">20</Select.Option>
                <Select.Option value="21">21</Select.Option>
                <Select.Option value="22">22</Select.Option>
                <Select.Option value="23">23</Select.Option>
              </Select>
              <Select placeholder="Phút">
                <Select.Option value="00">00</Select.Option>
                <Select.Option value="15">15</Select.Option>
                <Select.Option value="30">30</Select.Option>
                <Select.Option value="45">45</Select.Option>
              </Select>
            </div>
            <div className="repeats">
              <Form.Item label="Lặp lại">
                <Select>
                  <Select.Option value="daily">Hàng tuần</Select.Option>
                  <Select.Option value="monthly">Hàng tháng</Select.Option>
                  <Select.Option value="yearly">Hàng năm</Select.Option>
                </Select>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
}

export default ModalTask;
