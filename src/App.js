import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Header from 'common/components/Header'
import Home from 'features/pages/home'
import Sidebar from 'common/components/Sidebar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="content-wrapper">
        <Sidebar/>
        <Routes>
          <Route path="/*" element={<Home />} exact />
        </Routes>
        </div>
        
      </BrowserRouter>
    </div>
  )
}

export default App
