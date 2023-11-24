import React from "react";
import DisplaySubTask from "./DisplaySubTask";

function SubTask({
  subTaskModalVisible,
  handleSubTaskModalVisible,
  subTasks,
  editingTask,
  statusForEdit,
}) {
  return (
    <>
      <DisplaySubTask
        subTaskModalVisible={subTaskModalVisible}
        handleSubTaskModalVisible={handleSubTaskModalVisible}
        subTasks={subTasks}
        statusForEdit={statusForEdit}
        editingTask={editingTask}
      />
    </>
  );
}

export default SubTask;
