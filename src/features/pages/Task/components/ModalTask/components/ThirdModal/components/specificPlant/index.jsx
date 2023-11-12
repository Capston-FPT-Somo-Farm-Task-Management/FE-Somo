import React from "react";
import { Form } from "antd";
import AreaSelect from "../FormItemCreate/areaSelect";
import ZonePlantSelect from "../FormItemCreate/zonePlantSelect";
import PlantSelect from "../FormItemCreate/plantSelect";
import PrioritySelect from "../FormItemCreate/prioritySelect";
import DescriptionInput from "../FormItemCreate/descriptionInput";
import NameTaskInput from "../FormItemCreate/nameTaskInput";
import TaskTypePlantSelect from "../FormItemCreate/taskTypePlantSelect";
import SupervisorSelect from "../FormItemCreate/supervisorSelect";
import EmployeeSelect from "../FormItemCreate/employeeSelect";
import OverallEffortSelect from "../FormItemCreate/overallEffortSelect";
import MaterialSelect from "../FormItemCreate/materialSelect";
import RemindSelect from "../FormItemCreate/remindSelect";
import RepeatSelect from "../FormItemCreate/repeatSelect";
import FieldPlantSelect from "../FormItemCreate/fieldPlantSelect";
import DateSelect from "../FormItemCreate/dateSelect";
import AreaPlantSelect from "../FormItemCreate/AreaPlantSelect";

function SpecificPlant({
  handleCreateTask,
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
  areaPlantByZone,
  zonePlant,
  fieldByZone,
  dataPlant,
  priorityValue,
  description,
  overallEfforMinutes,
  overallEffortHour,
  dataTaskTypePlant,
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
  selectedDays,
  setSelectedDays
}) {
  return (
    <Form
      layout="vertical"
      className="task-form"
      onFinish={handleCreateTask}
      id="createTask"
      form={form}
    >
      <div className="form-left">
        <AreaPlantSelect
          handleSelectAreaChange={handleSelectAreaChange}
          areaPlantByZone={areaPlantByZone}
        />
        <ZonePlantSelect
          handleSelectZoneChange={handleSelectZoneChange}
          zonePlant={zonePlant}
        />
        <FieldPlantSelect
          handleSelectFieldChange={handleSelectFieldChange}
          fieldByZone={fieldByZone}
        />
        <PlantSelect dataPlant={dataPlant} />
        <PrioritySelect
          priorityValue={priorityValue}
          handlePriorityChange={handlePriorityChange}
        />
        <DateSelect
          disabledDate={disabledDate}
          handleSelectStartDate={handleSelectStartDate}
          handleSelectEndDate={handleSelectEndDate}
          startDate={startDate}
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
        <TaskTypePlantSelect
          dataTaskTypePlant={dataTaskTypePlant}
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
          endDate={endDate}
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
        />
      </div>
    </Form>
  );
}

export default SpecificPlant;
