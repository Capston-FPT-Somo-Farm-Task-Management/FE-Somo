import React from "react";
import { Form } from "antd";
import AreaSelect from "../FormItemCreate/areaSelect";
import ZonePlantSelect from "../FormItemCreate/zonePlantSelect";
import PlantSelect from "../FormItemCreate/plantSelect";
import PrioritySelect from "../FormItemCreate/prioritySelect";
import StartDateSelect from "../FormItemCreate/startDateSelect";
import EndDateSelect from "../FormItemCreate/endDateSelect";
import DescriptionInput from "../FormItemCreate/descriptionInput";
import NameTaskInput from "../FormItemCreate/nameTaskInput";
import TaskTypePlantSelect from "../FormItemCreate/taskTypePlantSelect";
import SupervisorSelect from "../FormItemCreate/supervisorSelect";
import EmployeeSelect from "../FormItemCreate/employeeSelect";
import OverallEffortSelect from "../FormItemCreate/overallEffortSelect";
import MaterialSelect from "../FormItemCreate/materialSelect";
import RemindSelect from "../FormItemCreate/remindSelect";
import RepeatSelect from "../FormItemCreate/repeatSelect";
import DateRepeatSelect from "../FormItemCreate/dateRepeatSelect";
import FieldPlantSelect from "../FormItemCreate/fieldPlantSelect";

function SpecificPlant({
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
}) {

  return (
    <Form
      layout="vertical"
      className="task-form"
      onFinish={onFinish}
      id="createTask"
      form={form}
    >
      <div className="form-left">
        <AreaSelect
          handleSelectAreaChange={handleSelectAreaChange}
          area={area}
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
        <StartDateSelect
          disabledDate={disabledDate}
          handleSelectStartDate={handleSelectStartDate}
        />
        <EndDateSelect
          disabledDate={disabledDate}
          handleSelectEndDate={handleSelectEndDate}
          startDate={startDate}
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
        <OverallEffortSelect
          overallEffortHour={overallEffortHour}
          handleOverallEffortHour={handleOverallEffortHour}
          overallEfforMinutes={overallEfforMinutes}
          handleOverallEfforMinutes={handleOverallEfforMinutes}
        />
        <MaterialSelect materialsValue={materialsValue} handleMaterialChange={handleMaterialChange} material={material}/>
        <RemindSelect remindValue={remindValue} handleSelectRemind={handleSelectRemind}/>
        <RepeatSelect repeatValue={repeatValue} handleSelectRepeat={handleSelectRepeat}/>
        {repeatValue && (
          <DateRepeatSelect endDate={endDate}/>
        )}
      </div>
    </Form>
  );
}

export default SpecificPlant;
