import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from 'common/components/Header'
import Home from 'features/pages/home'
import Sidebar from 'common/components/Sidebar'
import SignIn from 'features/authentication/SignIn'
import Register from 'features/authentication/Register'
import Forgot from 'features/authentication/Forgot'

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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
