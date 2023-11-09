import React, { useEffect, useState } from "react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import { Form } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getAreaActive } from "features/slice/area/areaSlice";
import { getZoneByAreaAnimal } from "features/slice/zone/zoneAnimalSlice";
import { getZoneByAreaPlant } from "features/slice/zone/zonePlantSlice";
import { getFieldByZone } from "features/slice/field/fieldByZoneSlice";
import { getTaskTypeLivestock } from "features/slice/task/taskTypeAnimalSlice";
import { getTaskTypePlant } from "features/slice/task/taskTypePlantSlice";
import { getSupervisor } from "features/slice/supervisor/supervisorSlice";
import { getEmployeeByTaskTypeAndFarmId } from "features/slice/employee/employeeSlice";
import { getAnimalActive } from "features/slice/animal/animalSlice";
import { getPlantActive } from "features/slice/plant/plantSlice";
import { createTask } from "features/slice/task/taskSlice";
import { getMemberById } from "features/slice/user/memberSlice";
import { authServices } from "services/authServices";
import SpecificAnimal from "./components/specificAnimal";
import WholeBarn from "./components/wholeBarn";
import SpecificPlant from "./components/specificPlant";
import WholeGarden from "./components/wholeGarden";
import Other from "./components/other";
import UpdateTask from "../../../List/components/UpdateTask";
import { getMaterialActiveByFarmId } from "features/slice/material/materialActiveByFarmSlice";

dayjs.extend(customParseFormat);

