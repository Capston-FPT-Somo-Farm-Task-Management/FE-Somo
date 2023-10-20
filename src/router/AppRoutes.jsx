import { Layout } from 'antd'
import Sidebar from 'common/components/Sidebar'
import Forgot from 'features/authentication/Forgot'
import Register from 'features/authentication/Register'
import SignIn from 'features/authentication/SignIn'
import AnimalGroup from 'features/pages/Animals/AnimalGroup'
import Animals from 'features/pages/Animals/Animals'
import Area from 'features/pages/Area'
import Home from 'features/pages/Home'
import CropGroup from 'features/pages/Plants/CropGroup'
import MyCrops from 'features/pages/Plants/MyCrops'
import Schedule from 'features/pages/Schedule'
import Task from 'features/pages/Task'
import Zone from 'features/pages/Zone'
import jwt_decode from 'jwt-decode'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'

const { Content } = Layout

const AppRoutes = () => {
  const user = useSelector((state) => state.user)
  const token = localStorage.getItem('somoFarm')

  const isLoggedIn = user !== null && user !== undefined && token !== null

  const decodedToken = jwt_decode(token)
  const role =
    decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

  const name =
    decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']

  console.log(role, name)

  return (
    <>
      <Layout hasSider>
        {isLoggedIn ? <Sidebar /> : null}
        <Layout className="site-layout">
          <Content
            style={{
              margin: '24px 16px 0',
              overflow: 'initial',
            }}
          >
            <div style={{ padding: '24px', width: '100%' }}>
              <Routes>
                {isLoggedIn ? (
                  <></>
                ) : (
                  <>
                    <Route
                      path="/"
                      element={<Navigate to="/login" replace />}
                    />
                    <Route path="/login" element={<SignIn />} />
                  </>
                )}

                <Route path="/schedule" element={<Schedule />} />
                <Route path="/task" element={<Task />} />
                <Route path="/animals" element={<Animals />} />
                <Route path="/animal-group" element={<AnimalGroup />} />
                <Route path="/crops" element={<MyCrops />} />
                <Route path="/crop-group" element={<CropGroup />} />
                <Route path="/area" element={<Area />} />
                <Route path="/zone" element={<Zone />} />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default AppRoutes
