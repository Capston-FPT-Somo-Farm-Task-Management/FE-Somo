import { DatePicker, Form, Input, Select } from "antd";
import React, { useState } from "react";
import {
  animalIdItem,
  areaItem,
  barnItem,
  gardenItem,
  materialItem,
  plantIdItem,
  priorityItem,
  remindItem,
  repeatItem,
  supervisorItem,
  taskTypeItem,
  workerItem,
  zoneItem,
} from "./ThirdModalData";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function ThirdModal({ option }) {
  const [description, setDescription] = useState("");

  const { RangePicker } = DatePicker;
  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      console.log("From: ", dates[0], ", to: ", dates[1]);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    } else {
      console.log("Clear");
    }
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  

  if (option === "specificAnimal") {
    return (
      <Form layout="vertical" className="task-specific-animal">
        <div className="form-left">
          <div className="area">
            <Form.Item label="Khu vực">
              <Select options={areaItem} />
            </Form.Item>
          </div>
          <div className="zone">
            <Form.Item label="Vùng">
              <Select options={zoneItem} />
            </Form.Item>
          </div>
          <div className="barn">
            <Form.Item label="Chuồng">
              <Select options={barnItem} />
            </Form.Item>
          </div>
          <div className="animal-id">
            <Form.Item label="Id con vật">
              <Select options={animalIdItem} />
            </Form.Item>
          </div>
          <div className="priority">
            <Form.Item label="Độ ưu tiên">
              <Select options={priorityItem} />
            </Form.Item>
          </div>
          <div className="date">
            <Form.Item label="Chọn khoảng thời gian làm">
              <RangePicker
                showTime
                format="DD/MM/YYYY HH:mm"
                onChange={onRangeChange}
                placeholder={["Ngày giờ bắt đầu", "Ngày giờ kết thúc"]}
              />
            </Form.Item>
          </div>
          <div className="remind">
            <Form.Item label="Nhắc lại sau">
              <Select options={remindItem} />
            </Form.Item>
          </div>
          <div className="repeat">
            <Form.Item label="Lặp lại">
              <Select options={repeatItem} />
            </Form.Item>
          </div>
        </div>
        <div className="form-right">
          <div className="task-name">
            <Form.Item label="Tên công việc">
              <Input placeholder="Nhập tên công việc" />
            </Form.Item>
          </div>
          <div className="task-type">
            <Form.Item label="Loại nhiệm vụ">
              <Select options={taskTypeItem} />
            </Form.Item>
          </div>
          <div className="worker">
            <Form.Item label="Người thực hiện">
              <Select options={workerItem} />
            </Form.Item>
          </div>
          <div className="supervisor">
            <Form.Item label="Người giám sát">
              <Select options={supervisorItem} />
            </Form.Item>
          </div>
          <div className="material">
            <Form.Item label="Dụng cụ">
              <Select options={materialItem} />
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
        </div>
      </Form>
    );
  } else if (option === "wholeBarn") {
    return (
        <Form layout="vertical" className="task-whole-barn">
        <div className="form-left">
          <div className="area">
            <Form.Item label="Khu vực">
              <Select options={areaItem} />
            </Form.Item>
          </div>
          <div className="zone">
            <Form.Item label="Vùng">
              <Select options={zoneItem} />
            </Form.Item>
          </div>
          <div className="barn">
            <Form.Item label="Chuồng">
              <Select options={barnItem} />
            </Form.Item>
          </div>
          <div className="priority">
            <Form.Item label="Độ ưu tiên">
              <Select options={priorityItem} />
            </Form.Item>
          </div>
          <div className="date">
            <Form.Item label="Chọn khoảng thời gian làm">
              <RangePicker
                showTime
                format="DD/MM/YYYY HH:mm"
                onChange={onRangeChange}
                placeholder={["Ngày giờ bắt đầu", "Ngày giờ kết thúc"]}
              />
            </Form.Item>
          </div>
          <div className="remind">
            <Form.Item label="Nhắc lại sau">
              <Select options={remindItem} />
            </Form.Item>
          </div>
          <div className="repeat">
            <Form.Item label="Lặp lại">
              <Select options={repeatItem} />
            </Form.Item>
          </div>
        </div>
        <div className="form-right">
          <div className="task-name">
            <Form.Item label="Tên công việc">
              <Input placeholder="Nhập tên công việc" />
            </Form.Item>
          </div>
          <div className="task-type">
            <Form.Item label="Loại nhiệm vụ">
              <Select options={taskTypeItem} />
            </Form.Item>
          </div>
          <div className="worker">
            <Form.Item label="Người thực hiện">
              <Select options={workerItem} />
            </Form.Item>
          </div>
          <div className="supervisor">
            <Form.Item label="Người giám sát">
              <Select options={supervisorItem} />
            </Form.Item>
          </div>
          <div className="material">
            <Form.Item label="Dụng cụ">
              <Select options={materialItem} />
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
        </div>
      </Form>
    );
  } else if (option === "specificPlant") {
    return (
      <div>
        <Form layout="vertical" className="task-specific-plant">
        <div className="form-left">
          <div className="area">
            <Form.Item label="Khu vực">
              <Select options={areaItem} />
            </Form.Item>
          </div>
          <div className="zone">
            <Form.Item label="Vùng">
              <Select options={zoneItem} />
            </Form.Item>
          </div>
          <div className="garden">
            <Form.Item label="Vườn">
              <Select options={gardenItem} />
            </Form.Item>
          </div>
          <div className="animal-id">
            <Form.Item label="Id cây trồng">
              <Select options={plantIdItem} />
            </Form.Item>
          </div>
          <div className="priority">
            <Form.Item label="Độ ưu tiên">
              <Select options={priorityItem} />
            </Form.Item>
          </div>
          <div className="date">
            <Form.Item label="Chọn khoảng thời gian làm">
              <RangePicker
                showTime
                format="DD/MM/YYYY HH:mm"
                onChange={onRangeChange}
                placeholder={["Ngày giờ bắt đầu", "Ngày giờ kết thúc"]}
              />
            </Form.Item>
          </div>
          <div className="remind">
            <Form.Item label="Nhắc lại sau">
              <Select options={remindItem} />
            </Form.Item>
          </div>
          <div className="repeat">
            <Form.Item label="Lặp lại">
              <Select options={repeatItem} />
            </Form.Item>
          </div>
        </div>
        <div className="form-right">
          <div className="task-name">
            <Form.Item label="Tên công việc">
              <Input placeholder="Nhập tên công việc" />
            </Form.Item>
          </div>
          <div className="task-type">
            <Form.Item label="Loại nhiệm vụ">
              <Select options={taskTypeItem} />
            </Form.Item>
          </div>
          <div className="worker">
            <Form.Item label="Người thực hiện">
              <Select options={workerItem} />
            </Form.Item>
          </div>
          <div className="supervisor">
            <Form.Item label="Người giám sát">
              <Select options={supervisorItem} />
            </Form.Item>
          </div>
          <div className="material">
            <Form.Item label="Dụng cụ">
              <Select options={materialItem} />
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
        </div>
      </Form>
      </div>
    );
  } else if (option === "wholeGarden") {
    return (
        <Form layout="vertical" className="task-whole-garden">
        <div className="form-left">
          <div className="area">
            <Form.Item label="Khu vực">
              <Select options={areaItem} />
            </Form.Item>
          </div>
          <div className="zone">
            <Form.Item label="Vùng">
              <Select options={zoneItem} />
            </Form.Item>
          </div>
          <div className="barn">
            <Form.Item label="Vườn">
              <Select options={gardenItem} />
            </Form.Item>
          </div>
          <div className="priority">
            <Form.Item label="Độ ưu tiên">
              <Select options={priorityItem} />
            </Form.Item>
          </div>
          <div className="date">
            <Form.Item label="Chọn khoảng thời gian làm">
              <RangePicker
                showTime
                format="DD/MM/YYYY HH:mm"
                onChange={onRangeChange}
                placeholder={["Ngày giờ bắt đầu", "Ngày giờ kết thúc"]}
              />
            </Form.Item>
          </div>
          <div className="remind">
            <Form.Item label="Nhắc lại sau">
              <Select options={remindItem} />
            </Form.Item>
          </div>
          <div className="repeat">
            <Form.Item label="Lặp lại">
              <Select options={repeatItem} />
            </Form.Item>
          </div>
        </div>
        <div className="form-right">
          <div className="task-name">
            <Form.Item label="Tên công việc">
              <Input placeholder="Nhập tên công việc" />
            </Form.Item>
          </div>
          <div className="task-type">
            <Form.Item label="Loại nhiệm vụ">
              <Select options={taskTypeItem} />
            </Form.Item>
          </div>
          <div className="worker">
            <Form.Item label="Người thực hiện">
              <Select options={workerItem} />
            </Form.Item>
          </div>
          <div className="supervisor">
            <Form.Item label="Người giám sát">
              <Select options={supervisorItem} />
            </Form.Item>
          </div>
          <div className="material">
            <Form.Item label="Dụng cụ">
              <Select options={materialItem} />
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
        </div>
      </Form>
    );
  }
  return null;
}

export default ThirdModal;
