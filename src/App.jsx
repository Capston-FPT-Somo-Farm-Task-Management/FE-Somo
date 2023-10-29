import Notification from 'common/components/Notification'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AppRoute from 'router/AppRoute'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
      <Notification />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{ width: '300px', minHeight: '80px', fontSize: '16px' }}
      />
    </div>
  )
}

export default App
