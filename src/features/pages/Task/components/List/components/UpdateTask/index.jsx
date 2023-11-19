import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "antd";
import dayjs from "dayjs";
import { getAnimalActive } from "features/slice/animal/animalSlice";
import { getAreaActive } from "features/slice/area/areaSlice";
import { getEmployeeByTaskTypeAndFarmId } from "features/slice/employee/employeeSlice";
import { getFieldByZone } from "features/slice/field/fieldByZoneSlice";
import { getMaterialActiveByFarmId } from "features/slice/material/materialActiveByFarmSlice";
import { getPlantActive } from "features/slice/plant/plantSlice";
import { getSupervisor } from "features/slice/supervisor/supervisorSlice";
import { updateTask, updateTaskDraftToPrepare } from "features/slice/task/taskSlice";
import { getTaskTypeLivestock } from "features/slice/task/taskTypeAnimalSlice";
import { getTaskTypePlant } from "features/slice/task/taskTypePlantSlice";
import { getMemberById } from "features/slice/user/memberSlice";
import { getZoneByAreaAnimal } from "features/slice/zone/zoneAnimalSlice";
import { getZoneByAreaPlant } from "features/slice/zone/zonePlantSlice";
import { useSelector, useDispatch } from "react-redux";
import { authServices } from "services/authServices";
import UpdateSpecificAnimal from "./components/UpdateSpecificAnimal";
import UpdateSpecificPlant from "./components/UpdateSpecificPlant";
import UpdateWholeBarn from "./components/UpdateWholeBarn";
import UpdateWholeGarden from "./components/UpdateWholeGarden";
import UpdateTaskTypeOther from "./components/UpdateTaskTypeOther";
import { getAreaActiveByFarmId } from "features/slice/area/areaByFarmSlice";
import { getAreaWithZoneTypeLivestock } from "features/slice/area/areaLivestockWithZoneSlice";
import { getAreaWithZoneTypePlant } from "features/slice/area/areaPlantWithZoneSlice";
import { getZoneByAreaId } from "features/slice/zone/zoneByAreaSlice";
import { getTaskTypeActive } from "features/slice/task/taskTypeActiveSlice";
import {EditOutlined, CarryOutOutlined, CheckCircleOutlined} from '@ant-design/icons';

