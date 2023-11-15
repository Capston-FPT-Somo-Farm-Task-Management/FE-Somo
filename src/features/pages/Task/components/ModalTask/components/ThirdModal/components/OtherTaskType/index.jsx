import React from "react";
import { Form } from "antd";
import dayjs from "dayjs";
import AreaByFarmSelect from "../FormItemCreate/AreaByFarmSelect";
import ZoneByAreaSelect from "../FormItemCreate/ZoneByAreaSelect";
import FieldOtherSelect from "../FormItemCreate/FieldOtherSelect";
import AddressDetailInput from "../FormItemCreate/AddressDetailInput";
import DateSelect from "../FormItemCreate/DateSelect";
import OverallEffortSelect from "../FormItemCreate/OverallEffortSelect";
import DescriptionInput from "../FormItemCreate/DescriptionInput";
import NameTaskInput from "../FormItemCreate/NameTaskInput";
import TaskTypeActiveSelect from "../FormItemCreate/TaskTypeActiveSelect";
import SupervisorSelect from "../FormItemCreate/SupervisorSelect";
import EmployeeSelect from "../FormItemCreate/EmployeeSelect";
import MaterialSelect from "../FormItemCreate/MaterialSelect";
import PrioritySelect from "../FormItemCreate/PrioritySelect";
import RemindSelect from "../FormItemCreate/RemindSelect";
import RepeatSelect from "features/pages/Task/components/List/components/UpdateTask/components/FormItemUpdate/RepeatSelect";

function OtherTaskType({
  handleCreateTaskOther,
  handleSelectAreaChange,
  handleSelectZoneChange,
  handleSelectFieldChange,
  addressDetail,
  setAddressDetail,
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
  areaByFarm,
  zoneByArea,
  fieldByZone,
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
  const calculateDaysDifference = (startDate, endDate) => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    return end.diff(start, "days");
  };
  return (
    <Form
      layout="vertical"
      className="task-form"
      onFinish={handleCreateTaskOther}
      id="createTask"
      name="createTask"
      form={form}
    >
      <div className="form-left">
        <AreaByFarmSelect
          handleSelectAreaChange={handleSelectAreaChange}
          areaByFarm={areaByFarm}
        />
        <ZoneByAreaSelect
          handleSelectZoneChange={handleSelectZoneChange}
          zoneByArea={zoneByArea}
        />
        <FieldOtherSelect
          handleSelectFieldChange={handleSelectFieldChange}
          fieldByZone={fieldByZone}
        />
        <AddressDetailInput
          addressDetail={addressDetail}
          setAddressDetail={setAddressDetail}
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
          calculateDaysDifference={calculateDaysDifference}
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
        <TaskTypeActiveSelect
          taskTypeActive={taskTypeActive}
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
          startDate={startDate}
          endDate={endDate}
          calculateDaysDifference={calculateDaysDifference}
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
        />
      </div>
    </Form>
  );
}

export default OtherTaskType;
