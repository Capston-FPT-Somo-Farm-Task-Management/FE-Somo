import React, { useState } from "react";
import { menuItem, rootSubmenuKeys } from "./sidebarData";
import { Menu } from "antd";

function Sidebar() {
  const [defaultOpenKeys, setDefaultOpenKeys] = useState(["sub3", "sub4"]);
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <div className="sideBar">
      <Menu
        mode="inline"
        // defaultOpenKeys={defaultOpenKeys}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{ width: "100%", height: "100%" }}
        items={menuItem}
      />
    </div>
  );
}

export default Sidebar;
