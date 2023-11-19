import React from "react";
import AreaPlantUpdate from "../FormItemUpdate/AreaPlantUpdate";
import ZonePlantUpdate from "../FormItemUpdate/ZonePlantUpdate";
import FieldPlantUpdate from "../FormItemUpdate/FieldPlantUpdate";
import PlantUpdate from "../FormItemUpdate/PlantUpdate";
import NameTaskUpdate from "../FormItemUpdate/NameTaskUpdate";
import TaskTypePlantUpdate from "../FormItemUpdate/TaskTypePlantUpdate";
import SupervisorUpdate from "../FormItemUpdate/SupervisorUpdate";
import MaterialUpdate from "../FormItemUpdate/MaterialUpdate";
import PriorityUpdate from "../FormItemUpdate/PriorityUpdate";
import RemindUpdate from "../FormItemUpdate/RemindUpdate";
import RepeatUpdate from "../FormItemUpdate/RepeatUpdate.jsx";
import DateUpdate from "../FormItemUpdate/DateUpdate";
import DescriptionUpdate from "../FormItemUpdate/DescriptionUpdate";

function UpdateSpecificPlant({
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
  areaPlantByZone,
  zonePlant,
  fieldByZone,
  dataPlant,
  priorityValue,
  description,
  dataTaskTypePlant,
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
  setInitialSelectedDays
}) {
  return (
    <>
      <div className="form-left">
        <AreaPlantUpdate
          handleSelectAreaChange={handleSelectAreaChange}
          areaPlantByZone={areaPlantByZone}
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
        <PlantUpdate dataPlant={dataPlant} editingTask={editingTask} />
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
        <TaskTypePlantUpdate
          dataTaskTypePlant={dataTaskTypePlant}
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

export default UpdateSpecificPlant;
