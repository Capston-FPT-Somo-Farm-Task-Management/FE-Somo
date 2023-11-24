import { Button, Dropdown, Form, Input, Menu, Modal } from "antd";
import React from "react";
import DisplayEffort from "./DisplayEffort";

function Effort({
  effortVisible,
  handleEffortVisible,
  effort,
  handleMenuEffortClick,
  handleMenuSubTaskClick,
  isHaveSubTask,
  openSubtaskModal
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
        openSubtaskModal={openSubtaskModal}
      />
    </>
  );
}

export default Effort;
