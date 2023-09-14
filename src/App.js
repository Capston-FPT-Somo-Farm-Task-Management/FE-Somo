import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from 'common/components/Header'
import Home from 'features/pages/home'
import Sidebar from 'common/components/Sidebar'
import SignIn from 'features/authentication/SignIn'
import Register from 'features/authentication/Register'
import Forgot from 'features/authentication/Forgot'
import LiveStock from 'features/pages/livestock'
import Plants from 'features/pages/plants'
import Schedule from 'features/pages/home/schedule'
import Task from 'features/pages/tasks'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="content-wrapper">
          <Sidebar />
          <Routes>
            <Route path="/*" element={<Home />} exact />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/task" element={<Task />} />
            <Route path="/livestock" element={<LiveStock />} />
            <Route path="/plants" element={<Plants />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
