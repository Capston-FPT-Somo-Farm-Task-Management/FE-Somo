import React from 'react'
import { Form } from 'antd'
import AreaLivestockSelect from '../FormItemCreate/AreaLivestockSelect'
import ZoneAnimalSelect from '../FormItemCreate/ZoneAnimal'
import FieldAnimalSelect from '../FormItemCreate/FieldAnimalSelect'
import AnimalSelect from '../FormItemCreate/AnimalSelect'
import DateSelect from '../FormItemCreate/DateSelect'
import OverallEffortSelect from '../FormItemCreate/OverallEffortSelect'
import DescriptionInput from '../FormItemCreate/DescriptionInput'
import NameTaskInput from '../FormItemCreate/NameTaskInput'
import TaskTypeLivestockSelect from '../FormItemCreate/TaskTypeLivestockSelect'
import SupervisorSelect from '../FormItemCreate/SupervisorSelect'
import EmployeeSelect from '../FormItemCreate/EmployeeSelect'
import MaterialSelect from '../FormItemCreate/MaterialSelect'
import PrioritySelect from '../FormItemCreate/PrioritySelect'
import RemindSelect from '../FormItemCreate/RemindSelect'
import RepeatSelect from '../FormItemCreate/RepeatSelect'

function SpecificAnimal({
  handleCreateTask,
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
  areaLivestockByZone,
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
  selectedDays,
  setSelectedDays
}) {
  return (
    <Form
      layout="vertical"
      className="task-form"
      onFinish={handleCreateTask}
      id="createTaskToDo"
      name="createTask"
      form={form}
    >
      <div className="form-left">
        <AreaLivestockSelect
          handleSelectAreaChange={handleSelectAreaChange}
          areaLivestockByZone={areaLivestockByZone}
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
        <DateSelect
          disabledDate={disabledDate}
          handleSelectStartDate={handleSelectStartDate}
          handleSelectEndDate={handleSelectEndDate}
          startDate={startDate}
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
        <NameTaskInput />
        <TaskTypeLivestockSelect
          dataTaskTypeLivestock={dataTaskTypeLivestock}
          handleTaskTypeChange={handleTaskTypeChange}
        />
        <SupervisorSelect supervisor={supervisor} />
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
    </Form>
  )
}

export default SpecificAnimal
