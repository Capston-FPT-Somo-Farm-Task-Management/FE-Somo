import React, { useState } from "react";
import { menuItem, rootSubmenuKeys } from "./sidebarData";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import logoSomo from "../../../assets/logo_Somo.png";

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
    <Sider
      style={{
        marginRight: "25px",
        boxShadow: "2px 0px 2px 0 rgba(94, 98, 105, 0.2)",
      }}
      theme="light"
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="sideBar">
        <div className="logo-somo">
          <img src={logoSomo} alt="logo" />
        </div>
        <Menu
          mode="inline"
          // defaultOpenKeys={defaultOpenKeys}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          style={{
            width: "100%",
            height: "100%",
          }}
          items={menuItem}
        />
      </div>
    </Sider>
  );
}

export default Sidebar;
