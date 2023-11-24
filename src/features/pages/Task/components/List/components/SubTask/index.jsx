import React from "react";
import DisplaySubTask from "./DisplaySubTask";

function SubTask({
  subTaskModalVisible,
  handleSubTaskModalVisible,
  subTasks,
  handleMenuSubTaskClick,
  editingTask,
  statusForEdit,
}) {
  return (
    <>
      <DisplaySubTask
        subTaskModalVisible={subTaskModalVisible}
        handleSubTaskModalVisible={handleSubTaskModalVisible}
        subTasks={subTasks}
        handleMenuSubTaskClick={handleMenuSubTaskClick}
        statusForEdit={statusForEdit}
        editingTask={editingTask}
      />
    </>
  );
}

export default SubTask;
