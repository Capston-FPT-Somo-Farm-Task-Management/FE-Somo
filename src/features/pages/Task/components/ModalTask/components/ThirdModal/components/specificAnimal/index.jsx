import React from "react";
import { Form  } from "antd";
import AreaSelect from "../FormItemCreate/areaSelect";
import FieldAnimalSelect from "../FormItemCreate/fieldAnimalSelect";
import AnimalSelect from "../FormItemCreate/animalSelect";
import PrioritySelect from "../FormItemCreate/prioritySelect";
import StartDateSelect from "../FormItemCreate/startDateSelect";
import EndDateSelect from "../FormItemCreate/endDateSelect";
import DescriptionInput from "../FormItemCreate/descriptionInput";
import NameTaskInput from "../FormItemCreate/nameTaskInput";
import TaskTypeLivestockSelect from "../FormItemCreate/taskTypeLivestockSelect";
import SupervisorSelect from "../FormItemCreate/supervisorSelect";
import EmployeeSelect from "../FormItemCreate/employeeSelect";
import OverallEffortSelect from "../FormItemCreate/overallEffortSelect";
import MaterialSelect from "../FormItemCreate/materialSelect";
import RemindSelect from "../FormItemCreate/remindSelect";
import RepeatSelect from "../FormItemCreate/repeatSelect";
import DateRepeatSelect from "../FormItemCreate/dateRepeatSelect";
import ZoneAnimalSelect from "../FormItemCreate/zoneAnimal";

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
  dataMaterial,
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
        <OverallEffortSelect
          overallEffortHour={overallEffortHour}
          handleOverallEffortHour={handleOverallEffortHour}
          overallEfforMinutes={overallEfforMinutes}
          handleOverallEfforMinutes={handleOverallEfforMinutes}
        />
        <MaterialSelect materialsValue={materialsValue} handleMaterialChange={handleMaterialChange} dataMaterial={dataMaterial}/>
        <RemindSelect remindValue={remindValue} handleSelectRemind={handleSelectRemind}/>
        <RepeatSelect repeatValue={repeatValue} handleSelectRepeat={handleSelectRepeat}/>

        {repeatValue && (
          <DateRepeatSelect endDate={endDate}/>
        )}
      </div>
    </Form>
  );
}

export default SpecificAnimal;
