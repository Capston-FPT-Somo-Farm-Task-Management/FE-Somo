import React, { useState } from "react";
import { Button, Drawer } from "antd";
import SidebarComp from "./components/SidebarComp";
import { useDesktopMediaQuery, useTabletMediaQuery } from "common/hooks/responsive";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const isDesktop = useDesktopMediaQuery();
  const isTablet = useTabletMediaQuery();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="sider">
      
      <SidebarComp/>
    </div>
  );
}

export default Sidebar;
