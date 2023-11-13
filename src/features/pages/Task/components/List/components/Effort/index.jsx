import { Button, Dropdown, Form, Input, Menu, Modal } from "antd";
import React from "react";
import UpdateEffort from "./UpdateEffort";
import DisplayEffort from "./DisplayEffort";

function Effort({
  effortVisible,
  handleEffortVisible,
  effort,
  handleMenuEffortClick,
  handleMenuSubTaskClick,
  editEffortVisible,
  closeEditEffortModal,
  handleUpdateEffort,
  currentTaskId,
  editingEffort,
  editingSubTask,
  isHaveSubTask,
  openEditSubTaskEffortModal
}) {
  return (
    <>
      <DisplayEffort
        effortVisible={effortVisible}
        handleEffortVisible={handleEffortVisible}
        effort={effort}
        handleMenuEffortClick={handleMenuEffortClick}
        handleMenuSubTaskClick={handleMenuSubTaskClick}
        isHaveSubTask={isHaveSubTask}
        openEditSubTaskEffortModal={openEditSubTaskEffortModal}
      />
      <UpdateEffort
        editEffortVisible={editEffortVisible}
        closeEditEffortModal={closeEditEffortModal}
        handleUpdateEffort={handleUpdateEffort}
        currentTaskId={currentTaskId}
        editingEffort={editingEffort}
        editingSubTask={editingSubTask}
      />
    </>
  );
}

export default Effort;
