import { DatePicker, Form, Input, Select } from "antd";
import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { useSelector, useDispatch } from "react-redux";
import { getAreaActive } from "../../../../../../slice/area/areaSlice";
import { getZoneByAreaPlant } from "../../../../../../slice/zone/zonePlantSlice";
import { getZoneByAreaAnimal } from "features/slice/zone/zoneAnimalSlice";
import { getFieldByZone } from "features/slice/field/fieldByZoneSlice";
import { getTaskTypePlant } from "features/slice/task/taskTypePlant";
import { getTaskTypeLivestock } from "features/slice/task/taskTypeAnimal";
import { getReceiver } from "features/slice/receiver/receiverSlice";
import { getEmployee } from "features/slice/employee/employeeSlice";
import { getMaterial } from "features/slice/material/materialSlice";
import { getAnimals } from "features/slice/animal/animalSlice";
import { createTask } from "features/slice/task/taskSlice";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
dayjs.extend(customParseFormat);

function ThirdModal({ option }) {
  const [description, setDescription] = useState("");
  const [selectedAreaId, setSelectedAreaId] = useState(null);
  const [selectedZoneId, setSelectedZoneId] = useState(null);
  // const [employeesValue, setEmployeesValue] = useState(0);
  const [priorityValue, setPriorityValue] = useState("");
  const [remindValue, setRemindValue] = useState(0);
  const [repeatValue, setRepeatValue] = useState(false);

  const area = useSelector((state) => state.area.data);

  const zonePlant = useSelector((state) => state.zonePlant.data);
  const dataPlantZone = zonePlant.data;

  const zoneAnimal = useSelector((state) => state.zoneAnimal.data);
  const dataAnimalZone = zoneAnimal.data;

  const animal = useSelector((state) => state.animal.data);
  const dataAnimal = animal.data;

  const fieldByZone = useSelector((state) => state.fieldByZone.data);
  const dataFieldByZone = fieldByZone.data;

  const taskTypePlant = useSelector((state) => state.taskTypePlant.data);
  const dataTaskTypePlant = taskTypePlant.data;

  const taskTypeLivestock = useSelector(
    (state) => state.taskTypeLivestock.data
  );
  const dataTaskTypeLivestock = taskTypeLivestock.data;

  const receiver = useSelector((state) => state.receiver.data);
  const dataReceiver = receiver.data;

  console.log(dataReceiver);

  const dataEmployee = useSelector((state) => state.employee.data);

  const material = useSelector((state) => state.material.data);
  const dataMaterial = material.data;

  console.log(area.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAreaActive());
    dispatch(getTaskTypePlant());
    dispatch(getTaskTypeLivestock());
    dispatch(getAnimals());
    dispatch(getReceiver());
    dispatch(getEmployee());
    dispatch(getMaterial());
  }, []);

  useEffect(() => {
    if (selectedAreaId) {
      dispatch(getZoneByAreaPlant(selectedAreaId));
      dispatch(getZoneByAreaAnimal(selectedAreaId));
    }
    if (selectedZoneId) {
      dispatch(getFieldByZone(selectedZoneId));
    }
  }, [selectedAreaId, selectedZoneId]);

  const handleSelectAreaChange = (value) => {
    setSelectedAreaId(value);
  };
  const handleSelectZoneChange = (value) => {
    setSelectedZoneId(value);
  };

  const transformData = (originalData) => {
    const transformedData = {
      employeeIds: [originalData.employeeIds],
      materialIds: [originalData.materialIds],
      dates: [originalData.dates],
      farmTask: {
        name: originalData.name,
        startDate: originalData.startDate,
        endDate: originalData.endDate,
        description: originalData.description,
        priority: originalData.priority,
        repeat: originalData.repeat,
        iterations: originalData.iterations,
        suppervisorId: originalData.suppervisorId,
        fieldId: originalData.fieldId,
        taskTypeId: originalData.taskTypeId,
        managerId: originalData.managerId,
        otherId: originalData.otherId,
        plantId: originalData.plantId, // Assuming externalId corresponds to plantId
        liveStockId: originalData.liveStockId, // Assuming externalId corresponds to plantId
        remind: originalData.remind, // You might want to fill this with an appropriate value
      },
    };

    return transformedData;
  };

  const onFinish = (values) => {
    const finalValues = {
      ...values,
      startDate: dayjs(values.startDate).format("YYYY-MM-DD[T]HH:mm:ss.SSS"),
      endDate: dayjs(values.endDate).format("YYYY-MM-DD[T]HH:mm:ss.SSS"),
      dates: dayjs(values.dates).format("YYYY-MM-DD[T]HH:mm:ss.SSS"),
      // employeeIds: employeesValue,
      priority: priorityValue,
      remind: remindValue,
      repeat: repeatValue,
      description: description,
      iterations: 0,
      suppervisorId: 1,
      managerId: 1,
      otherId: null,
      plantId: null,
    };

    const transformedValues = transformData(finalValues);

    dispatch(createTask(transformedValues));
  };

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  const { TextArea } = Input;

  if (option === "specificAnimal") {
    return (
      <Form
        layout="vertical"
        className="task-specific-animal"
        onFinish={onFinish}
        id="createTask"
      >
        <div className="form-left">
          <Form.Item
            label="Khu vực"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn khu vực",
              },
            ]}
            required
          >
            <Select
              onChange={handleSelectAreaChange}
              placeholder="Chọn khu vực"
              options={area.data?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Vùng"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn vùng",
              },
            ]}
            required
          >
            <Select
              onChange={handleSelectZoneChange}
              placeholder="Chọn vùng"
              options={dataAnimalZone?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Chuồng" name="fieldId" required>
            <Select
              placeholder="Chọn chuồng"
              options={dataFieldByZone?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Mã vật nuôi" name="liveStockId" required>
            <Select
              placeholder="Chọn mã vật nuôi"
              options={dataAnimal?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Độ ưu tiên" name="priority" required>
            <Select
              value={priorityValue}
              onChange={(value) => setPriorityValue(value)}
              placeholder="Chọn độ ưu tiên"
            >
              <Select.Option value="Thấp nhất">Thấp nhất</Select.Option>
              <Select.Option value="Thấp">Thấp</Select.Option>
              <Select.Option value="Trung bình">Trung bình</Select.Option>
              <Select.Option value="Cao">Cao</Select.Option>
              <Select.Option value="Cao nhất">Cao nhất</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Chọn thời gian bắt đầu"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn thời gian bắt đầu",
              },
            ]}
            name="startDate"
          >
            <DatePicker
              placeholder="Chọn thời gian bắt đầu"
              format="YYYY-MM-DD[T]HH:mm:ss.SSS"
              disabledDate={disabledDate}
              showTime={{
                defaultValue: dayjs("00:00:00", "HH:mm:ss"),
              }}
            />
          </Form.Item>
          <Form.Item
            label="Chọn thời gian kết thúc"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn khoảng thời gian kết thúc",
              },
            ]}
            name="endDate"
          >
            <DatePicker
              placeholder="Chọn thời gian kết thúc"
              format="YYYY-MM-DD[T]HH:mm:ss.SSS"
              disabledDate={disabledDate}
              showTime={{
                defaultValue: dayjs("00:00:00", "HH:mm:ss"),
              }}
            />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Thêm mô tả chi tiết cho công việc"
            />
          </Form.Item>
        </div>
        <div className="form-right">
          <Form.Item label="Tên công việc" name="name" required>
            <Input placeholder="Nhập tên công việc" />
          </Form.Item>
          <Form.Item label="Loại nhiệm vụ" name="taskTypeId" required>
            <Select
              placeholder="Chọn loại nhiệm vụ"
              options={dataTaskTypeLivestock?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Người thực hiện" name="employeeIds" required>
            <Select
              // mode="multiple"
              // value={employeesValue}
              // onChange={(value) => setEmployeesValue(value)}
              placeholder="Chọn người thực hiện"
              options={dataEmployee?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Người giám sát" name="receiverId" required>
            <Select
              placeholder="Chọn người giám sát"
              options={dataReceiver?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Dụng cụ" name="materialIds">
            <Select
              placeholder="Chọn dụng cụ"
              options={dataMaterial?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Nhắc lại" name="remind">
            <Select
              value={remindValue}
              onChange={(value) => setRemindValue(value)}
              placeholder="Không"
            >
              <Select.Option value="0">Không</Select.Option>
              <Select.Option value="5">Sau 5 phút</Select.Option>
              <Select.Option value="10">Sau 10 phút</Select.Option>
              <Select.Option value="15">Sau 15 phút</Select.Option>
              <Select.Option value="20">Sau 20 phút</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Lặp lại" name="isRepeat">
            <Select
              value={repeatValue}
              onChange={(value) => setRepeatValue(value === "Có")}
              placeholder="Không"
            >
              <Select.Option value="Không">Không</Select.Option>
              <Select.Option value="Có">Có</Select.Option>
            </Select>
          </Form.Item>

          {repeatValue && (
            <Form.Item label="Lặp những ngày" rules={[{ required: true }]}>
              <DatePicker placeholder="Chọn những ngày lặp" />
            </Form.Item>
          )}
        </div>
      </Form>
    );
  } else if (option === "wholeBarn") {
    return (
      <Form
        layout="vertical"
        className="task-whole-barn"
        onFinish={onFinish}
        id="createTask"
      >
        <div className="form-left">
          <Form.Item
            label="Khu vực"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn khu vực",
              },
            ]}
            required
          >
            <Select
              onChange={handleSelectAreaChange}
              placeholder="chọn khu vực"
              options={area.data?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Vùng"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn vùng",
              },
            ]}
            required
          >
            <Select
              onChange={handleSelectZoneChange}
              placeholder="Chọn vùng"
              options={dataAnimalZone?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Chuồng" name="fieldId" required>
            <Select
              placeholder="Chọn chuồng"
              options={dataFieldByZone?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Độ ưu tiên" required>
            <Select
              value={priorityValue}
              onChange={(value) => setPriorityValue(value)}
              placeholder="Chọn độ ưu tiên"
            >
              <Select.Option value="lowest">Thấp nhất</Select.Option>
              <Select.Option value="low">Thấp</Select.Option>
              <Select.Option value="medium">Trung bình</Select.Option>
              <Select.Option value="high">Cao</Select.Option>
              <Select.Option value="highest">Cao nhất</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Chọn thời gian bắt đầu"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn thời gian bắt đầu",
              },
            ]}
            name="startDate"
          >
            <DatePicker
              placeholder="Chọn thời gian bắt đầu"
              format="YYYY-MM-DD[T]HH:mm:ss.SSS"
              disabledDate={disabledDate}
              showTime={{
                defaultValue: dayjs("00:00:00", "HH:mm:ss"),
              }}
            />
          </Form.Item>
          <Form.Item
            label="Chọn thời gian kết thúc"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn khoảng thời gian kết thúc",
              },
            ]}
            name="endDate"
          >
            <DatePicker
              placeholder="Chọn thời gian kết thúc"
              format="YYYY-MM-DD[T]HH:mm:ss.SSS"
              disabledDate={disabledDate}
              showTime={{
                defaultValue: dayjs("00:00:00", "HH:mm:ss"),
              }}
            />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Thêm mô tả chi tiết cho công việc"
            />
          </Form.Item>
        </div>
        <div className="form-right">
          <Form.Item label="Tên công việc" required>
            <Input placeholder="Nhập tên công việc" />
          </Form.Item>
          <Form.Item label="Loại nhiệm vụ" required>
            <Select
              placeholder="Chọn loại nhiệm vụ"
              options={dataTaskTypeLivestock?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Người thực hiện" name="employeeIds" required>
            <Select
              // mode="multiple"
              // value={employeesValue}
              // onChange={(value) => setEmployeesValue(value)}
              placeholder="Chọn người thực hiện"
              options={dataEmployee?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Người giám sát" name="receiverId" required>
            <Select
              placeholder="Chọn người giám sát"
              options={dataReceiver?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Dụng cụ">
            <Select
              placeholder="Chọn dụng cụ"
              options={dataMaterial?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Nhắc lại" name="remind">
            <Select
              value={remindValue}
              onChange={(value) => setRemindValue(value)}
              placeholder="Không"
            >
              <Select.Option value="0">0</Select.Option>
              <Select.Option value="5">5</Select.Option>
              <Select.Option value="10">10</Select.Option>
              <Select.Option value="15">15</Select.Option>
              <Select.Option value="20">20</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Lặp lại" name="isRepeat">
            <Select
              value={repeatValue}
              onChange={(value) => setRepeatValue(value === "Có")}
              placeholder="Không"
            >
              <Select.Option value="Không">Không</Select.Option>
              <Select.Option value="Có">Có</Select.Option>
            </Select>
          </Form.Item>

          {repeatValue && (
            <Form.Item label="Lặp những ngày" rules={[{ required: true }]}>
              <DatePicker placeholder="Chọn những ngày lặp" />
            </Form.Item>
          )}
        </div>
      </Form>
    );
  } else if (option === "specificPlant") {
    return (
      <div>
        <Form
          layout="vertical"
          className="task-specific-plant"
          onFinish={onFinish}
          id="createTask"
        >
          <div className="form-left">
            <Form.Item
              label="Khu vực"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn khu vực",
                },
              ]}
              required
            >
              <Select
                onChange={handleSelectAreaChange}
                options={area.data?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </Form.Item>
            <Form.Item
              label="Vùng"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn vùng",
                },
              ]}
              required
            >
              <Select
                onChange={handleSelectZoneChange}
                placeholder="Chọn vùng"
                options={dataPlantZone?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </Form.Item>

            <Form.Item label="Vườn" name="fieldId">
              <Select
                placeholder="Chọn vườn"
                options={dataFieldByZone?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </Form.Item>
            <Form.Item
              label="Mã cây trồng"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã cây trồng",
                },
              ]}
              name="externalId"
            >
              <Input placeholder="Nhập mã cây trồng" />
            </Form.Item>
            <Form.Item label="Độ ưu tiên" required>
              <Select
                value={priorityValue}
                onChange={(value) => setPriorityValue(value)}
                placeholder="Chọn độ ưu tiên"
              >
                <Select.Option value="lowest">Thấp nhất</Select.Option>
                <Select.Option value="low">Thấp</Select.Option>
                <Select.Option value="medium">Trung bình</Select.Option>
                <Select.Option value="high">Cao</Select.Option>
                <Select.Option value="highest">Cao nhất</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Chọn thời gian bắt đầu"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn thời gian bắt đầu",
                },
              ]}
              name="startDate"
            >
              <DatePicker
                placeholder="Chọn thời gian bắt đầu"
                format="YYYY-MM-DD[T]HH:mm:ss.SSS"
                disabledDate={disabledDate}
                showTime={{
                  defaultValue: dayjs("00:00:00", "HH:mm:ss"),
                }}
              />
            </Form.Item>
            <Form.Item
              label="Chọn thời gian kết thúc"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn khoảng thời gian kết thúc",
                },
              ]}
              name="endDate"
            >
              <DatePicker
                placeholder="Chọn thời gian kết thúc"
                format="YYYY-MM-DD[T]HH:mm:ss.SSS"
                disabledDate={disabledDate}
                showTime={{
                  defaultValue: dayjs("00:00:00", "HH:mm:ss"),
                }}
              />
            </Form.Item>
            <Form.Item label="Mô tả" name="description">
              <TextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Thêm mô tả chi tiết cho công việc"
              />
            </Form.Item>
          </div>
          <div className="form-right">
            <Form.Item label="Tên công việc" required>
              <Input placeholder="Nhập tên công việc" />
            </Form.Item>
            <Form.Item label="Loại nhiệm vụ" required>
              <Select
                placeholder="Chọn loại nhiệm vụ"
                options={dataTaskTypePlant?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </Form.Item>
            <Form.Item label="Người thực hiện" name="employeeIds" required>
              <Select
                // mode="multiple"
                // value={employeesValue}
                // onChange={(value) => setEmployeesValue(value)}
                placeholder="Chọn người thực hiện"
                options={dataEmployee?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </Form.Item>
            <Form.Item label="Người giám sát" name="receiverId" required>
              <Select
                placeholder="Chọn người giám sát"
                options={dataReceiver?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </Form.Item>
            <Form.Item label="Dụng cụ">
              <Select
                placeholder="Chọn dụng cụ"
                options={dataMaterial?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </Form.Item>
            <Form.Item label="Nhắc lại" name="remind">
              <Select
                value={remindValue}
                onChange={(value) => setRemindValue(value)}
                placeholder="Không"
              >
                <Select.Option value="0">0</Select.Option>
                <Select.Option value="5">5</Select.Option>
                <Select.Option value="10">10</Select.Option>
                <Select.Option value="15">15</Select.Option>
                <Select.Option value="20">20</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Lặp lại" name="isRepeat">
              <Select
                value={repeatValue}
                onChange={(value) => setRepeatValue(value === "Có")}
                placeholder="Không"
              >
                <Select.Option value="Không">Không</Select.Option>
                <Select.Option value="Có">Có</Select.Option>
              </Select>
            </Form.Item>

            {repeatValue && (
              <Form.Item label="Lặp những ngày" rules={[{ required: true }]}>
                <DatePicker placeholder="Chọn những ngày lặp" />
              </Form.Item>
            )}
          </div>
        </Form>
      </div>
    );
  } else if (option === "wholeGarden") {
    return (
      <Form
        layout="vertical"
        className="task-whole-garden"
        onFinish={onFinish}
        id="createTask"
      >
        <div className="form-left">
          <Form.Item
            label="Khu vực"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn khu vực",
              },
            ]}
            required
          >
            <Select
              onChange={handleSelectAreaChange}
              options={area.data?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Vùng"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn vùng",
              },
            ]}
            required
          >
            <Select
              onChange={handleSelectZoneChange}
              placeholder="Chọn vùng"
              options={dataPlantZone?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Vườn" name="fieldId">
            <Select
              placeholder="Chọn vườn"
              options={dataFieldByZone?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Độ ưu tiên" required>
            <Select
              value={priorityValue}
              onChange={(value) => setPriorityValue(value)}
              placeholder="Chọn độ ưu tiên"
            >
              <Select.Option value="lowest">Thấp nhất</Select.Option>
              <Select.Option value="low">Thấp</Select.Option>
              <Select.Option value="medium">Trung bình</Select.Option>
              <Select.Option value="high">Cao</Select.Option>
              <Select.Option value="highest">Cao nhất</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Chọn thời gian bắt đầu"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn thời gian bắt đầu",
              },
            ]}
            name="startDate"
          >
            <DatePicker
              placeholder="Chọn thời gian bắt đầu"
              format="YYYY-MM-DD[T]HH:mm:ss.SSS"
              disabledDate={disabledDate}
              showTime={{
                defaultValue: dayjs("00:00:00", "HH:mm:ss"),
              }}
            />
          </Form.Item>
          <Form.Item
            label="Chọn thời gian kết thúc"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn khoảng thời gian kết thúc",
              },
            ]}
            name="endDate"
          >
            <DatePicker
              placeholder="Chọn thời gian kết thúc"
              format="YYYY-MM-DD[T]HH:mm:ss.SSS"
              disabledDate={disabledDate}
              showTime={{
                defaultValue: dayjs("00:00:00", "HH:mm:ss"),
              }}
            />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Thêm mô tả chi tiết cho công việc"
            />
          </Form.Item>
        </div>
        <div className="form-right">
          <Form.Item label="Tên công việc" required>
            <Input placeholder="Nhập tên công việc" />
          </Form.Item>
          <Form.Item label="Loại nhiệm vụ" required>
            <Select
              placeholder="Chọn loại nhiệm vụ"
              options={dataTaskTypePlant?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Người thực hiện" name="employeeIds" required>
            <Select
              // mode="multiple"
              // value={employeesValue}
              // onChange={(value) => setEmployeesValue(value)}
              placeholder="Chọn người thực hiện"
              options={dataEmployee?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Người giám sát" name="receiverId" required>
            <Select
              placeholder="Chọn người giám sát"
              options={dataReceiver?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Dụng cụ">
            <Select
              placeholder="Chọn dụng cụ"
              options={dataMaterial?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Nhắc lại" name="remind">
            <Select
              value={remindValue}
              onChange={(value) => setRemindValue(value)}
              placeholder="Không"
            >
              <Select.Option value="0">0</Select.Option>
              <Select.Option value="5">5</Select.Option>
              <Select.Option value="10">10</Select.Option>
              <Select.Option value="15">15</Select.Option>
              <Select.Option value="20">20</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Lặp lại" name="isRepeat">
            <Select
              value={repeatValue}
              onChange={(value) => setRepeatValue(value === "Có")}
              placeholder="Không"
            >
              <Select.Option value="Không">Không</Select.Option>
              <Select.Option value="Có">Có</Select.Option>
            </Select>
          </Form.Item>

          {repeatValue && (
            <Form.Item label="Lặp những ngày" rules={[{ required: true }]}>
              <DatePicker placeholder="Chọn những ngày lặp" />
            </Form.Item>
          )}
        </div>
      </Form>
    );
  } else if (option === "other") {
    return (
      <Form
        layout="vertical"
        className="task-whole-garden"
        onFinish={onFinish}
        id="createTask"
      >
        <div className="form-left">
          <Form.Item
            label="Khu vực"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn khu vực",
              },
            ]}
            required
          >
            <Select
              onChange={handleSelectAreaChange}
              options={area.data?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Vùng"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn vùng",
              },
            ]}
            required
          >
            <Select
              onChange={handleSelectZoneChange}
              options={dataPlantZone?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Vườn" name="fieldId">
            <Select
              options={dataFieldByZone?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Độ ưu tiên" required>
            <Select
              value={priorityValue}
              onChange={(value) => setPriorityValue(value)}
            >
              <Select.Option value="lowest">Thấp nhất</Select.Option>
              <Select.Option value="low">Thấp</Select.Option>
              <Select.Option value="medium">Trung bình</Select.Option>
              <Select.Option value="high">Cao</Select.Option>
              <Select.Option value="highest">Cao nhất</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Chọn thời gian bắt đầu"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn thời gian bắt đầu",
              },
            ]}
            name="startDate"
          >
            <DatePicker
              placeholder="Chọn thời gian bắt đầu"
              format="YYYY-MM-DD[T]HH:mm:ss.SSS"
              disabledDate={disabledDate}
              showTime={{
                defaultValue: dayjs("00:00:00", "HH:mm:ss"),
              }}
            />
          </Form.Item>
          <Form.Item
            label="Chọn thời gian kết thúc"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn khoảng thời gian kết thúc",
              },
            ]}
            name="endDate"
          >
            <DatePicker
              placeholder="Chọn thời gian kết thúc"
              format="YYYY-MM-DD[T]HH:mm:ss.SSS"
              disabledDate={disabledDate}
              showTime={{
                defaultValue: dayjs("00:00:00", "HH:mm:ss"),
              }}
            />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Thêm mô tả chi tiết cho công việc"
            />
          </Form.Item>
        </div>
        <div className="form-right">
          <Form.Item label="Tên công việc" required>
            <Input placeholder="Nhập tên công việc" />
          </Form.Item>
          <Form.Item label="Loại nhiệm vụ" required>
            <Select
              options={dataTaskTypePlant?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Người thực hiện" name="employeeIds" required>
            <Select
              // mode="multiple"
              // value={employeesValue}
              // onChange={(value) => setEmployeesValue(value)}
              options={dataEmployee?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Người giám sát" name="receiverId" required>
            <Select
              options={dataReceiver?.map((item) => ({
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
          <Form.Item label="Nhắc lại" name="remind">
            <Select
              value={remindValue}
              onChange={(value) => setRemindValue(value)}
              placeholder="Không"
            >
              <Select.Option value="0">0</Select.Option>
              <Select.Option value="5">5</Select.Option>
              <Select.Option value="10">10</Select.Option>
              <Select.Option value="15">15</Select.Option>
              <Select.Option value="20">20</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Lặp lại" name="repeat">
            <Select
              value={repeatValue}
              onChange={(value) => setRepeatValue(value)}
            >
              <Select.Option value="Không">Không</Select.Option>
              <Select.Option value="Hàng ngày">Hàng ngày</Select.Option>
              <Select.Option value="Hàng tuần">Hàng tuần</Select.Option>
              <Select.Option value="Hàng tháng">Hàng tháng</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Lặp mỗi" name="iterations">
            <Select />
          </Form.Item>
          <Form.Item
            label="Lặp đến ngày"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn khoảng thời gian kết thúc",
              },
            ]}
          >
            <DatePicker
              placeholder="Chọn thời gian kết thúc"
              format="YYYY-MM-DD[T]HH:mm:ss.SSS"
              disabledDate={disabledDate}
              showTime={{
                defaultValue: dayjs("00:00:00", "HH:mm:ss"),
              }}
            />
          </Form.Item>
        </div>
      </Form>
    );
  }
  return null;
}

export default ThirdModal;
