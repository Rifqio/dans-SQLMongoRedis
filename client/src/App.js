import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.page";
import NavbarComponent from "./components/Navbar.component";
import AddUser from "./pages/AddUser.page";
import ClassList from "./pages/ClassList.page";
import EditUser from "./pages/EditUser.page";
import NotFound from "./pages/404.page";
import HomeMongo from "./pages/mongo/HomeMongo";
import Option from "./pages/Option.page";
import AddUserMongo from "./pages/mongo/AddUserMongo.page";

function App() {
  return (
    <>
      <NavbarComponent />
      <div className="mx-16 my-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-user/" element={<Option />}/>
          <Route path="/add-user/sql" element={<AddUser />} />
          <Route path="/add-user/mongo" element={<AddUserMongo />} />
          <Route path="/class-list" element={<ClassList />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
          <Route path="/mongo" element={<HomeMongo />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
