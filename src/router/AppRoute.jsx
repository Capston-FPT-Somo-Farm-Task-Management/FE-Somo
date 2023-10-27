import LayoutWithRoute from 'common/components/Sidebar/LayoutWithRoute'
import SignIn from 'features/authentication/SignIn'
import AnimalGroup from 'features/pages/Animals/AnimalGroup'
import Animals from 'features/pages/Animals/Animals'
import Area from 'features/pages/Area'
import CropGroup from 'features/pages/Plants/CropGroup'
import MyCrops from 'features/pages/Plants/MyCrops'
import Schedule from 'features/pages/Schedule'
import Task from 'features/pages/Task'
import Zone from 'features/pages/Zone'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Material from 'features/pages/Material'

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route
        path="/"
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
    </Routes>
  )
}

export default AppRoute
