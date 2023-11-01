import React from 'react'
import { Tabs } from "antd";

const { TabPane } = Tabs;


function StatusTabs ({ onTabChange }) {
  return (
    <Tabs defaultActiveKey="0" onChange={onTabChange}>
      <TabPane tab="Chuẩn bị" key="0"></TabPane>
      <TabPane tab="Đang thực hiện" key="1"></TabPane>
      <TabPane tab="Hoàn thành" key="2"></TabPane>
      <TabPane tab="Không hoàn thành" key="3"></TabPane>
      <TabPane tab="Đã xóa" key="4"></TabPane>
      <TabPane tab="Từ chối" key="5"></TabPane>
    </Tabs>
  )
}

export default StatusTabs 