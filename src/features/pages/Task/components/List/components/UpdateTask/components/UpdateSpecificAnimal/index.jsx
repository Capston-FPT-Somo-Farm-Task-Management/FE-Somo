import React from "react";
import AreaUpdate from "../FormItemUpdate/areaUpdate";
import ZoneAnimalUpdate from "../FormItemUpdate/zoneAnimalUpdate";
import FieldAnimalUpdate from "../FormItemUpdate/fieldAnimalUpdate";
import AnimalUpdate from "../FormItemUpdate/animalUpdate";
import PriorityUpdate from "../FormItemUpdate/priorityUpdate";
import StartDateUpdate from "../FormItemUpdate/startDateUpdate";
import EndDateUpdate from "../FormItemUpdate/endDateUpdate";
import DescriptionUpdate from "../FormItemUpdate/descriptionUpdate";
import NameTaskUpdate from "../FormItemUpdate/nameTaskUpdate";
import TaskTypeLivestockUpdate from "../FormItemUpdate/taskTypeLivestockUpdate";
import SupervisorUpdate from "../FormItemUpdate/supervisorUpdate";
import EmployeeUpdate from "../FormItemUpdate/employeeUpdate";
import OverallEffortUpdate from "../FormItemUpdate/overallEffortUpdate";
import MaterialUpdate from "../FormItemUpdate/materialUpdate";
import RemindUpdate from "../FormItemUpdate/remindUpdate";
import RepeatUpdate from "../FormItemUpdate/repeatUpdate";
import DateRepeatUpdate from "../FormItemUpdate/dateRepeatUpdate";

function UpdateSpecificAnimal({
  editingTask,
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
  handleOverallEffortHour,
  handleOverallEfforMinutes,
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
  currentEmployee,
  currentTaskId,
}) {

  return (
    <>
      <div className="form-left">
        <AreaUpdate
          handleSelectAreaChange={handleSelectAreaChange}
          area={area}
          editingTask={editingTask}
        />
        <ZoneAnimalUpdate
          handleSelectZoneChange={handleSelectZoneChange}
          zoneAnimal={zoneAnimal}
          editingTask={editingTask}
        />
        <FieldAnimalUpdate
          handleSelectFieldChange={handleSelectFieldChange}
          fieldByZone={fieldByZone}
          editingTask={editingTask}
        />
        <AnimalUpdate dataAnimal={dataAnimal} editingTask={editingTask} />
        <PriorityUpdate
          priorityValue={priorityValue}
          handlePriorityChange={handlePriorityChange}
          editingTask={editingTask}
        />
        <StartDateUpdate
          disabledDate={disabledDate}
          handleSelectStartDate={handleSelectStartDate}
          editingTask={editingTask}
        />
        <EndDateUpdate
          disabledDate={disabledDate}
          handleSelectEndDate={handleSelectEndDate}
          startDate={startDate}
          editingTask={editingTask}
        />
        <DescriptionUpdate
          description={description}
          handleDescriptionChange={handleDescriptionChange}
          editingTask={editingTask}
        />
      </div>
      <div className="form-right">
        <NameTaskUpdate editingTask={editingTask} />
        <TaskTypeLivestockUpdate
          dataTaskTypeLivestock={dataTaskTypeLivestock}
          handleTaskTypeChange={handleTaskTypeChange}
          editingTask={editingTask}
        />
        <SupervisorUpdate supervisor={supervisor} editingTask={editingTask} />
        <EmployeeUpdate
          employeesValue={employeesValue}
          handleEmployeeChange={handleEmployeeChange}
          dataEmployee={dataEmployee}
          editingTask={editingTask}
        />
        <OverallEffortUpdate
          overallEffortHour={overallEffortHour}
          handleOverallEffortHour={handleOverallEffortHour}
          overallEfforMinutes={overallEfforMinutes}
          handleOverallEfforMinutes={handleOverallEfforMinutes}
          editingTask={editingTask}
        />
        <MaterialUpdate
          materialsValue={materialsValue}
          handleMaterialChange={handleMaterialChange}
          material={material}
          editingTask={editingTask}
        />
        <RemindUpdate
          remindValue={remindValue}
          handleSelectRemind={handleSelectRemind}
          editingTask={editingTask}
        />
        <RepeatUpdate
          repeatValue={repeatValue}
          handleSelectRepeat={handleSelectRepeat}
          editingTask={editingTask}
        />

        {repeatValue && (
          <DateRepeatUpdate endDate={endDate} editingTask={editingTask} />
        )}
      </div>
      </>
  );
}

export default UpdateSpecificAnimal;