function UpdateTask({
  editTaskModalVisible,
  closeEditTaskModal,
  editingTask,
  handleTaskAdded,
  handleDateChange,
  loadDataTask,
  currentTaskId,
}) {
  const [selectedAreaId, setSelectedAreaId] = useState(
    editingTask ? editingTask.areaId : null
  );
  const [selectedZoneId, setSelectedZoneId] = useState(
    editingTask ? editingTask.zoneId : null
  );
  const [selectedFieldId, setSelectedFieldId] = useState(
    editingTask ? editingTask.fieldId : null
  );
  const [addressDetail, setAddressDetail] = useState("");
  const [selectedTaskTypeId, setSelectedTaskTypeId] = useState(
    editingTask ? editingTask.taskTypeId : null
  );
  const [materialsValue, setMaterialsValue] = useState(
    editingTask ? editingTask.materialId : []
  );
  const [priorityValue, setPriorityValue] = useState(
    editingTask ? editingTask.priority : ""
  );
  const [nameValue, setNameValue] = useState("");
  const [supervisorValue, setSupervisorValue] = useState(0);
  const [remindValue, setRemindValue] = useState(0);
  const [repeatValue, setRepeatValue] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [description, setDescription] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [shouldCheckRepeat, setShouldCheckRepeat] = useState(true);
  const [initialSelectedDays, setInitialSelectedDays] = useState([]);
  const [isDraft, setIsDraft] = useState(false);
  const [draftToPrepare, setDraftToPrepare] = useState(false)

  const handleUpdateDraft = () => {
    setIsDraft(true);
  };

  const handleUpdateTaskToDo = () => {
    setIsDraft(false);
  };

  const handleUpdateDraftToPrepareButton = () => {
    setDraftToPrepare(true);
  };

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const member = useSelector((state) => state.member.data);

  const farmId = member ? member.farmId : null;

  const areaByFarm = useSelector((state) => state.areaByFarm.data);

  const areaLivestockByZone = useSelector(
    (state) => state.areaLivestockByZone.data
  );
  const areaPlantByZone = useSelector((state) => state.areaPlantByZone.data);

  const zoneByArea = useSelector((state) => state.zoneByArea.data);

  const zoneAnimal = useSelector((state) => state.zoneAnimal.data);

  const zonePlant = useSelector((state) => state.zonePlant.data);

  const animal = useSelector((state) => state.animal.data);
  const dataAnimal = animal.data;

  const plant = useSelector((state) => state.plant.data);
  const dataPlant = plant.data;

  const fieldByZone = useSelector((state) => state.fieldByZone.data);

  const taskTypeActive = useSelector((state) => state.taskTypeActive.data);

  const taskTypeLivestock = useSelector(
    (state) => state.taskTypeLivestock.data
  );
  const dataTaskTypeLivestock = taskTypeLivestock.data;

  const taskTypePlant = useSelector((state) => state.taskTypePlant.data);
  const dataTaskTypePlant = taskTypePlant.data;

  const supervisor = useSelector((state) => state.supervisor.data);

  const material = useSelector((state) => state.materialActive.data);

  console.log("currentTaskId: ", currentTaskId);

  useEffect(() => {
    dispatch(getAreaActiveByFarmId(farmId));
    dispatch(getAreaWithZoneTypeLivestock(farmId));
    dispatch(getAreaWithZoneTypePlant(farmId));
    dispatch(getTaskTypeActive());
    dispatch(getTaskTypeLivestock());
    dispatch(getTaskTypePlant());
    dispatch(getAnimalActive(selectedFieldId));
    dispatch(getPlantActive(selectedFieldId));
    dispatch(getSupervisor(farmId));
    dispatch(getMaterialActiveByFarmId(farmId));
    dispatch(getMemberById(authServices.getUserId()));
  }, [farmId, selectedFieldId]);

  useEffect(() => {
    if (selectedAreaId) {
      dispatch(getZoneByAreaId(selectedAreaId));
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
    if (endDate && startDate && startDate.isAfter(endDate)) {
      form.setFieldsValue({
        endDate: null,
        dates: null,
      });
    }
  }, [startDate, endDate]);

  const handleSelectAreaChange = (value) => {
    setSelectedAreaId(value);
    setSelectedZoneId(value);
    setSelectedFieldId(value);
    console.log(value);
    form.setFieldsValue({
      zoneId: null,
      fieldId: null,
      liveStockId: null,
      plantId: null,
      addressDetail: null,
    });
  };

  const handleSelectZoneChange = (value) => {
    setSelectedZoneId(value);
    setSelectedFieldId(value);
    form.setFieldsValue({
      fieldId: null,
      liveStockId: null,
      plantId: null,
    });
  };

  const handleSelectFieldChange = (value) => {
    setSelectedFieldId(value);
    form.setFieldsValue({
      liveStockId: null,
      plantId: null,
    });
  };

  const handlePriorityChange = (value) => {
    setPriorityValue(value);
  };

  const handleSelectStartDate = (date) => {
    setStartDate(date);

    const currentEndDate = form.getFieldValue("endDate");

    if (currentEndDate && date.isAfter(dayjs(currentEndDate))) {
      form.setFieldsValue({
        endDate: null,
        dates: null,
      });

      form.setFields([
        {
          name: "endDate",
          errors: [],
        },
        {
          name: "dates",
          errors: [],
        },
      ]);
    }
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
          errors: ["Vui lòng chọn lại"],
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

  const handleNameChange = (e) => {
    setNameValue(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSupervisorChange = (value) => {
    setSupervisorValue(value);
  };

  const handleTaskTypeChange = (value) => {
    setSelectedTaskTypeId(value);
  };

  const handleMaterialChange = (value) => {
    setMaterialsValue(value);
  };

  const handleSelectRemind = (value) => {
    setRemindValue(parseInt(value, 10));
  };

  const handleSelectRepeat = (value) => {
    setRepeatValue(value === "true");
    setShouldCheckRepeat(value === "true");
    console.log(shouldCheckRepeat);
  };

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  const transformData = (originalData) => {
    const transformedData = {
      materialIds: originalData.materialIds,
      dates: originalData.dates,
      taskModel: {
        name: originalData.name,
        startDate: originalData.startDate,
        endDate: originalData.endDate,
        description: originalData.description,
        priority: originalData.priority,
        supervisorId: originalData.supervisorId,
        managerId: originalData.managerId,
        fieldId: originalData.fieldId,
        isRepeat: originalData.isRepeat,
        taskTypeId: originalData.taskTypeId,
        plantId: originalData.plantId,
        liveStockId: originalData.liveStockId,
        addressDetail: originalData.addressDetail,
        remind: originalData.remind,
      },
    };

    return transformedData;
  };

  const handleUpdateTask = (
    currentTaskId,
    name,
    startDate,
    endDate,
    description,
    priority,
    supervisorId,
    fieldId,
    taskTypeId,
    plantId,
    liveStockId,
    remind,
    materialId,
    isRepeat,
  ) => {
    form
      .validateFields()
      .then(() => {
        const startDateFormatted = editingTask.startDate ? dayjs(editingTask.startDate)
          .second(0)
          .format("YYYY-MM-DD[T]HH:mm:ss.SSS") : dayjs(startDate)
          .second(0)
          .format("YYYY-MM-DD[T]HH:mm:ss.SSS");
        const endDateFormatted = editingTask.endDate ? dayjs(editingTask.endDate)
          .second(0)
          .format("YYYY-MM-DD[T]HH:mm:ss.SSS") : dayjs(endDate)
          .second(0)
          .format("YYYY-MM-DD[T]HH:mm:ss.SSS");

        const descriptionToSend = description || "";

        if (
          shouldCheckRepeat &&
          editingTask.isRepeat &&
          (!initialSelectedDays || initialSelectedDays.length === 0)
        ) {
          form.setFields([
            {
              name: "dateRepeate",
              errors: ["Vui lòng chọn ngày lặp lại"],
            },
          ]);
          return;
        }

        const area = areaByFarm.data
          ? areaByFarm.data.find((area) => area.id === selectedAreaId)
          : null;
        const zone = zoneByArea.data
          ? zoneByArea.data.find((zone) => zone.id === selectedZoneId)
          : null;
        const field = fieldByZone.data
          ? fieldByZone.data.find((field) => field.id === selectedFieldId)
          : null;

        const areaName = area ? area.name : null;
        const zoneName = zone ? zone.name : null;
        const fieldName = field ? field.nameCode : null;

        const formattedAddress = `${areaName ? areaName + ", " : ""}${
          zoneName ? zoneName + ", " : ""
        }${fieldName ? fieldName + ", " : ""}${
          addressDetail ? addressDetail.trim() : ""
        }`;

        const addressDetailToSend =
          formattedAddress.trim() !== "" ? formattedAddress : "";

        console.log(isRepeat);
        console.log("repeatValue: ", repeatValue);

        const finalValues = {
          name: nameValue ? nameValue : editingTask.name,
          startDate: startDateFormatted,
          endDate: endDateFormatted,
          description: descriptionToSend,
          priority: priorityValue,
          supervisorId: editingTask.suppervisorId ? editingTask.suppervisorId : supervisorValue,
          managerId: member.id,
          fieldId: selectedFieldId ? selectedFieldId : 0,
          isRepeat: typeof isRepeat === "object" ? isRepeat.value : repeatValue,
          taskTypeId: selectedTaskTypeId ? selectedTaskTypeId : 0,
          plantId: typeof plantId === "object" ? plantId.value : 0,
          liveStockId: typeof liveStockId === "object" ? liveStockId.value : 0,
          addressDetail: addressDetailToSend,
          remind: typeof remind === "object" ? remind.value : 0,
          materialIds: materialId || [],
          dates: initialSelectedDays
            ? initialSelectedDays.map((date) =>
                dayjs(date).format("YYYY-MM-DDTHH:mm:ss.SSS")
              )
            : [],
        };

        const transformedValues = transformData(finalValues);

        dispatch(updateTask({ taskId: currentTaskId, body: transformedValues })).then(
          () => {
            loadDataTask();
            handleDateChange();
            handleTaskAdded();
            closeEditTaskModal();
          }
        );
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleUpdateTaskDraft = (
    currentTaskId,
    name,
    startDate,
    endDate,
    description,
    priority,
    supervisorId,
    fieldId,
    taskTypeId,
    plantId,
    liveStockId,
    remind,
    materialId,
    isRepeat,
  ) => {
    form
      .validateFields()
      .then(() => {
        const startDateFormatted = startDate ? dayjs(startDate)
          .second(0)
          .format("YYYY-MM-DD[T]HH:mm:ss.SSS") : null;
        const endDateFormatted = endDate ? dayjs(endDate)
          .second(0)
          .format("YYYY-MM-DD[T]HH:mm:ss.SSS") : null;

        const descriptionToSend = description || "";

        if (
          shouldCheckRepeat &&
          editingTask.isRepeat &&
          (!initialSelectedDays || initialSelectedDays.length === 0)
        ) {
          form.setFields([
            {
              name: "dateRepeate",
              errors: ["Vui lòng chọn ngày lặp lại"],
            },
          ]);
          return;
        }

        const area = areaByFarm.data
          ? areaByFarm.data.find((area) => area.id === selectedAreaId)
          : null;
        const zone = zoneByArea.data
          ? zoneByArea.data.find((zone) => zone.id === selectedZoneId)
          : null;
        const field = fieldByZone.data
          ? fieldByZone.data.find((field) => field.id === selectedFieldId)
          : null;

        const areaName = area ? area.name : null;
        const zoneName = zone ? zone.name : null;
        const fieldName = field ? field.nameCode : null;

        const formattedAddress = `${areaName ? areaName + ", " : ""}${
          zoneName ? zoneName + ", " : ""
        }${fieldName ? fieldName + ", " : ""}${
          addressDetail ? addressDetail.trim() : ""
        }`;

        const addressDetailToSend =
          formattedAddress.trim() !== "" ? formattedAddress : "";

        const finalValues = {
          name: nameValue ? nameValue : editingTask.name,
          startDate: startDateFormatted,
          endDate: endDateFormatted,
          description: descriptionToSend,
          priority: priorityValue,
          supervisorId: supervisorValue,
          managerId: member.id,
          fieldId: selectedFieldId ? selectedFieldId : 0,
          isRepeat: typeof isRepeat === "object" ? isRepeat.value : repeatValue,
          taskTypeId: selectedTaskTypeId ? selectedTaskTypeId : 0,
          plantId: typeof plantId === "object" ? plantId.value : 0,
          liveStockId: typeof liveStockId === "object" ? liveStockId.value : 0,
          addressDetail: addressDetailToSend,
          remind: typeof remind === "object" ? remind.value : 0,
          materialIds: materialId || [],
          dates: initialSelectedDays
            ? initialSelectedDays.map((date) =>
                dayjs(date).format("YYYY-MM-DDTHH:mm:ss.SSS")
              )
            : [],
        };

        const transformedValues = transformData(finalValues);

        dispatch(updateTask({ taskId: currentTaskId, body: transformedValues })).then(
          () => {
            loadDataTask();
            handleDateChange();
            handleTaskAdded();
            closeEditTaskModal();
          }
        );
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const transformDataForChangeStatus = (originalData) => {
    const transformedData = {
      materialIds: originalData.materialIds,
      dates: originalData.dates,
      farmTask: {
        name: originalData.name,
        startDate: originalData.startDate,
        endDate: originalData.endDate,
        description: originalData.description,
        priority: originalData.priority,
        supervisorId: originalData.supervisorId,
        managerId: originalData.managerId,
        fieldId: originalData.fieldId,
        isRepeat: originalData.isRepeat,
        taskTypeId: originalData.taskTypeId,
        plantId: originalData.plantId,
        liveStockId: originalData.liveStockId,
        addressDetail: originalData.addressDetail,
        remind: originalData.remind,
      },
    };

    return transformedData;
  };

  const handleUpdateTaskDraftToPrepare = (
    currentTaskId,
    name,
    startDate,
    endDate,
    description,
    priority,
    supervisorId,
    fieldId,
    taskTypeId,
    plantId,
    liveStockId,
    remind,
    materialId,
    isRepeat,
  ) => {
    form
      .validateFields()
      .then(() => {
        const startDateFormatted = editingTask.startDate ? dayjs(editingTask.startDate)
          .second(0)
          .format("YYYY-MM-DD[T]HH:mm:ss.SSS") : dayjs(startDate)
          .second(0)
          .format("YYYY-MM-DD[T]HH:mm:ss.SSS");
        const endDateFormatted = editingTask.endDate ? dayjs(editingTask.endDate)
          .second(0)
          .format("YYYY-MM-DD[T]HH:mm:ss.SSS") : dayjs(endDate)
          .second(0)
          .format("YYYY-MM-DD[T]HH:mm:ss.SSS");

        const descriptionToSend = description || "";

        if (
          shouldCheckRepeat &&
          editingTask.isRepeat &&
          (!initialSelectedDays || initialSelectedDays.length === 0)
        ) {
          form.setFields([
            {
              name: "dateRepeate",
              errors: ["Vui lòng chọn ngày lặp lại"],
            },
          ]);
          return;
        }

        const area = areaByFarm.data
          ? areaByFarm.data.find((area) => area.id === selectedAreaId)
          : null;
        const zone = zoneByArea.data
          ? zoneByArea.data.find((zone) => zone.id === selectedZoneId)
          : null;
        const field = fieldByZone.data
          ? fieldByZone.data.find((field) => field.id === selectedFieldId)
          : null;

        const areaName = area ? area.name : null;
        const zoneName = zone ? zone.name : null;
        const fieldName = field ? field.nameCode : null;

        const formattedAddress = `${areaName ? areaName + ", " : ""}${
          zoneName ? zoneName + ", " : ""
        }${fieldName ? fieldName + ", " : ""}${
          addressDetail ? addressDetail.trim() : ""
        }`;

        const addressDetailToSend =
          formattedAddress.trim() !== "" ? formattedAddress : "";

        console.log(isRepeat);
        console.log("repeatValue: ", repeatValue);

        const finalValues = {
          name: nameValue ? nameValue : editingTask.name,
          startDate: startDateFormatted,
          endDate: endDateFormatted,
          description: descriptionToSend,
          priority: priorityValue,
          supervisorId: editingTask.suppervisorId ? editingTask.suppervisorId : supervisorValue,
          managerId: member.id,
          fieldId: selectedFieldId ? selectedFieldId : 0,
          isRepeat: typeof isRepeat === "object" ? isRepeat.value : repeatValue,
          taskTypeId: selectedTaskTypeId ? selectedTaskTypeId : 0,
          plantId: typeof plantId === "object" ? plantId.value : 0,
          liveStockId: typeof liveStockId === "object" ? liveStockId.value : 0,
          addressDetail: addressDetailToSend,
          remind: typeof remind === "object" ? remind.value : 0,
          materialIds: materialId || [],
          dates: initialSelectedDays
            ? initialSelectedDays.map((date) =>
                dayjs(date).format("YYYY-MM-DDTHH:mm:ss.SSS")
              )
            : [],
        };

        const transformedValues = transformDataForChangeStatus(finalValues);

        dispatch(updateTaskDraftToPrepare({ taskId: currentTaskId, body: transformedValues })).then(
          () => {
            loadDataTask();
            handleDateChange();
            handleTaskAdded();
            closeEditTaskModal();
          }
        );
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleUpdateSubmit = (currentTaskId) => {
    isDraft ? handleUpdateTaskDraft(currentTaskId) : handleUpdateTask(currentTaskId)
    if(draftToPrepare){
      handleUpdateTaskDraftToPrepare(currentTaskId); 
    }
  }

  const handleShowButton = () => {
    if (editingTask.status === "Bản nháp") {
      return (
        <>
          <Button form="updateTask" htmlType="submit" onClick={handleUpdateDraftToPrepareButton}>Chuyển sang chuẩn bị <CarryOutOutlined /></Button>,
          <Button form="updateTask" type="primary" htmlType="submit" onClick={handleUpdateDraft}>
            Cập nhật
            <EditOutlined />
          </Button>
        </>
      );
    }else{
      return (
        <>
          <Button onClick={closeEditTaskModal}>Đóng</Button>,
          <Button form="updateTask" type="primary" htmlType="submit" onClick={handleUpdateTaskToDo}>
            Lưu thay đổi
            <CheckCircleOutlined />
          </Button>
        </>
      );
    }
  };

  return (
    <>
      {editTaskModalVisible && (
        <Modal
          title="Cập nhật công việc"
          visible={editTaskModalVisible}
          onCancel={closeEditTaskModal}
          width={900}
          footer={handleShowButton}
        >
          <Form
            layout="vertical"
            className="task-form"
            onFinish={(values) => {
              handleUpdateSubmit(
                currentTaskId,
                values.name,
                values.startDate,
                values.endDate,
                values.description,
                values.priority,
                values.supervisorId,
                values.fieldId,
                values.taskTypeId,
                values.plantId,
                values.liveStockId,
                values.remind,
                values.overallEffortHour,
                values.overallEfforMinutes,
                values.materialId,
                values.isRepeat,
              );
            }}
            id="updateTask"
            form={form}
          >
            {editingTask &&
            editingTask.isPlant === false &&
            editingTask.isSpecific ? (
              <UpdateSpecificAnimal
                editingTask={editingTask}
                handleSelectAreaChange={handleSelectAreaChange}
                handleSelectZoneChange={handleSelectZoneChange}
                handleSelectFieldChange={handleSelectFieldChange}
                handlePriorityChange={handlePriorityChange}
                handleSelectStartDate={handleSelectStartDate}
                handleSelectEndDate={handleSelectEndDate}
                handleNameChange={handleNameChange}
                handleSupervisorChange={handleSupervisorChange}
                handleDescriptionChange={handleDescriptionChange}
                handleTaskTypeChange={handleTaskTypeChange}
                handleMaterialChange={handleMaterialChange}
                handleSelectRemind={handleSelectRemind}
                handleSelectRepeat={handleSelectRepeat}
                areaLivestockByZone={areaLivestockByZone}
                zoneAnimal={zoneAnimal}
                fieldByZone={fieldByZone}
                dataAnimal={dataAnimal}
                priorityValue={priorityValue}
                disabledDate={disabledDate}
                nameValue={nameValue}
                supervisorValue={supervisorValue}
                description={description}
                dataTaskTypeLivestock={dataTaskTypeLivestock}
                supervisor={supervisor}
                materialsValue={materialsValue}
                material={material}
                remindValue={remindValue}
                repeatValue={repeatValue}
                startDate={startDate}
                endDate={endDate}
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
                initialSelectedDays={initialSelectedDays}
                setInitialSelectedDays={setInitialSelectedDays}
                isDraft={isDraft}
              />
            ) : editingTask &&
              editingTask.isPlant === false &&
              !editingTask.isSpecific ? (
              <UpdateWholeBarn
                editingTask={editingTask}
                handleSelectAreaChange={handleSelectAreaChange}
                handleSelectZoneChange={handleSelectZoneChange}
                handleSelectFieldChange={handleSelectFieldChange}
                handlePriorityChange={handlePriorityChange}
                handleSelectStartDate={handleSelectStartDate}
                handleSelectEndDate={handleSelectEndDate}
                handleNameChange={handleNameChange}
                handleSupervisorChange={handleSupervisorChange}
                handleDescriptionChange={handleDescriptionChange}
                handleTaskTypeChange={handleTaskTypeChange}
                handleMaterialChange={handleMaterialChange}
                handleSelectRemind={handleSelectRemind}
                handleSelectRepeat={handleSelectRepeat}
                areaLivestockByZone={areaLivestockByZone}
                zoneAnimal={zoneAnimal}
                fieldByZone={fieldByZone}
                priorityValue={priorityValue}
                disabledDate={disabledDate}
                nameValue={nameValue}
                supervisorValue={supervisorValue}
                description={description}
                dataTaskTypeLivestock={dataTaskTypeLivestock}
                supervisor={supervisor}
                materialsValue={materialsValue}
                material={material}
                remindValue={remindValue}
                repeatValue={repeatValue}
                startDate={startDate}
                endDate={endDate}
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
                initialSelectedDays={initialSelectedDays}
                setInitialSelectedDays={setInitialSelectedDays}
                isDraft={isDraft}
              />
            ) : editingTask &&
              editingTask.isPlant === true &&
              editingTask.isSpecific ? (
              <UpdateSpecificPlant
                editingTask={editingTask}
                handleSelectAreaChange={handleSelectAreaChange}
                handleSelectZoneChange={handleSelectZoneChange}
                handleSelectFieldChange={handleSelectFieldChange}
                handlePriorityChange={handlePriorityChange}
                handleSelectStartDate={handleSelectStartDate}
                handleSelectEndDate={handleSelectEndDate}
                handleNameChange={handleNameChange}
                handleSupervisorChange={handleSupervisorChange}
                handleDescriptionChange={handleDescriptionChange}
                handleTaskTypeChange={handleTaskTypeChange}
                handleMaterialChange={handleMaterialChange}
                handleSelectRemind={handleSelectRemind}
                handleSelectRepeat={handleSelectRepeat}
                areaPlantByZone={areaPlantByZone}
                zonePlant={zonePlant}
                fieldByZone={fieldByZone}
                dataPlant={dataPlant}
                priorityValue={priorityValue}
                disabledDate={disabledDate}
                nameValue={nameValue}
                supervisorValue={supervisorValue}
                description={description}
                dataTaskTypePlant={dataTaskTypePlant}
                supervisor={supervisor}
                materialsValue={materialsValue}
                material={material}
                remindValue={remindValue}
                repeatValue={repeatValue}
                startDate={startDate}
                endDate={endDate}
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
                initialSelectedDays={initialSelectedDays}
                setInitialSelectedDays={setInitialSelectedDays}
                isDraft={isDraft}
              />
            ) : editingTask &&
              editingTask.isPlant === true &&
              !editingTask.isSpecific ? (
              <UpdateWholeGarden
                editingTask={editingTask}
                handleSelectAreaChange={handleSelectAreaChange}
                handleSelectZoneChange={handleSelectZoneChange}
                handleSelectFieldChange={handleSelectFieldChange}
                handlePriorityChange={handlePriorityChange}
                handleSelectStartDate={handleSelectStartDate}
                handleSelectEndDate={handleSelectEndDate}
                handleNameChange={handleNameChange}
                handleSupervisorChange={handleSupervisorChange}
                handleDescriptionChange={handleDescriptionChange}
                handleTaskTypeChange={handleTaskTypeChange}
                handleMaterialChange={handleMaterialChange}
                handleSelectRemind={handleSelectRemind}
                handleSelectRepeat={handleSelectRepeat}
                areaPlantByZone={areaPlantByZone}
                zonePlant={zonePlant}
                fieldByZone={fieldByZone}
                priorityValue={priorityValue}
                disabledDate={disabledDate}
                nameValue={nameValue}
                supervisorValue={supervisorValue}
                description={description}
                dataTaskTypePlant={dataTaskTypePlant}
                supervisor={supervisor}
                materialsValue={materialsValue}
                material={material}
                remindValue={remindValue}
                repeatValue={repeatValue}
                startDate={startDate}
                endDate={endDate}
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
                initialSelectedDays={initialSelectedDays}
                setInitialSelectedDays={setInitialSelectedDays}
                isDraft={isDraft}
              />
            ) : editingTask.isPlant === null ? (
              <UpdateTaskTypeOther
                // handleCreateTaskOther={handleCreateTaskOther}
                editingTask={editingTask}
                selectedAreaId={selectedAreaId}
                handleSelectAreaChange={handleSelectAreaChange}
                handleSelectZoneChange={handleSelectZoneChange}
                handleSelectFieldChange={handleSelectFieldChange}
                handlePriorityChange={handlePriorityChange}
                handleSelectStartDate={handleSelectStartDate}
                handleSelectEndDate={handleSelectEndDate}
                handleNameChange={handleNameChange}
                handleSupervisorChange={handleSupervisorChange}
                handleDescriptionChange={handleDescriptionChange}
                handleTaskTypeChange={handleTaskTypeChange}
                handleMaterialChange={handleMaterialChange}
                handleSelectRemind={handleSelectRemind}
                handleSelectRepeat={handleSelectRepeat}
                form={form}
                areaByFarm={areaByFarm}
                zoneByArea={zoneByArea}
                fieldByZone={fieldByZone}
                addressDetail={addressDetail}
                setAddressDetail={setAddressDetail}
                nameValue={nameValue}
                supervisorValue={supervisorValue}
                supervisor={supervisor}
                priorityValue={priorityValue}
                description={description}
                taskTypeActive={taskTypeActive}
                materialsValue={materialsValue}
                material={material}
                remindValue={remindValue}
                repeatValue={repeatValue}
                disabledDate={disabledDate}
                startDate={startDate}
                endDate={endDate}
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
                initialSelectedDays={initialSelectedDays}
                setInitialSelectedDays={setInitialSelectedDays}
                isDraft={isDraft}
              />
            ) : null}
          </Form>
        </Modal>
      )}
    </>
  );
}

export default UpdateTask;
