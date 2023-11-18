import React from "react";
import AreaByFarmUpdate from "../FormItemUpdate/AreaByFarmUpdate";
import ZoneByAreaUpdate from "../FormItemUpdate/ZoneByAreaUpdate";
import FieldOtherUpdate from "../FormItemUpdate/FieldOtherUpdate";
import AddressDetailUpdate from "../FormItemUpdate/AddressDetailUpdate";
import NameTaskUpdate from "../FormItemUpdate/NameTaskUpdate";
import TaskTypeActiveUpdate from "../FormItemUpdate/TaskTypeActiveUpdate";
import SupervisorUpdate from "../FormItemUpdate/SupervisorUpdate";
import MaterialUpdate from "../FormItemUpdate/MaterialUpdate";
import PriorityUpdate from "../FormItemUpdate/PriorityUpdate";
import RemindUpdate from "../FormItemUpdate/RemindUpdate";
import RepeatUpdate from "../FormItemUpdate/RepeatUpdate.jsx";
import DateUpdate from "../FormItemUpdate/DateUpdate";
import DescriptionUpdate from "../FormItemUpdate/DescriptionUpdate";

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
  handleMaterialChange,
  handleSelectRemind,
  handleSelectRepeat,
  areaByFarm,
  zoneByArea,
  fieldByZone,
  addressDetail,
  setAddressDetail,
  priorityValue,
  description,
  taskTypeActive,
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
  initialSelectedDays,
  setInitialSelectedDays,
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
          initialSelectedDays={initialSelectedDays}
          setInitialSelectedDays={setInitialSelectedDays}
        />
      </div>
    </>
  );
}

export default UpdateTaskTypeOther;
