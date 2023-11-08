import React, { useState } from "react";
import AddSubTask from "./AddSubTask";
import DisplaySubTask from "./DisplaySubTask";
import UpdateSubTask from "./UpdateSubTask";

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
  closeEditSubTaskModal,
  handleUpdateSubTask,
  editingSubTask
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
      />
      <DisplaySubTask
        subTaskModalVisible={subTaskModalVisible}
        handleSubTaskModalVisible={handleSubTaskModalVisible}
        subTasks={subTasks}
        handleMenuSubTaskClick={handleMenuSubTaskClick}
      />
      <UpdateSubTask
        editSubTaskModalVisible={editSubTaskModalVisible}
        closeEditSubTaskModal={closeEditSubTaskModal}
        handleUpdateSubTask={handleUpdateSubTask}
        editingSubTask={editingSubTask}
        description={description}
        handleDescription={handleDescription}
      />
    </>
  );
}

export default SubTask;
