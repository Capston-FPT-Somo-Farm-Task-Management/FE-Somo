import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "common/components/Sidebar";
import SignIn from "features/authentication/SignIn";
import Register from "features/authentication/Register";
import Forgot from "features/authentication/Forgot";
import Schedule from "features/pages/Schedule";
import Task from "features/pages/Task";
import Home from "features/pages/Home";
import Animals from "features/pages/Animals/Animals";
import AnimalGroup from "features/pages/Animals/AnimalGroup";
import MyCrops from "features/pages/Plants/MyCrops";
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import LogoSomo from "./assets/logo_Somo.png"

function App() {
  const location = useLocation();

  // Function to check if the current location matches certain paths
  const ShowSidebarAndHeader = () => {
    const { pathname } = location;
    return !["/login", "/logout"].includes(pathname);
  };
  return (
    <div className="App">
      {ShowSidebarAndHeader() && (
        <Layout hasSider>
          <Sider
            style={{ marginRight: "25px" }}
            theme="light"
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <div className="logo-somo" >
              <img src={LogoSomo} alt=""/>
            </div>
            <Sidebar />
          </Sider>

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
          {/* </div> */}
        </Layout>
      )}
    </div>
  );
}

export default App;
