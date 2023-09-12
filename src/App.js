import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Header from "common/components/Header";
import Home from "features/pages/home";



function App() {
  return (
    <div className="App">
      <BrowserRouter >
      <Header/>
        <Routes>
          <Route path="/*" element={Home} exact/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
