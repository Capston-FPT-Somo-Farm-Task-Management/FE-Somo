import React from 'react'
import ModalTask from './components/ModalTask'
import { Tabs } from 'antd';
import List from './components/List';
import Board from './components/Board';
import Calendar from './components/Calendar';

const { TabPane } = Tabs;


function Task() {
  return (
    <div className='content'>
    <h3>Nhiệm vụ</h3>
    <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Danh sách" key="1">
          <List />
        </TabPane>
        <TabPane tab="Bảng" key="2">
          <Board />
        </TabPane>
        <TabPane tab="Lịch" key="3">
          <Calendar />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Task