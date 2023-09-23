import { Route, Routes, useLocation } from 'react-router-dom'
import Header from 'common/components/Header'
import Sidebar from 'common/components/Sidebar'
import SignIn from 'features/authentication/SignIn'
import Register from 'features/authentication/Register'
import Forgot from 'features/authentication/Forgot'
import Schedule from 'features/pages/Schedule'
import Task from 'features/pages/Task'
import Home from 'features/pages/Home'
import Animals from 'features/pages/Animals/Animals'
import AnimalGroup from 'features/pages/Animals/AnimalGroup'
import MyCrops from 'features/pages/Plants/MyCrops'

function App() {
  const location = useLocation()

  const ShowSidebarAndHeader = () => {
    const { pathname } = location
    return !['/login'].includes(pathname)
  }

  return (
    <div className="App">
      {ShowSidebarAndHeader() && <Header />}
      <div className="content-wrapper">
        {ShowSidebarAndHeader() && <Sidebar />}
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

          {/* Plants */}
          <Route path="/crops" element={<MyCrops />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
