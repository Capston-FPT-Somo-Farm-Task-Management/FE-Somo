import React from "react";
import AreaByFarmUpdate from "../FormItemUpdate/AreaByFarmUpdate";
import ZoneByAreaUpdate from "../FormItemUpdate/ZoneByAreaUpdate";
import FieldOtherUpdate from "../FormItemUpdate/FieldOtherUpdate";
import AddressDetailUpdate from "../FormItemUpdate/AddressDetailUpdate";
import DateUpdate from "../FormItemUpdate/DateUpdate";
import OverallEffortUpdate from "../FormItemUpdate/OverallEffortUpdate";
import DescriptionUpdate from "../FormItemUpdate/DescriptionUpdate";
import NameTaskUpdate from "../FormItemUpdate/NameTaskUpdate";
import TaskTypeActiveUpdate from "../FormItemUpdate/TaskTypeActiveUpdate";
import SupervisorUpdate from "../FormItemUpdate/SupervisorUpdate";
import EmployeeUpdate from "../FormItemUpdate/EmployeeUpdate";
import MaterialUpdate from "../FormItemUpdate/MaterialUpdate";
import PriorityUpdate from "../FormItemUpdate/PriorityUpdate";
import RemindUpdate from "../FormItemUpdate/RemindUpdate";
import RepeatUpdate from "../FormItemUpdate/RepeatUpdate";

function UpdateTaskTypeOther({
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
  areaByFarm,
  zoneByArea,
  fieldByZone,
  addressDetail,
  setAddressDetail,
  priorityValue,
  description,
  overallEfforMinutes,
  overallEffortHour,
  taskTypeActive,
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
  setSelectedDays,
}) {
  return (
    <>
      <div className="form-left">
        <AreaByFarmUpdate
          handleSelectAreaChange={handleSelectAreaChange}
          areaByFarm={areaByFarm}
          editingTask={editingTask}
        />
        <ZoneByAreaUpdate
          handleSelectZoneChange={handleSelectZoneChange}
          zoneByArea={zoneByArea}
          editingTask={editingTask}
        />
        <FieldOtherUpdate
          handleSelectFieldChange={handleSelectFieldChange}
          fieldByZone={fieldByZone}
          editingTask={editingTask}
        />
        <AddressDetailUpdate
          addressDetail={addressDetail}
          setAddressDetail={setAddressDetail}
          editingTask={editingTask}
        />
        <PriorityUpdate
          priorityValue={priorityValue}
          handlePriorityChange={handlePriorityChange}
          editingTask={editingTask}
        />
        <DateUpdate
          editingTask={editingTask}
          disabledDate={disabledDate}
          handleSelectStartDate={handleSelectStartDate}
          handleSelectEndDate={handleSelectEndDate}
          startDate={startDate}
        />
        <OverallEffortUpdate
          overallEffortHour={overallEffortHour}
          handleOverallEffortHour={handleOverallEffortHour}
          overallEfforMinutes={overallEfforMinutes}
          handleOverallEfforMinutes={handleOverallEfforMinutes}
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
        <TaskTypeActiveUpdate
          taskTypeActive={taskTypeActive}
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
          startDate={startDate}
          endDate={endDate}
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
        />
      </div>
    </>
  );
}

export default UpdateTaskTypeOther;
