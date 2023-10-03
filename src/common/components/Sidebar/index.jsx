import React, { useState } from "react";
import { Button, Menu, Popover } from "antd";
import LogoSomo from "../../../assets/logo_Somo.png";
import { useDesktopMediaQuery, useTabletMediaQuery } from "common/hooks/responsive";
import { menuItem, rootSubmenuKeys } from "./sidebarData";
import Sider from "antd/es/layout/Sider";
import { MenuOutlined } from "@ant-design/icons";

function Sidebar() {
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const isDesktop = useDesktopMediaQuery();
  const isTablet = useTabletMediaQuery();
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <div className="sider">
      
      {isDesktop && (
        <Sider
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
            onOpenChange={onOpenChange}
            openKeys={openKeys}
            defaultSelectedKeys={["4"]}
            items={menuItem}
            style={{ borderInlineEnd: 0 }}
          />
        </Sider>
      )}
      {isTablet && (
        <div className="header-tablet">
          <div className="logoSomo">
            <img src={LogoSomo} alt="logo" />
          </div>
          <div className="menu-popover">
            <Popover
              defaultSelectedKeys={["4"]}
              placement="bottomRight"
              content={
                <Menu
                  theme="light"
                  mode="inline"
                  defaultSelectedKeys={["4"]}
                  items={menuItem}
                  style={{ borderInlineEnd: 0 }}
                />
              }
              trigger="click"
            >
              <Button>
                <MenuOutlined />
              </Button>
            </Popover>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar
