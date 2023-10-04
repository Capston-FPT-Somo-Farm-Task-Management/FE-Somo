import { DatePicker, Form, Input, Select } from "antd";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector, useDispatch } from "react-redux";
import { getAreas } from "../../../../../../slice/area/areaSlice";
import { getZoneByAreaPlant } from "../../../../../../slice/zone/zonePlantSlice";
import { getZoneByAreaLivestock } from "../../../../../../slice/zone/zoneLivestockSlice";
import { getFieldByZone } from "features/slice/field/fieldByZoneSlice";
import { getTaskTypePlant } from "features/slice/task/taskTypePlant";
import { getTaskTypeLivestock } from "features/slice/task/taskTypeAnimal";
import { getMember } from "features/slice/member/memberSlice";
import { getEmployee } from "features/slice/employee/employeeSlice";
import { getMaterial } from "features/slice/material/materialSlice";

function ThirdModal({ option }) {
  const [description, setDescription] = useState("");
  const [selectedAreaId, setSelectedAreaId] = useState(null);
  const [selectedZoneId, setSelectedZoneId] = useState(null);

  const area = useSelector((state) => state.area.data);
  const zonePlant = useSelector((state) => state.zonePlant.data);
  const dataPlantZone = zonePlant.data;

  const zoneLivestock = useSelector((state) => state.zoneLivestock.data);
  const dataLivestockZone = zoneLivestock.data;

  const fieldByZone = useSelector((state) => state.fieldByZone.data);
  const dataFieldByZone = fieldByZone.data;

  const priority = useSelector((state) => state.priority.data);
  const dataPriority = priority.data;

  const taskTypePlant = useSelector((state) => state.taskTypePlant.data);
  const dataTaskTypePlant = taskTypePlant.data;

  const taskTypeLivestock = useSelector(
    (state) => state.taskTypeLivestock.data
  );
  const dataTaskTypeLivestock = taskTypeLivestock.data;

  const member = useSelector((state) => state.member.data);
  const dataMember = member.data;

  const dataEmployee = useSelector((state) => state.employee.data);

  const dataMaterial = useSelector((state) => state.material.data);

  console.log(dataMaterial);
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
    dispatch(getTaskTypePlant());
    dispatch(getTaskTypeLivestock());
    dispatch(getMember());
    dispatch(getEmployee());
    dispatch(getMaterial());
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
              options={dataLivestockZone?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Chuồng" required>
            <Select
              options={dataFieldByZone?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Id con vật">
            <Select onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Độ ưu tiên">
            <Select
              options={dataPriority?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
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
            <Select onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Lặp lại">
            <Select onChange={handleChange} />
          </Form.Item>
        </div>
        <div className="form-right">
          <Form.Item label="Tên công việc">
            <Input placeholder="Nhập tên công việc" />
          </Form.Item>
          <Form.Item label="Loại nhiệm vụ">
            <Select
              options={dataTaskTypeLivestock?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Người thực hiện">
            <Select
              options={dataMember?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Người giám sát">
            <Select
              options={dataEmployee?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Dụng cụ">
            <Select
              options={dataMaterial?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
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
              options={dataLivestockZone?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Chuồng" required>
            <Select
              options={dataFieldByZone?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Độ ưu tiên">
            <Select onChange={handleChange} />
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
            <Select onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Lặp lại">
            <Select onChange={handleChange} />
          </Form.Item>
        </div>
        <div className="form-right">
          <Form.Item label="Tên công việc">
            <Input placeholder="Nhập tên công việc" />
          </Form.Item>
          <Form.Item label="Loại nhiệm vụ">
            <Select
              options={dataTaskTypeLivestock?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Người thực hiện">
            <Select
              options={dataMember?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Người giám sát">
            <Select
              options={dataEmployee?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Dụng cụ">
            <Select
              options={dataMaterial?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
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
  } else if (option === "specificPlant") {
    return (
      <div>
        <Form layout="vertical" className="task-specific-plant">
          <div className="form-left">
            <Form.Item label="Khu vực" required>
              <Select
                onChange={handleSelectChange}
                options={area?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </Form.Item>
            <Form.Item label="Vùng" required>
              <Select
                onChange={handleSelectZoneChange}
                options={dataPlantZone?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </Form.Item>

            <Form.Item label="Vườn">
              <Select
                options={dataFieldByZone?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </Form.Item>
            <Form.Item label="Id cây trồng">
              <Select onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Độ ưu tiên">
              <Select onChange={handleChange} />
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
              <Select onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Lặp lại">
              <Select onChange={handleChange} />
            </Form.Item>
          </div>
          <div className="form-right">
            <Form.Item label="Tên công việc">
              <Input placeholder="Nhập tên công việc" />
            </Form.Item>
            <Form.Item label="Loại nhiệm vụ">
              <Select
                options={dataTaskTypePlant?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </Form.Item>
            <Form.Item label="Người thực hiện">
              <Select
                options={dataMember?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </Form.Item>

            <Form.Item label="Người giám sát">
              <Select
                options={dataEmployee?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </Form.Item>
            <Form.Item label="Dụng cụ">
              <Select
                options={dataMaterial?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
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
      </div>
    );
  } else if (option === "wholeGarden") {
    return (
      <Form layout="vertical" className="task-whole-garden">
        <div className="form-left">
          <Form.Item label="Khu vực" required>
            <Select
              onChange={handleSelectChange}
              options={area?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Vùng" required>
            <Select
              onChange={handleSelectZoneChange}
              options={dataPlantZone?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Vườn">
            <Select
              options={dataFieldByZone?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Độ ưu tiên">
            <Select onChange={handleChange} />
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
            <Select onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Lặp lại">
            <Select onChange={handleChange} />
          </Form.Item>
        </div>
        <div className="form-right">
          <Form.Item label="Tên công việc">
            <Input placeholder="Nhập tên công việc" />
          </Form.Item>
          <Form.Item label="Loại nhiệm vụ">
            <Select
              options={dataTaskTypePlant?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Người thực hiện">
            <Select
              options={dataMember?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Người giám sát">
            <Select
              options={dataEmployee?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Dụng cụ">
            <Select
              options={dataMaterial?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
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
  }
  return null;
}

export default ThirdModal;
