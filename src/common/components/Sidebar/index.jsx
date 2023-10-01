import React, { useState } from "react";
import { Button, Drawer } from "antd";
import SidebarComp from "./components/SidebarComp";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="sider">
      <div className="sideBar">
        <SidebarComp />
      </div>
      <div className="drawer">
        <Button onClick={showDrawer}>Open Sidebar</Button>

        <Drawer title={null} placement="left" onClose={onClose} open={open}>
          <SidebarComp />
        </Drawer>
      </div>
    </div>
  );
}

export default Sidebar;
