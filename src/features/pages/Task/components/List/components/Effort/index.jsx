import { Button, Dropdown, Form, Input, Menu, Modal } from "antd";
import React from "react";
import UpdateEffort from "./UpdateEffort";
import DisplayEffort from "./DisplayEffort";

function Effort({
  effortVisible,
  handleEffortVisible,
  effort,
  handleMenuEffortClick,
  editEffortVisible,
  closeEditEffortModal,
  handleUpdateEffort,
  currentTaskId,
  editingEffort,
}) {
  return (
    <>
      <DisplayEffort
        effortVisible={effortVisible}
        handleEffortVisible={handleEffortVisible}
        effort={effort}
        handleMenuEffortClick={handleMenuEffortClick}
      />
      <UpdateEffort
        editEffortVisible={editEffortVisible}
        closeEditEffortModal={closeEditEffortModal}
        handleUpdateEffort={handleUpdateEffort}
        currentTaskId={currentTaskId}
        editingEffort={editingEffort}
      />
    </>
  );
}

export default Effort;
