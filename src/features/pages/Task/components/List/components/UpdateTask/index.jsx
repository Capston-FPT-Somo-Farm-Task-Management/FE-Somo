import { Button, Form, Input, Modal, Select } from "antd";
import dayjs from "dayjs";
import { getAnimalActive } from "features/slice/animal/animalSlice";
import { getAreaActive } from "features/slice/area/areaSlice";
import { getEmployeeByTaskTypeAndFarmId } from "features/slice/employee/employeeSlice";
import { getFieldByZone } from "features/slice/field/fieldByZoneSlice";
import { getMaterial } from "features/slice/material/materialSlice";
import { getPlantActive } from "features/slice/plant/plantSlice";
import { getSupervisor } from "features/slice/supervisor/supervisorSlice";
import { createTask } from "features/slice/task/taskSlice";
import { getTaskTypeLivestock } from "features/slice/task/taskTypeAnimalSlice";
import { getTaskTypePlant } from "features/slice/task/taskTypePlantSlice";
import { getMemberById } from "features/slice/user/memberSlice";
import { getZoneByAreaAnimal } from "features/slice/zone/zoneAnimalSlice";
import { getZoneByAreaPlant } from "features/slice/zone/zonePlantSlice";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authServices } from "services/authServices";
import UpdateSpecificAnimal from "./components/UpdateSpecificAnimal";
import UpdateSpecificPlant from "./components/UpdateSpecificPlant";
import UpdateWholeBarn from "./components/UpdateWholeBarn";
import UpdateWholeGarden from "./components/UpdateWholeGarden";

