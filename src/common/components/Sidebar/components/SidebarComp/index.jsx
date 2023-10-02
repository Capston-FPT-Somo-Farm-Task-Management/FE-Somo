import React, { useEffect, useState } from "react";
import { Button, Menu, Popover } from "antd";
import Sider from "antd/es/layout/Sider";
import LogoSomo from "../../../../../assets/logo_Somo.png";
import { menuItem, rootSubmenuKeys } from "./sidebarData";
import { MenuOutlined } from "@ant-design/icons";
import {
  useDesktopMediaQuery,
  useTabletMediaQuery,
} from "common/hooks/responsive";
function SidebarComp() {
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
    <>
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
    </>
  );
}

export default SidebarComp;
