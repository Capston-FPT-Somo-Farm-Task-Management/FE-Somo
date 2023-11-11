import React from "react";
import { Form } from "antd";
import AreaSelect from "../FormItemCreate/areaSelect";
import FieldAnimalSelect from "../FormItemCreate/fieldAnimalSelect";
import AnimalSelect from "../FormItemCreate/animalSelect";
import PrioritySelect from "../FormItemCreate/prioritySelect";
import DescriptionInput from "../FormItemCreate/descriptionInput";
import NameTaskInput from "../FormItemCreate/nameTaskInput";
import TaskTypeLivestockSelect from "../FormItemCreate/taskTypeLivestockSelect";
import SupervisorSelect from "../FormItemCreate/supervisorSelect";
import EmployeeSelect from "../FormItemCreate/employeeSelect";
import OverallEffortSelect from "../FormItemCreate/overallEffortSelect";
import MaterialSelect from "../FormItemCreate/materialSelect";
import RemindSelect from "../FormItemCreate/remindSelect";
import RepeatSelect from "../FormItemCreate/repeatSelect";
import ZoneAnimalSelect from "../FormItemCreate/zoneAnimal";
import DateSelect from "../FormItemCreate/dateSelect";
import dayjs from "dayjs";

function SpecificAnimal({
  onFinish,
  handleSelectAreaChange,
  handleSelectZoneChange,
  handleSelectFieldChange,
  handlePriorityChange,
  handleSelectStartDate,
  handleSelectEndDate,
  handleDescriptionChange,
  handleTaskTypeChange,
  handleEmployeeChange,
  handleMaterialChange,
  handleSelectRemind,
  handleSelectRepeat,
  handleOverallEfforMinutes,
  handleOverallEffortHour,
  form,
  area,
  zoneAnimal,
  fieldByZone,
  dataAnimal,
  priorityValue,
  description,
  overallEfforMinutes,
  overallEffortHour,
  dataTaskTypeLivestock,
  employeesValue,
  dataEmployee,
  supervisor,
  materialsValue,
  material,
  remindValue,
  repeatValue,
  disabledDate,
  startDate,
  endDate,
}) {
  const calculateDaysDifference = (startDate, endDate) => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    return end.diff(start, 'days');
  };
  return (
    <Form
      layout="vertical"
      className="task-form"
      onFinish={onFinish}
      id="createTask"
      name="createTask"
      form={form}
    >
      <div className="form-left">
        <AreaSelect
          handleSelectAreaChange={handleSelectAreaChange}
          area={area}
        />
        <ZoneAnimalSelect
          handleSelectZoneChange={handleSelectZoneChange}
          zoneAnimal={zoneAnimal}
        />
        <FieldAnimalSelect
          handleSelectFieldChange={handleSelectFieldChange}
          fieldByZone={fieldByZone}
        />
        <AnimalSelect dataAnimal={dataAnimal} />
        <PrioritySelect
          priorityValue={priorityValue}
          handlePriorityChange={handlePriorityChange}
        />
        <DateSelect
          disabledDate={disabledDate}
          handleSelectStartDate={handleSelectStartDate}
          handleSelectEndDate={handleSelectEndDate}
          startDate={startDate}
          calculateDaysDifference={calculateDaysDifference }
        />
        <OverallEffortSelect
          overallEffortHour={overallEffortHour}
          handleOverallEffortHour={handleOverallEffortHour}
          overallEfforMinutes={overallEfforMinutes}
          handleOverallEfforMinutes={handleOverallEfforMinutes}
        />
        <DescriptionInput
          description={description}
          handleDescriptionChange={handleDescriptionChange}
        />
      </div>
      <div className="form-right">
        <NameTaskInput />
        <TaskTypeLivestockSelect
          dataTaskTypeLivestock={dataTaskTypeLivestock}
          handleTaskTypeChange={handleTaskTypeChange}
        />
        <SupervisorSelect supervisor={supervisor} />
        <EmployeeSelect
          employeesValue={employeesValue}
          handleEmployeeChange={handleEmployeeChange}
          dataEmployee={dataEmployee}
        />
        <MaterialSelect
          materialsValue={materialsValue}
          handleMaterialChange={handleMaterialChange}
          material={material}
        />
        <RemindSelect
          remindValue={remindValue}
          handleSelectRemind={handleSelectRemind}
        />
        <RepeatSelect
          repeatValue={repeatValue}
          handleSelectRepeat={handleSelectRepeat}
          startDate={startDate}
          endDate={endDate}
          calculateDaysDifference={calculateDaysDifference }
        />
      </div>
    </Form>
  );
}

export default SpecificAnimal;
