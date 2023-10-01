import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import LogoSomo from "../../../../../assets/logo_Somo.png";
import { menuItem, rootSubmenuKeys } from "./sidebarData";

function SidebarComp() {
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
      breakpoint="lg"
      theme="light"
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div className="logoSomo">
        <img src={LogoSomo} alt="logo" />
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={menuItem}
      />
    </Sider>
  );
}

export default SidebarComp;
