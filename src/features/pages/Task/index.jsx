import React from 'react'
import { Tabs } from 'antd';
import List from './components/List';
import Board from './components/Board';
import CalendarTask from './components/CalendarTask';

const { TabPane } = Tabs;


function Task() {
  return (
    <div className='content'>
    <h3>Nhiệm vụ</h3>
    <Tabs defaultActiveKey="1">
        <TabPane tab="Danh sách" key="1" >
          <List style={{width: "100%"}}/>
        </TabPane>
        <TabPane tab="Bảng" key="2">
          <Board />
        </TabPane>
        <TabPane tab="Lịch" key="3">
          <CalendarTask />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Task