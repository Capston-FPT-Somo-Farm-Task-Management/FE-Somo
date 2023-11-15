import React from "react";
import { Form } from "antd";
import AreaPlantSelect from "../FormItemCreate/AreaPlantSelect";
import ZonePlantSelect from "../FormItemCreate/ZonePlantSelect";
import FieldPlantSelect from "../FormItemCreate/FieldPlantSelect";
import DateSelect from "../FormItemCreate/DateSelect";
import OverallEffortSelect from "../FormItemCreate/OverallEffortSelect";
import DescriptionInput from "../FormItemCreate/DescriptionInput";
import NameTaskInput from "../FormItemCreate/NameTaskInput";
import TaskTypePlantSelect from "../FormItemCreate/TaskTypePlantSelect";
import SupervisorSelect from "../FormItemCreate/SupervisorSelect";
import EmployeeSelect from "../FormItemCreate/EmployeeSelect";
import MaterialSelect from "../FormItemCreate/MaterialSelect";
import PrioritySelect from "../FormItemCreate/PrioritySelect";
import RemindSelect from "../FormItemCreate/RemindSelect";
import RepeatSelect from "../FormItemCreate/RepeatSelect";

function WholeGarden({
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

export default WholeGarden;
