import LayoutWithRoute from 'common/components/Sidebar/LayoutWithRoute'
import SignIn from 'features/authentication/SignIn'
import AnimalGroup from 'features/pages/Animals/AnimalGroup'
import Animals from 'features/pages/Animals/Animals'
import Area from 'features/pages/Area'
import CropGroup from 'features/pages/Plants/CropGroup'
import MyCrops from 'features/pages/Plants/MyCrops'
import Task from 'features/pages/Task'
import Zone from 'features/pages/Zone'
import { Navigate, Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Material from 'features/pages/Material'
import Schedule from 'features/pages/Schedule/Schedule'
import AdminPrivateRoute from './AdminPrivateRoute'
import NonAuthenRoute from './NonAuthenRoute'
import PageNotFound from 'features/pages/PageNotFound/PageNotFound'
import { authServices } from 'services/authServices'
import StatisticFarm from 'features/pages/Admin/Farm/StatisticFarm'
import AdminLayoutWithRoute from 'common/components/Sidebar/AdminLayoutWithRoute'
import StatisticArea from 'features/pages/Admin/Area/StatisticArea'
import StatisticZone from 'features/pages/Admin/Zone/StatisticZone'
import StatisticMember from 'features/pages/Admin/Member/StatisticMember'

const AppRoute = () => {
  return (
    <Routes>
      {/* =============Non Authen====== */}
      {authServices.getToken() === null && (
        <>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<SignIn />} />

          <Route path="/*" element={<Navigate to="/page-not-found" />} />
          <Route path="/page-not-found" element={<PageNotFound />} />
        </>
      )}

      {/* Manager */}
      {authServices.getToken() !== null &&
        authServices.getRole() === 'Manager' && (
          <>
            <Route path="/" element={<Navigate to="/schedule" replace />} />
          </>
        )}

      {/* Default manager */}

      <Route
        path="/schedule"
        element={
          <PrivateRoute>
            <LayoutWithRoute>
              <Schedule />
            </LayoutWithRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/task"
        element={
          <PrivateRoute>
            <LayoutWithRoute>
              <Task />
            </LayoutWithRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/area"
        element={
          <PrivateRoute>
            <LayoutWithRoute>
              <Area />
            </LayoutWithRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/zone"
        element={
          <PrivateRoute>
            <LayoutWithRoute>
              <Zone />
            </LayoutWithRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/animals"
        element={
          <PrivateRoute>
            <LayoutWithRoute>
              <Animals />
            </LayoutWithRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/animal-group"
        element={
          <PrivateRoute>
            <LayoutWithRoute>
              <AnimalGroup />
            </LayoutWithRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/plants"
        element={
          <PrivateRoute>
            <LayoutWithRoute>
              <MyCrops />
            </LayoutWithRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/crop-group"
        element={
          <PrivateRoute>
            <LayoutWithRoute>
              <CropGroup />
            </LayoutWithRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/material"
        element={
          <PrivateRoute>
            <LayoutWithRoute>
              <Material />
            </LayoutWithRoute>
          </PrivateRoute>
        }
      />

      {/* Admin */}
      {authServices.getToken() !== null &&
        authServices.getRole() === 'Admin' && (
          <>
            <Route
              path="/"
              element={<Navigate to="/statistic-farm" replace />}
            />
          </>
        )}

      {/* Default admin */}

      <Route
        path="/statistic-farm"
        element={
          <AdminPrivateRoute>
            <AdminLayoutWithRoute>
              <StatisticFarm />
            </AdminLayoutWithRoute>
          </AdminPrivateRoute>
        }
      />

      <Route
        path="/statistic-area"
        element={
          <AdminPrivateRoute>
            <AdminLayoutWithRoute>
              <StatisticArea />
            </AdminLayoutWithRoute>
          </AdminPrivateRoute>
        }
      />

      <Route
        path="/statistic-zone"
        element={
          <AdminPrivateRoute>
            <AdminLayoutWithRoute>
              <StatisticZone />
            </AdminLayoutWithRoute>
          </AdminPrivateRoute>
        }
      />

      <Route
        path="/statistic-member"
        element={
          <AdminPrivateRoute>
            <AdminLayoutWithRoute>
              <StatisticMember />
            </AdminLayoutWithRoute>
          </AdminPrivateRoute>
        }
      />

      {/* Login */}

      <Route
        path="/login"
        element={
          <NonAuthenRoute>
            <SignIn />
          </NonAuthenRoute>
        }
      />

      {/* Page not found */}
      <Route path="/*" element={<Navigate to="/page-not-found" />} />
      <Route path="/page-not-found" element={<PageNotFound />} />
      {/* ------------------------------------ */}
    </Routes>
  )
}

export default AppRoute
