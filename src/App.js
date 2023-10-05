import { Route, Routes, useLocation } from 'react-router-dom'
import SignIn from 'features/authentication/SignIn'
import Register from 'features/authentication/Register'
import Forgot from 'features/authentication/Forgot'
import Task from 'features/pages/Task'
import Home from 'features/pages/Home'
import Animals from 'features/pages/Animals/Animals'
import AnimalGroup from 'features/pages/Animals/AnimalGroup'
import MyCrops from 'features/pages/Plants/MyCrops'
import { Drawer, Layout, Menu } from 'antd'

import Sidebar from 'common/components/Sidebar'
import CropGroup from 'features/pages/Plants/CropGroup'
import Schedule from 'features/pages/Schedule'
import { Content } from 'antd/es/layout/layout'
import React from 'react'
import Sider from 'antd/es/layout/Sider'
import { menuItem } from 'common/components/Sidebar/sidebarData'
import Area from 'features/pages/Area'
import Zone from 'features/pages/Zone'

function App() {
  const location = useLocation()

  // Function to check if the current location matches certain paths
  const ShowSidebarAndHeader = () => {
    const { pathname } = location
    return !['/login', '/logout'].includes(pathname)
  }
  return (
    <div className="App">
      {ShowSidebarAndHeader() && (
        <Layout hasSider>
          <Sidebar />
          <Layout className="site-layout">
            <Content
              style={{
                margin: '24px 16px 0',
                overflow: 'initial',
              }}
            >
              <div style={{ padding: '24px', width: '100%' }}>
                <Routes>
                  <Route path="/*" element={<Home />} exact />
                  <Route path="/login" element={<SignIn />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot" element={<Forgot />} />
                  <Route path="/schedule" element={<Schedule />} />

                  {/* task */}
                  <Route path="/task" element={<Task />} />

                  {/* Animals */}
                  <Route path="/animals" element={<Animals />} />

                  {/* Animal Group */}
                  <Route path="/animal-group" element={<AnimalGroup />} />

                  {/* Crop */}
                  <Route path="/crops" element={<MyCrops />} />

                  {/* Crop Group */}
                  <Route path="/crop-group" element={<CropGroup />} />

                  <Route path="/area" element={<Area />} />

                  <Route path="/zone" element={<Zone />} />
                </Routes>
              </div>
            </Content>
          </Layout>
        </Layout>
      )}
    </div>
  )
}

export default App
