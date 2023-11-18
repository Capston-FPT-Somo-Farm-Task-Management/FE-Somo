import React from "react";
import { Button, Form } from "antd";
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
  handleIsDraft,
  handleIsTaskToDo,
  handleFormSubmit,
  isDraft,
  handleSelectAreaChange,
  handleSelectZoneChange,
  handleSelectFieldChange,
  handleNameChange,
  handleSelectStartDate,
  handleSelectEndDate,
  handleDescriptionChange,
  handlePriorityChange,
  handleSupervisorValue,
  handleTaskTypeChange,
  handleMaterialChange,
  handleSelectRemind,
  handleSelectRepeat,
  form,
  areaPlantByZone,
  zonePlant,
  fieldByZone,
  name,
  startDate,
  endDate,
  description,
  priorityValue,
  supervisorValue,
  selectedFieldId,
  dataTaskTypePlant,
  materialsValue,
  remindValue,
  repeatValue,
  dataPlant,
  supervisor,
  material,
  disabledDate,
  selectedDays,
  setSelectedDays,
}) {
  return (
    <Form
      layout="vertical"
      onFinish={handleFormSubmit}
      id="createTaskToDo"
      name="createTask"
      form={form}
    >
      <div className="task-form">
        <div className="form-left">
          <AreaPlantSelect
            handleSelectAreaChange={handleSelectAreaChange}
            areaPlantByZone={areaPlantByZone}
            isDraft={isDraft}
          />
          <ZonePlantSelect
            handleSelectZoneChange={handleSelectZoneChange}
            zonePlant={zonePlant}
            isDraft={isDraft}
          />
          <FieldPlantSelect
            handleSelectFieldChange={handleSelectFieldChange}
            fieldByZone={fieldByZone}
            selectedFieldId={selectedFieldId}
            isDraft={isDraft}
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
            isDraft={isDraft}
          />
          {/* <OverallEffortSelect
          overallEffortHour={overallEffortHour}
          handleOverallEffortHour={handleOverallEffortHour}
          overallEfforMinutes={overallEfforMinutes}
          handleOverallEfforMinutes={handleOverallEfforMinutes}
        /> */}
          <DescriptionInput
            description={description}
            handleDescriptionChange={handleDescriptionChange}
          />
        </div>
        <div className="form-right">
          <NameTaskInput name={name} handleNameChange={handleNameChange} />
          <TaskTypePlantSelect
            dataTaskTypePlant={dataTaskTypePlant}
            handleTaskTypeChange={handleTaskTypeChange}
            isDraft={isDraft}
          />
          <SupervisorSelect
            supervisor={supervisor}
            supervisorValue={supervisorValue}
            handleSupervisorValue={handleSupervisorValue}
            isDraft={isDraft}
          />
          {/* <EmployeeSelect
          employeesValue={employeesValue}
          handleEmployeeChange={handleEmployeeChange}
          dataEmployee={dataEmployee}
        /> */}
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
      </div>
      <div className="form-task-button">
        <Button onClick={handleIsDraft} htmlType="submit">
          Lưu bản nháp
        </Button>
        <Button onClick={handleIsTaskToDo} htmlType="submit">
          Tạo công việc
        </Button>
      </div>
    </Form>
  );
}

export default WholeGarden;
