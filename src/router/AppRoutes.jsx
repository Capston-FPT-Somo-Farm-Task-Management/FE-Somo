import { Layout } from 'antd'
import Sidebar from 'common/components/Sidebar'
import SignIn from 'features/authentication/SignIn'
import AnimalGroup from 'features/pages/Animals/AnimalGroup'
import Animals from 'features/pages/Animals/Animals'
import Area from 'features/pages/Area'
import CropGroup from 'features/pages/Plants/CropGroup'
import MyCrops from 'features/pages/Plants/MyCrops'
import Schedule from 'features/pages/Schedule'
import Task from 'features/pages/Task'
import Zone from 'features/pages/Zone'
import jwt_decode from 'jwt-decode'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'

const { Content } = Layout

const AppRoutes = () => {
  const user = useSelector((state) => state.user)
  const [role, setRole] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('somoFarm'))

  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token)
      const decodedRole =
        decodedToken[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ]
      setRole(decodedRole)
    }
  }, [token])

  return (
    <>
      <Layout hasSider>
        {role === 'Manager' && token && <Sidebar />}
        <Layout className="site-layout">
          <Content
            style={{
              margin: '24px 16px 0',
              overflow: 'initial',
            }}
          >
            <div style={{ padding: '24px', width: '100%' }}>
              <Routes>
                {/* {(user === null || user === undefined || token === null) && ( */}
                {!token && (
                  <>
                    <Route
                      path="/*"
                      element={<Navigate to="/login" replace />}
                    />
                    <Route path="/login" element={<SignIn />} />
                  </>
                )}

                {/* <>
                  <Route path="/" element={<Navigate to="/login" replace />} />
                </> */}
                {/* )} */}

                {role === 'Manager' && token && (
                  <>
                    <Route
                      path="/"
                      element={<Navigate to="/schedule" replace />}
                    />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/task" element={<Task />} />
                    <Route path="/animals" element={<Animals />} />
                    <Route path="/animal-group" element={<AnimalGroup />} />
                    <Route path="/crops" element={<MyCrops />} />
                    <Route path="/crop-group" element={<CropGroup />} />
                    <Route path="/area" element={<Area />} />
                    <Route path="/zone" element={<Zone />} />
                  </>
                )}
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default AppRoutes