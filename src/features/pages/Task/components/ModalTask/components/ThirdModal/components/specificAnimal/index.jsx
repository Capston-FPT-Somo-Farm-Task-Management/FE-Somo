import React, { useState } from "react";
import { Button, Form } from "antd";
import AreaLivestockSelect from "../FormItemCreate/AreaLivestockSelect";
import ZoneAnimalSelect from "../FormItemCreate/ZoneAnimal";
import FieldAnimalSelect from "../FormItemCreate/FieldAnimalSelect";
import AnimalSelect from "../FormItemCreate/AnimalSelect";
import DateSelect from "../FormItemCreate/DateSelect";
import OverallEffortSelect from "../FormItemCreate/OverallEffortSelect";
import DescriptionInput from "../FormItemCreate/DescriptionInput";
import NameTaskInput from "../FormItemCreate/NameTaskInput";
import TaskTypeLivestockSelect from "../FormItemCreate/TaskTypeLivestockSelect";
import SupervisorSelect from "../FormItemCreate/SupervisorSelect";
import EmployeeSelect from "../FormItemCreate/EmployeeSelect";
import MaterialSelect from "../FormItemCreate/MaterialSelect";
import PrioritySelect from "../FormItemCreate/PrioritySelect";
import RemindSelect from "../FormItemCreate/RemindSelect";
import RepeatSelect from "../FormItemCreate/RepeatSelect";

function SpecificAnimal({
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
  handleLivestockValue,
  handleMaterialChange,
  handleSelectRemind,
  handleSelectRepeat,
  form,
  areaLivestockByZone,
  zoneAnimal,
  fieldByZone,
  name,
  startDate,
  endDate,
  description,
  priorityValue,
  supervisorValue,
  selectedFieldId,
  dataTaskTypeLivestock,
  livestockValue,
  materialsValue,
  remindValue,
  repeatValue,
  dataAnimal,
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
          <AreaLivestockSelect
            handleSelectAreaChange={handleSelectAreaChange}
            areaLivestockByZone={areaLivestockByZone}
            isDraft={isDraft}
          />
          <ZoneAnimalSelect
            handleSelectZoneChange={handleSelectZoneChange}
            zoneAnimal={zoneAnimal}
            isDraft={isDraft}
          />
          <FieldAnimalSelect
            handleSelectFieldChange={handleSelectFieldChange}
            fieldByZone={fieldByZone}
            selectedFieldId={selectedFieldId}
            isDraft={isDraft}
          />
          <AnimalSelect
            dataAnimal={dataAnimal}
            livestockValue={livestockValue}
            handleLivestockValue={handleLivestockValue}
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
          <TaskTypeLivestockSelect
            dataTaskTypeLivestock={dataTaskTypeLivestock}
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
            startDate={startDate}
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

export default SpecificAnimal;