function ThirdModal({
  loadDataTask,
  option,
  onTaskAdded,
  onDateChange,
  handleCloseModal,
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
  const [overallEfforMinutes, setOverallEfforMinutes] = useState(0);
  const [overallEffortHour, setOverallEffortHour] = useState(0);
  const [shouldCheckRepeat, setShouldCheckRepeat] = useState(true);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const member = useSelector((state) => state.member.data);

  const farmId = member.farmId;

  const area = useSelector((state) => state.area.data);

  const zoneAnimal = useSelector((state) => state.zoneAnimal.data);

  const zonePlant = useSelector((state) => state.zonePlant.data);

  const animal = useSelector((state) => state.animal.data);
  const dataAnimal = animal.data;

  const plant = useSelector((state) => state.plant.data);
  const dataPlant = plant.data;

  const fieldByZone = useSelector((state) => state.fieldByZone.data);

  const taskTypeLivestock = useSelector(
    (state) => state.taskTypeLivestock.data
  );
  const dataTaskTypeLivestock = taskTypeLivestock.data;

  const taskTypePlant = useSelector((state) => state.taskTypePlant.data);
  const dataTaskTypePlant = taskTypePlant.data;

  const supervisor = useSelector((state) => state.supervisor.data);

  const dataEmployee = useSelector((state) => state.employee.data);

  const material = useSelector((state) => state.materialActive.data);

  useEffect(() => {
    dispatch(getAreaActive(farmId));
    dispatch(getTaskTypeLivestock());
    dispatch(getTaskTypePlant());
    dispatch(getSupervisor(farmId));
    dispatch(getMaterialActiveByFarmId(farmId));
    dispatch(getMemberById(authServices.getUserId()));
  }, [farmId]);

  useEffect(() => {
    if (selectedAreaId) {
      dispatch(getZoneByAreaAnimal(selectedAreaId));
      dispatch(getZoneByAreaPlant(selectedAreaId));
    }
  }, [selectedAreaId]);

  useEffect(() => {
    if (selectedZoneId) {
      dispatch(getFieldByZone(selectedZoneId));
    }
  }, [selectedZoneId]);

  useEffect(() => {
    if (selectedFieldId) {
      dispatch(getAnimalActive(selectedFieldId));
      dispatch(getPlantActive(selectedFieldId));
    }
  }, [selectedFieldId]);

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
  }, [selectedTaskTypeId]);

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
    form.setFieldsValue({
      zoneId: null,
      fieldId: null,
      liveStockId: null,
      plantId: null,
    });
  };

  const handleSelectZoneChange = async (value) => {
    setSelectedZoneId(value);
    setSelectedFieldId(value);
    form.setFieldsValue({
      fieldId: null,
      liveStockId: null,
      plantId: null,
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

  const handleOverallEfforMinutes = (value) => {
    setOverallEfforMinutes(parseInt(value, 10));
  };

  const handleOverallEffortHour = (value) => {
    setOverallEffortHour(parseInt(value, 10));
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
        overallEfforMinutes: originalData.overallEfforMinutes,
        overallEffortHour: originalData.overallEffortHour
      },
    };

    return transformedData;
  };

  const onFinish = (values) => {
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
          overallEffortHour: overallEffortHour,
          overallEfforMinutes: overallEfforMinutes
        };

        const transformedValues = transformData(finalValues);

        dispatch(createTask(transformedValues)).then(() => {
          loadDataTask();
          onDateChange();
          onTaskAdded();
          handleCloseModal();
        });
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  if (option === "other") {
    return <Other />;
  } else if (option === "specificAnimal") {
    return (
      <SpecificAnimal
        onFinish={onFinish}
        selectedAreaId={selectedAreaId}
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
        handleOverallEfforMinutes={handleOverallEfforMinutes}
        handleOverallEffortHour={handleOverallEffortHour}
        form={form}
        area={area}
        zoneAnimal={zoneAnimal}
        fieldByZone={fieldByZone}
        dataAnimal={dataAnimal}
        priorityValue={priorityValue}
        description={description}
        overallEfforMinutes={overallEfforMinutes}
        overallEffortHour={overallEffortHour}
        dataTaskTypeLivestock={dataTaskTypeLivestock}
        employeesValue={employeesValue}
        dataEmployee={dataEmployee}
        supervisor={supervisor}
        materialsValue={materialsValue}
        material={material}
        remindValue={remindValue}
        repeatValue={repeatValue}
        disabledDate={disabledDate}
        startDate={startDate}
        endDate={endDate}
      />
    );
  } else if (option === "wholeBarn") {
    return (
      <WholeBarn
        onFinish={onFinish}
        selectedAreaId={selectedAreaId}
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
        handleOverallEfforMinutes={handleOverallEfforMinutes}
        handleOverallEffortHour={handleOverallEffortHour}
        form={form}
        area={area}
        zoneAnimal={zoneAnimal}
        fieldByZone={fieldByZone}
        priorityValue={priorityValue}
        description={description}
        overallEfforMinutes={overallEfforMinutes}
        overallEffortHour={overallEffortHour}
        dataTaskTypeLivestock={dataTaskTypeLivestock}
        employeesValue={employeesValue}
        dataEmployee={dataEmployee}
        supervisor={supervisor}
        materialsValue={materialsValue}
        material={material}
        remindValue={remindValue}
        repeatValue={repeatValue}
        disabledDate={disabledDate}
        startDate={startDate}
        endDate={endDate}
      />
    );
  } else if (option === "specificPlant") {
    return (
      <SpecificPlant
        onFinish={onFinish}
        selectedAreaId={selectedAreaId}
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
        handleOverallEfforMinutes={handleOverallEfforMinutes}
        handleOverallEffortHour={handleOverallEffortHour}
        form={form}
        area={area}
        zonePlant={zonePlant}
        fieldByZone={fieldByZone}
        dataPlant={dataPlant}
        priorityValue={priorityValue}
        description={description}
        overallEfforMinutes={overallEfforMinutes}
        overallEffortHour={overallEffortHour}
        dataTaskTypePlant={dataTaskTypePlant}
        employeesValue={employeesValue}
        dataEmployee={dataEmployee}
        supervisor={supervisor}
        materialsValue={materialsValue}
        material={material}
        remindValue={remindValue}
        repeatValue={repeatValue}
        disabledDate={disabledDate}
        startDate={startDate}
        endDate={endDate}
      />
    );
  } else if (option === "wholeGarden") {
    return (
      <WholeGarden
        onFinish={onFinish}
        selectedAreaId={selectedAreaId}
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
        handleOverallEfforMinutes={handleOverallEfforMinutes}
        handleOverallEffortHour={handleOverallEffortHour}
        form={form}
        area={area}
        zonePlant={zonePlant}
        fieldByZone={fieldByZone}
        priorityValue={priorityValue}
        description={description}
        overallEfforMinutes={overallEfforMinutes}
        overallEffortHour={overallEffortHour}
        dataTaskTypePlant={dataTaskTypePlant}
        employeesValue={employeesValue}
        dataEmployee={dataEmployee}
        supervisor={supervisor}
        materialsValue={materialsValue}
        material={material}
        remindValue={remindValue}
        repeatValue={repeatValue}
        disabledDate={disabledDate}
        startDate={startDate}
        endDate={endDate}
      />
    );
  }
  return null;
}

export default ThirdModal;
