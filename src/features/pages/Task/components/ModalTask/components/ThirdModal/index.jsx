import { DatePicker, Form, Input, Select } from "antd";
import React, { useState, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { getAreas } from "../../../../../../slice/area/areaSlice";
import { getZoneByAreaPlant } from "../../../../../../slice/zone/zonePlantSlice";
import { getZoneByAreaLivestock } from "../../../../../../slice/zone/zoneLivestockSlice";
import { getFieldByZone } from "features/slice/field/fieldByZoneSlice";

function ThirdModal({ option }) {
  const [description, setDescription] = useState("");
  const [selectedAreaId, setSelectedAreaId] = useState(null);
  const [selectedZoneId, setSelectedZoneId] = useState(null);

  const area = useSelector((state) => state.area.data);
  console.log(area);
  const zonePlant = useSelector((state) => state.zonePlant.data);
  const dataPlantZone = zonePlant.data;

  const zoneLivestock = useSelector((state) => state.zoneLivestock.data);
  const dataLivestockZone = zoneLivestock.data;

  const fieldByZone = useSelector((state) => state.fieldByZone.data);
  const dataFieldByZone = fieldByZone.data;

  console.log(dataFieldByZone);
  const { RangePicker } = DatePicker;
  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      console.log("From: ", dates[0], ", to: ", dates[1]);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    } else {
      console.log("Clear");
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAreas());
  }, []);

  useEffect(() => {
    if (selectedAreaId) {
      dispatch(getZoneByAreaPlant(selectedAreaId));
      dispatch(getZoneByAreaLivestock(selectedAreaId));
    }
    if (selectedZoneId) {
      dispatch(getFieldByZone(selectedZoneId));
    }
  }, [selectedAreaId, selectedZoneId]);

  const handleSelectChange = (value) => {
    setSelectedAreaId(value);
  };
  const handleSelectZoneChange = (value) => {
    setSelectedZoneId(value);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  if (option === "specificAnimal") {
    return (
      <Form layout="vertical" className="task-specific-animal">
        <div className="form-left">
          <Form.Item label="Khu vực" required>
            <Select
              onChange={handleSelectChange}
              placeholder="chọn khu vực"
              options={area?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Vùng" required>
            <Select
              onChange={handleSelectZoneChange}
              options={
                Array.isArray(dataLivestockZone)
                  ? dataLivestockZone.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))
                  : []
              }
            />
          </Form.Item>
          <Form.Item label="Chuồng">
            <Select
              options={
                Array.isArray(dataFieldByZone)
                  ? dataFieldByZone.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))
                  : []
              }
            />
          </Form.Item>
          <Form.Item label="Id con vật">
            <Select onChange={handleChange} options={animalIdItem} />
          </Form.Item>
          <Form.Item label="Độ ưu tiên">
            <Select onChange={handleChange} options={priorityItem} />
          </Form.Item>
          <Form.Item label="Chọn khoảng thời gian làm">
            <RangePicker
              showTime
              format="DD/MM/YYYY HH:mm"
              onChange={onRangeChange}
              placeholder={["Ngày giờ bắt đầu", "Ngày giờ kết thúc"]}
            />
          </Form.Item>
          <Form.Item label="Nhắc lại sau">
            <Select onChange={handleChange} options={remindItem} />
          </Form.Item>
          <Form.Item label="Lặp lại">
            <Select onChange={handleChange} options={repeatItem} />
          </Form.Item>
        </div>
        <div className="form-right">
          <Form.Item label="Tên công việc">
            <Input placeholder="Nhập tên công việc" />
          </Form.Item>
          <Form.Item label="Loại nhiệm vụ">
            <Select onChange={handleChange} options={taskTypeItem} />
          </Form.Item>
          <Form.Item label="Người thực hiện">
            <Select onChange={handleChange} options={workerItem} />
          </Form.Item>
          <Form.Item label="Người giám sát">
            <Select onChange={handleChange} options={supervisorItem} />
          </Form.Item>
          <Form.Item label="Dụng cụ">
            <Select onChange={handleChange} options={materialItem} />
          </Form.Item>
          <Form.Item label="Mô tả">
            <ReactQuill
              placeholder="Thêm mô tả chi tiết cho công việc"
              value={description}
              onChange={setDescription}
            />
          </Form.Item>
        </div>
      </Form>
    );
  } else if (option === "wholeBarn") {
    return (
      <Form layout="vertical" className="task-whole-barn">
        <div className="form-left">
          <div className="area">
            <Form.Item label="Khu vực">
              <Select
                onChange={handleSelectChange}
                placeholder="chọn khu vực"
                options={area?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </Form.Item>
          </div>
          <div className="zone">
            <Form.Item label="Vùng">
              <Select
                onChange={handleChange}
                options={
                  Array.isArray(dataLivestockZone)
                    ? dataLivestockZone.map((item) => ({
                        label: item.name,
                        value: item.id,
                      }))
                    : []
                }
              />
            </Form.Item>
          </div>
          <div className="barn">
            <Form.Item label="Chuồng">
              <Select onChange={handleChange} options={barnItem} />
            </Form.Item>
          </div>
          <div className="priority">
            <Form.Item label="Độ ưu tiên">
              <Select onChange={handleChange} options={priorityItem} />
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
              <Select onChange={handleChange} options={remindItem} />
            </Form.Item>
          </div>
          <div className="repeat">
            <Form.Item label="Lặp lại">
              <Select onChange={handleChange} options={repeatItem} />
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
              <Select onChange={handleChange} options={taskTypeItem} />
            </Form.Item>
          </div>
          <div className="worker">
            <Form.Item label="Người thực hiện">
              <Select onChange={handleChange} options={workerItem} />
            </Form.Item>
          </div>
          <div className="supervisor">
            <Form.Item label="Người giám sát">
              <Select onChange={handleChange} options={supervisorItem} />
            </Form.Item>
          </div>
          <div className="material">
            <Form.Item label="Dụng cụ">
              <Select onChange={handleChange} options={materialItem} />
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
                <Select
                  onChange={handleSelectChange}
                  options={area?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                />
              </Form.Item>
            </div>
            <div className="zone">
              <Form.Item label="Vùng" required>
                <Select
                  onChange={handleChange}
                  options={
                    Array.isArray(dataPlantZone)
                      ? dataPlantZone.map((item) => ({
                          label: item.name,
                          value: item.id,
                        }))
                      : []
                  }
                />
              </Form.Item>
            </div>
            <div className="garden">
              <Form.Item label="Vườn">
                <Select onChange={handleChange} options={gardenItem} />
              </Form.Item>
            </div>
            <div className="animal-id">
              <Form.Item label="Id cây trồng">
                <Select onChange={handleChange} options={plantIdItem} />
              </Form.Item>
            </div>
            <div className="priority">
              <Form.Item label="Độ ưu tiên">
                <Select onChange={handleChange} options={priorityItem} />
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
                <Select onChange={handleChange} options={remindItem} />
              </Form.Item>
            </div>
            <div className="repeat">
              <Form.Item label="Lặp lại">
                <Select onChange={handleChange} options={repeatItem} />
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
                <Select onChange={handleChange} options={taskTypeItem} />
              </Form.Item>
            </div>
            <div className="worker">
              <Form.Item label="Người thực hiện">
                <Select onChange={handleChange} options={workerItem} />
              </Form.Item>
            </div>
            <div className="supervisor">
              <Form.Item label="Người giám sát">
                <Select onChange={handleChange} options={supervisorItem} />
              </Form.Item>
            </div>
            <div className="material">
              <Form.Item label="Dụng cụ">
                <Select onChange={handleChange} options={materialItem} />
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
              <Select
                onChange={handleSelectChange}
                options={area?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </Form.Item>
          </div>
          <div className="zone">
            <Form.Item label="Vùng">
              <Select
                onChange={handleChange}
                options={
                  Array.isArray(dataPlantZone)
                    ? dataPlantZone.map((item) => ({
                        label: item.name,
                        value: item.id,
                      }))
                    : []
                }
              />
            </Form.Item>
          </div>
          <div className="barn">
            <Form.Item label="Vườn">
              <Select onChange={handleChange} options={gardenItem} />
            </Form.Item>
          </div>
          <div className="priority">
            <Form.Item label="Độ ưu tiên">
              <Select onChange={handleChange} options={priorityItem} />
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
              <Select onChange={handleChange} options={remindItem} />
            </Form.Item>
          </div>
          <div className="repeat">
            <Form.Item label="Lặp lại">
              <Select onChange={handleChange} options={repeatItem} />
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
              <Select onChange={handleChange} options={taskTypeItem} />
            </Form.Item>
          </div>
          <div className="worker">
            <Form.Item label="Người thực hiện">
              <Select onChange={handleChange} options={workerItem} />
            </Form.Item>
          </div>
          <div className="supervisor">
            <Form.Item label="Người giám sát">
              <Select onChange={handleChange} options={supervisorItem} />
            </Form.Item>
          </div>
          <div className="material">
            <Form.Item label="Dụng cụ">
              <Select onChange={handleChange} options={materialItem} />
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