function UpdateTask({
  editTaskModalVisible,
  closeEditTaskModal,
  editingTask,
  handleTaskAdded,
  handleDateChange,
  loadDataTask,
}) {
  const [selectedAreaId, setSelectedAreaId] = useState(null);
  const [selectedZoneId, setSelectedZoneId] = useState(null);
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [selectedTaskTypeId, setSelectedTaskTypeId] = useState(null);
  const [selectedFarmId, setSelectedFarmId] = useState(null);
  const [employeesValue, setEmployeesValue] = useState(null);
  const [materialsValue, setMaterialsValue] = useState(0);
  const [priorityValue, setPriorityValue] = useState("");
  const [remindValue, setRemindValue] = useState(0);
  const [repeatValue, setRepeatValue] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [description, setDescription] = useState("");
  const [shouldCheckRepeat, setShouldCheckRepeat] = useState(true);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const member = useSelector((state) => state.member.data);

  const farmId = member.farmId;
  console.log(farmId);

  const area = useSelector((state) => state.area.data);
  console.log(area);

  const zoneAnimal = useSelector((state) => state.zoneAnimal.data);
  console.log(zoneAnimal);

  const zonePlant = useSelector((state) => state.zonePlant.data);

  const animal = useSelector((state) => state.animal.data);
  const dataAnimal = animal.data;
  console.log(dataAnimal);

  const plant = useSelector((state) => state.plant.data);
  const dataPlant = plant.data;

  const fieldByZone = useSelector((state) => state.fieldByZone.data);
  console.log(fieldByZone);

  const taskTypeLivestock = useSelector(
    (state) => state.taskTypeLivestock.data
  );
  const dataTaskTypeLivestock = taskTypeLivestock.data;

  const taskTypePlant = useSelector((state) => state.taskTypePlant.data);
  const dataTaskTypePlant = taskTypePlant.data;

  const supervisor = useSelector((state) => state.supervisor.data);

  const dataEmployee = useSelector((state) => state.employee.data);

  const material = useSelector((state) => state.material.data);
  const dataMaterial = material.data;

  useEffect(() => {
    dispatch(getAreaActive(farmId));
    dispatch(getTaskTypeLivestock());
    dispatch(getTaskTypePlant());
    dispatch(getAnimalActive(selectedFieldId));
    dispatch(getPlantActive(selectedFieldId));
    dispatch(getSupervisor(farmId));
    dispatch(getMaterial());
    dispatch(getMemberById(authServices.getUserId()));
  }, [farmId, selectedFieldId]);

  useEffect(() => {
    if (selectedAreaId) {
      dispatch(getZoneByAreaAnimal(selectedAreaId));
      dispatch(getZoneByAreaPlant(selectedAreaId));
    }
  }, [selectedAreaId, editTaskModalVisible]);

  useEffect(() => {
    if (selectedZoneId) {
      dispatch(getFieldByZone(selectedZoneId));
    }
  }, [selectedZoneId, editTaskModalVisible]);

  useEffect(() => {
    if (selectedTaskTypeId) {
      dispatch(
        getEmployeeByTaskTypeAndFarmId({
          taskTypeId: selectedTaskTypeId,
          farmId: farmId,
        })
      );
      form.setFieldsValue({
        employeeIds: undefined,
      });
    }
  }, [selectedTaskTypeId, editTaskModalVisible]);

  useEffect(() => {
    if (endDate && startDate && startDate.isAfter(endDate)) {
      form.setFieldsValue({
        endDate: null,
        dates: null,
      });
    }
  }, [startDate, endDate]);

  const handleSelectAreaChange = (value) => {
    setSelectedAreaId(value);
    form.setFieldsValue({
      zoneId: null,
      fieldId: null,
    });
  };

  const handleSelectZoneChange = async (value) => {
    setSelectedZoneId(value);
    form.setFieldsValue({
      fieldId: null,
    });

    try {
      await dispatch(
        getEmployeeByTaskTypeAndFarmId({
          taskTypeId: selectedTaskTypeId,
          farmId: selectedFarmId,
        })
      );
    } catch (error) {}
  };

  const handleSelectFieldChange = (value) => {
    setSelectedFieldId(value);
  };

  const handlePriorityChange = (value) => {
    setPriorityValue(value);
  };

  const handleSelectStartDate = (date) => {
    setStartDate(date);
  };

  const handleSelectEndDate = (date) => {
    const selectedDate = dayjs(date).second(0);
    setEndDate(selectedDate);

    const startDate = form.getFieldValue("startDate");
    if (selectedDate.isAfter(startDate)) {
      form.setFieldsValue({ endDate: selectedDate });
      form.setFields([
        {
          name: "endDate",
          errors: [],
        },
      ]);
      const repeatDates = form.getFieldValue("dates");
      if (
        repeatDates &&
        repeatDates.some((date) => selectedDate.isAfter(dayjs(date)))
      ) {
        form.setFieldsValue({ dates: null });
      }
      form.setFields([
        {
          name: "dates",
          value: form.getFieldValue("dates"),
          errors: [],
        },
      ]);
    } else {
      form.setFieldsValue({ endDate: null });
      form.setFields([
        {
          name: "endDate",
          errors: ["Không được chọn trước ngày bắt đầu"],
        },
      ]);
      form.setFieldsValue({ dates: null });
      form.setFields([
        {
          name: "dates",
          value: form.getFieldValue("dates"),
          errors: ["Không thể chọn ngày lặp"],
        },
      ]);
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTaskTypeChange = (value) => {
    setSelectedTaskTypeId(value);
  };

  const handleEmployeeChange = (value) => {
    setEmployeesValue(value);
  };

  const handleMaterialChange = (value) => {
    setMaterialsValue(value);
  };

  const handleSelectRemind = (value) => {
    setRemindValue(parseInt(value, 10));
  };

  const handleSelectRepeat = (value) => {
    setRepeatValue(value === "Có");
    setShouldCheckRepeat(value === "Có");
  };

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  const transformData = (originalData) => {
    const transformedData = {
      employeeIds: originalData.employeeIds,
      materialIds: originalData.materialIds,
      dates: originalData.dates,
      farmTask: {
        name: originalData.name,
        startDate: originalData.startDate,
        endDate: originalData.endDate,
        description: originalData.description,
        priority: originalData.priority,
        isRepeat: originalData.isRepeat,
        suppervisorId: originalData.suppervisorId,
        fieldId: originalData.fieldId,
        taskTypeId: originalData.taskTypeId,
        managerId: originalData.managerId,
        otherId: originalData.otherId,
        plantId: originalData.plantId,
        liveStockId: originalData.liveStockId,
        remind: originalData.remind,
      },
    };

    return transformedData;
  };

  const handleUpdateTask = (values) => {
    form
      .validateFields()
      .then(() => {
        const startDateFormatted = dayjs(startDate)
          .second(0)
          .format("YYYY-MM-DD[T]HH:mm:ss.SSS");
        const endDateFormatted = dayjs(endDate)
          .second(0)
          .format("YYYY-MM-DD[T]HH:mm:ss.SSS");

        const startTime = dayjs(startDate).format("HH:mm:ss.SSS");

        const selectedDates = values.dates || [];

        const combinedDates = selectedDates.map(
          (date) => `${date}T${startTime}`
        );

        const remindValueToSend = remindValue || 0;

        const repeatValueToSend = repeatValue || false;

        const datesToSend = repeatValueToSend ? combinedDates : [];

        const materialToSend = materialsValue || [];

        const { isRepeat, dates } = values;

        if (shouldCheckRepeat && isRepeat && (!dates || dates.length === 0)) {
          form.setFields([
            {
              name: "dates",
              errors: ["Vui lòng chọn ngày lặp lại"],
            },
          ]);
          return;
        }

        const finalValues = {
          ...values,
          startDate: startDateFormatted,
          endDate: endDateFormatted,
          dates: datesToSend,
          materialIds: materialToSend,
          priority: priorityValue,
          remind: remindValueToSend,
          isRepeat: repeatValueToSend,
          description: description,
          managerId: member.id,
          otherId: 0,
        };

        const transformedValues = transformData(finalValues);

        dispatch(createTask(transformedValues)).then(() => {
          loadDataTask();
          handleDateChange();
          handleTaskAdded();
        });
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  return (
    <>
      {editTaskModalVisible && (
        <Modal
          title="Cập nhật công việc"
          visible={editTaskModalVisible}
          onCancel={closeEditTaskModal}
          width={900}
          footer={[
            <Button type="primary" onClick={closeEditTaskModal}>
              Đóng
            </Button>,
            <Button form="updateTask" type="primary" htmlType="submit">
              Lưu thay đổi
            </Button>,
          ]}
        >
          {/* {taskTypeLivestock && dataAnimal ? ( */}
          <UpdateSpecificAnimal
            handleUpdateTask={handleUpdateTask}
            form={form}
            editingTask={editingTask}
            handleSelectAreaChange={handleSelectAreaChange}
            handleSelectZoneChange={handleSelectZoneChange}
            handleSelectFieldChange={handleSelectFieldChange}
            handlePriorityChange={handlePriorityChange}
            handleSelectStartDate={handleSelectStartDate}
            handleSelectEndDate={handleSelectEndDate}
            handleDescriptionChange={handleDescriptionChange}
            handleTaskTypeChange={handleTaskTypeChange}
            handleEmployeeChange={handleEmployeeChange}
            handleMaterialChange={handleMaterialChange}
            handleSelectRemind={handleSelectRemind}
            handleSelectRepeat={handleSelectRepeat}
            area={area}
            zoneAnimal={zoneAnimal}
            fieldByZone={fieldByZone}
            dataAnimal={dataAnimal}
            priorityValue={priorityValue}
            disabledDate={disabledDate}
            description={description}
            dataTaskTypeLivestock={dataTaskTypeLivestock}
            supervisor={supervisor}
            employeesValue={employeesValue}
            dataEmployee={dataEmployee}
            materialsValue={materialsValue}
            dataMaterial={dataMaterial}
            remindValue={remindValue}
            repeatValue={repeatValue}
            startDate={startDate}
            endDate={endDate}
          />
          {/* ) : ( */}
          {/* <UpdateWholeBarn
          handleUpdateTask={handleUpdateTask}
            form={form}
                editingTask={editingTask}
                handleSelectAreaChange={handleSelectAreaChange}
                handleSelectZoneChange={handleSelectZoneChange}
                handleSelectFieldChange={handleSelectFieldChange}
                handlePriorityChange={handlePriorityChange}
                handleSelectStartDate={handleSelectStartDate}
                handleSelectEndDate={handleSelectEndDate}
                handleDescriptionChange={handleDescriptionChange}
                handleTaskTypeChange={handleTaskTypeChange}
                handleEmployeeChange={handleEmployeeChange}
                handleMaterialChange={handleMaterialChange}
                handleSelectRemind={handleSelectRemind}
                handleSelectRepeat={handleSelectRepeat}
                area={area}
                zoneAnimal={zoneAnimal}
                fieldByZone={fieldByZone}
                priorityValue={priorityValue}
                disabledDate={disabledDate}
                description={description}
                dataTaskTypeLivestock={dataTaskTypeLivestock}
                supervisor={supervisor}
                employeesValue={employeesValue}
                dataEmployee={dataEmployee}
                materialsValue={materialsValue}
                dataMaterial={dataMaterial}
                remindValue={remindValue}
                repeatValue={repeatValue}
                startDate={startDate}
                endDate={endDate}
              /> */}
          {/* )} */}

          {/* {taskTypePlant && dataPlant ? (
              <UpdateSpecificPlant
              handleUpdateTask={handleUpdateTask}
            form={form}
                editingTask={editingTask}
                handleSelectAreaChange={handleSelectAreaChange}
                handleSelectZoneChange={handleSelectZoneChange}
                handleSelectFieldChange={handleSelectFieldChange}
                handlePriorityChange={handlePriorityChange}
                handleSelectStartDate={handleSelectStartDate}
                handleSelectEndDate={handleSelectEndDate}
                handleDescriptionChange={handleDescriptionChange}
                handleTaskTypeChange={handleTaskTypeChange}
                handleEmployeeChange={handleEmployeeChange}
                handleMaterialChange={handleMaterialChange}
                handleSelectRemind={handleSelectRemind}
                handleSelectRepeat={handleSelectRepeat}
                area={area}
                zonePlant={zonePlant}
                fieldByZone={fieldByZone}
                dataPlant={dataPlant}
                priorityValue={priorityValue}
                disabledDate={disabledDate}
                description={description}
                dataTaskTypePlant={dataTaskTypePlant}
                supervisor={supervisor}
                employeesValue={employeesValue}
                dataEmployee={dataEmployee}
                materialsValue={materialsValue}
                dataMaterial={dataMaterial}
                remindValue={remindValue}
                repeatValue={repeatValue}
                startDate={startDate}
                endDate={endDate}
              />
            ) : (
              <UpdateWholeGarden
              handleUpdateTask={handleUpdateTask}
            form={form}
                editingTask={editingTask}
                handleSelectAreaChange={handleSelectAreaChange}
                handleSelectZoneChange={handleSelectZoneChange}
                handleSelectFieldChange={handleSelectFieldChange}
                handlePriorityChange={handlePriorityChange}
                handleSelectStartDate={handleSelectStartDate}
                handleSelectEndDate={handleSelectEndDate}
                handleDescriptionChange={handleDescriptionChange}
                handleTaskTypeChange={handleTaskTypeChange}
                handleEmployeeChange={handleEmployeeChange}
                handleMaterialChange={handleMaterialChange}
                handleSelectRemind={handleSelectRemind}
                handleSelectRepeat={handleSelectRepeat}
                area={area}
                zonePlant={zonePlant}
                fieldByZone={fieldByZone}
                priorityValue={priorityValue}
                disabledDate={disabledDate}
                description={description}
                dataTaskTypePlant={dataTaskTypePlant}
                supervisor={supervisor}
                employeesValue={employeesValue}
                dataEmployee={dataEmployee}
                materialsValue={materialsValue}
                dataMaterial={dataMaterial}
                remindValue={remindValue}
                repeatValue={repeatValue}
                startDate={startDate}
                endDate={endDate}
              />
            )} */}
        </Modal>
      )}
    </>
  );
}

export default UpdateTask;
