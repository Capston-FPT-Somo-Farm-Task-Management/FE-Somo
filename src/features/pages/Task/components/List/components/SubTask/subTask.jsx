import React, { useState } from "react";
import AddSubTask from "./AddSubTask";
import DisplaySubTask from "./DisplaySubTask";
import UpdateSubTask from "./UpdateSubTask";
import UpdateSubTaskEffort from "./UpdateSubTaskEffort";

function SubTask({
  addSubtaskVisible,
  closeAddSubtaskModal,
  form,
  availableEmployees,
  handleDescription,
  subTaskModalVisible,
  handleSubTaskModalVisible,
  subTasks,
  handleAddSubTask,
  description,
  handleMenuSubTaskClick,
  editSubTaskModalVisible,
  editSubTaskEffortModalVisible,
  closeEditSubTaskModal,
  handleUpdateSubTask,
  editingSubTask,
  editingTask,
  handleUpdateSubTaskEffort,
  closeEditSubTaskEffortModal,
  statusForEdit,
  currentTaskId,
  handleSelectStartDay,
  handleSelectEndDay
}) {
  return (
    <>
      <AddSubTask
        addSubtaskVisible={addSubtaskVisible}
        closeAddSubtaskModal={closeAddSubtaskModal}
        form={form}
        handleAddSubTask={handleAddSubTask}
        availableEmployees={availableEmployees}
        description={description}
        handleDescription={handleDescription}
        editingTask={editingTask}
        handleSelectStartDay={handleSelectStartDay}
        handleSelectEndDay={handleSelectEndDay}
      />
      <DisplaySubTask
        subTaskModalVisible={subTaskModalVisible}
        handleSubTaskModalVisible={handleSubTaskModalVisible}
        subTasks={subTasks}
        handleMenuSubTaskClick={handleMenuSubTaskClick}
        statusForEdit={statusForEdit}
        editingTask={editingTask}
      />
      <UpdateSubTask
        editSubTaskModalVisible={editSubTaskModalVisible}
        closeEditSubTaskModal={closeEditSubTaskModal}
        handleUpdateSubTask={handleUpdateSubTask}
        description={description}
        handleDescription={handleDescription}
        editingSubTask={editingSubTask}
        editingTask={editingTask}
      />
      <UpdateSubTaskEffort
        editSubTaskEffortModalVisible={editSubTaskEffortModalVisible}
        handleUpdateSubTaskEffort={handleUpdateSubTaskEffort}
        closeEditSubTaskEffortModal={closeEditSubTaskEffortModal}
        editingSubTask={editingSubTask}
        currentTaskId={currentTaskId}
      />
    </>
  );
}

export default SubTask;
