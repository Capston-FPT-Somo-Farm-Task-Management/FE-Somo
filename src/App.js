import { Route, Routes, useLocation } from 'react-router-dom'
import Header from 'common/components/Header'
import Sidebar from 'common/components/Sidebar'
import SignIn from 'features/authentication/SignIn'
import Register from 'features/authentication/Register'
import Forgot from 'features/authentication/Forgot'
import Schedule from 'features/pages/Schedule'
import Task from 'features/pages/Task'
import List from 'features/pages/Task/components/List'
import Board from 'features/pages/Task/components/Board'
import Calendar from 'features/pages/Task/components/Calendar'

import Plants from 'features/pages/Plants'
import Home from 'features/pages/Home'
import Animals from 'features/pages/Animals'
import AddAnimals from 'features/pages/Animals/components/AddAnimals/AddAnimals'

function App() {
  const location = useLocation()

  // Function to check if the current location matches certain paths
  const ShowSidebarAndHeader = () => {
    const { pathname } = location
    return !['/login', '/logout'].includes(pathname)
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
          <Route path="/task" element={<Task />}>
            <Route index element={<List />} />
            <Route path=":board" element={<Board />} />
            <Route path=":calendar" element={<Calendar />} />
          </Route>

          {/* Animals */}
          <Route path="/animals" element={<Animals />} />
          <Route path="/animals/new" element={<AddAnimals />} />

          <Route path="/plants" element={<Plants />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
