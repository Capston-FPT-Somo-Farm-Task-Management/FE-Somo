import React from "react";
import AreaUpdate from "../FormItemUpdate/areaUpdate";
import ZonePlantUpdate from "../FormItemUpdate/zonePlantUpdate";
import FieldPlantUpdate from "../FormItemUpdate/fieldPlantUpdate";
import PriorityUpdate from "../FormItemUpdate/priorityUpdate";
import StartDateUpdate from "../FormItemUpdate/startDateUpdate";
import EndDateUpdate from "../FormItemUpdate/endDateUpdate";
import DescriptionUpdate from "../FormItemUpdate/descriptionUpdate";
import NameTaskUpdate from "../FormItemUpdate/nameTaskUpdate";
import TaskTypePlantUpdate from "../FormItemUpdate/taskTypePlantUpdate";
import SupervisorUpdate from "../FormItemUpdate/supervisorUpdate";
import EmployeeUpdate from "../FormItemUpdate/employeeUpdate";
import OverallEffortUpdate from "../FormItemUpdate/overallEffortUpdate";
import MaterialUpdate from "../FormItemUpdate/materialUpdate";
import RemindUpdate from "../FormItemUpdate/remindUpdate";
import RepeatUpdate from "../FormItemUpdate/repeatUpdate";
import DateRepeatUpdate from "../FormItemUpdate/dateRepeatUpdate";

function UpdateWholeGarden({
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
}) {

  return (
    <>
      <div className="form-left">
        <AreaUpdate
          handleSelectAreaChange={handleSelectAreaChange}
          area={area}
          editingTask={editingTask}
        />
        <ZonePlantUpdate
          handleSelectZoneChange={handleSelectZoneChange}
          zonePlant={zonePlant}
          editingTask={editingTask}
        />
        <FieldPlantUpdate
          handleSelectFieldChange={handleSelectFieldChange}
          fieldByZone={fieldByZone}
          editingTask={editingTask}
        />
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
        <TaskTypePlantUpdate
          dataTaskTypePlant={dataTaskTypePlant}
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
        <RemindUpdate remindValue={remindValue} handleSelectRemind={handleSelectRemind} editingTask={editingTask}/>
        <RepeatUpdate repeatValue={repeatValue} handleSelectRepeat={handleSelectRepeat} editingTask={editingTask}/>

        {repeatValue && (
          <DateRepeatUpdate endDate={endDate} editingTask={editingTask}/>
        )}
      </div>
    </>
  );
}

export default UpdateWholeGarden;
