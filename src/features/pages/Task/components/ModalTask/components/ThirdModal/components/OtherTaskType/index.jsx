import React from "react";
import { Button, Form } from "antd";
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
import RepeatSelect from "../FormItemCreate/RepeatSelect";

function OtherTaskType({
  handleIsDraftOther,
  handleIsTaskOtherToDo,
  handleFormOtherSubmit,
  isDraft,
  handleSelectAreaChange,
  handleSelectZoneChange,
  handleSelectFieldChange,
  addressDetail,
  handleNameChange,
  setAddressDetail,
  handlePriorityChange,
  handleSupervisorValue,
  handleSelectStartDate,
  handleSelectEndDate,
  handleDescriptionChange,
  handleTaskTypeChange,
  handleMaterialChange,
  handleSelectRemind,
  handleSelectRepeat,
  form,
  areaByFarm,
  zoneByArea,
  fieldByZone,
  name,
  startDate,
  endDate,
  description,
  priorityValue,
  supervisorValue,
  taskTypeActive,
  supervisor,
  materialsValue,
  material,
  remindValue,
  repeatValue,
  disabledDate,
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
      onFinish={handleFormOtherSubmit}
      id="createTaskToDo"
      name="createTask"
      form={form}
    >
      <div className="task-form">
        <div className="form-left">
          <AreaByFarmSelect
            handleSelectAreaChange={handleSelectAreaChange}
            areaByFarm={areaByFarm}
            isDraft={isDraft}
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
            calculateDaysDifference={calculateDaysDifference}
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
          <NameTaskInput name={name} handleNameChange={handleNameChange}/>
          <TaskTypeActiveSelect
            taskTypeActive={taskTypeActive}
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
            calculateDaysDifference={calculateDaysDifference}
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
          />
        </div>
      </div>
      <div className="form-task-button">
        <Button onClick={handleIsDraftOther} htmlType="submit">
          Lưu bản nháp
        </Button>
        <Button onClick={handleIsTaskOtherToDo} htmlType="submit">
          Tạo công việc
        </Button>
      </div>
    </Form>
  );
}

export default OtherTaskType;
