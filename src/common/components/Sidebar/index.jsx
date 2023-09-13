import React, { useState } from 'react'
import { menuItem, rootSubmenuKeys } from './sidebarData'
import { Menu } from 'antd'

function Sidebar() {
  const [openKeys, setOpenKeys] = useState(['sub1'])
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }
  return (
    <div className="sideBar">
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{
          width: 256,
        }}
        items={menuItem}
      />
    </div>
  )
}

export default Sidebar
