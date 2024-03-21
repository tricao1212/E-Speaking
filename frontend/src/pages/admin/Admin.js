import { Col, Container, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import AdminSidebarMobile from "../../components/adminSidebar/AdminSidebarMobile";
import { Route, Routes } from "react-router-dom";
import Words from "../dashboard/words/Words";
import Sentences from "../dashboard/sentences/Sentences";
import AddSentence from "../dashboard/sentences/AddSentence";
import AdminHome from "./AdminHome";
import AddWord from "../dashboard/words/AddWord";
import EditWord from "../dashboard/words/EditWord";
import EditSentence from "../dashboard/sentences/EditSentence";
import Levels from "../dashboard/levels/Levels";
import Lessons from "../dashboard/lessons/Lessons";
import AddLesson from "../dashboard/lessons/AddLesson";
import AddLevel from "../dashboard/levels/AddLevel";
import EditLesson from "../dashboard/lessons/EditLesson";
import style from "./admin.module.css";
import EditLevel from "../dashboard/levels/EditLevel";
import Avatar from "@mui/material/Avatar";
import Users from "../dashboard/user_info/User";
import { UserAuth } from "../../context/AuthContext";
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from "@mui/material";
import { useState } from "react";

const Admin = () => {
  const { user } = UserAuth();
  const [isOpen, setIsOpen] = useState(false);
  const openNav = () => {
    setIsOpen(true);
  };
  const handleSwitch =() => {
    setIsOpen(false);
  }
  return (
    <div>
      <ToastContainer />
      <main>
        <div className={`${style.overlay} ${isOpen ? style.open : ''}`} onClick={handleSwitch}>
        </div>
        <AdminSidebarMobile isOpen={isOpen} onSwitch={handleSwitch} />
        <Container className={style.adminContent} fluid>
          <Row>
            <Col className={style.sidebar} md={2}>
              <AdminSidebar />
            </Col>
            <Col className={style.content} md={10}>
              <div className={style.headerAd}>
                <div className={style.btnList}>
                  <IconButton onClick={openNav}>
                    <MenuIcon/>
                  </IconButton>
                  </div>
                <div className={style.adminAva}>
                  <Avatar className={style.avatar} src={user.avatar} />
                  <div className={style.name}>{user.name}</div>
                </div>
              </div>
              <Routes>
                <Route path="/" element={<AdminHome />} />
                <Route path="/words" element={<Words />} />
                <Route
                  path="/words/add"
                  element={<AddWord />}
                />
                <Route
                  path="/words/edit"
                  element={<EditWord />}
                />
                <Route path="/sentences" element={<Sentences />} />
                <Route
                  path="/sentences/add"
                  element={<AddSentence />}
                />
                <Route
                  path="/sentences/edit"
                  element={<EditSentence />}
                />
                <Route path="/levels" element={<Levels />} />
                <Route
                  path="/levels/add"
                  element={<AddLevel />}
                />
                <Route
                  path="/levels/edit"
                  element={<EditLevel />}
                />
                <Route path="/lessons" element={<Lessons />} />
                <Route
                  path="/lessons/add"
                  element={<AddLesson />}
                />
                <Route
                  path="/lessons/edit"
                  element={<EditLesson />}
                />
                <Route path="/users" element={<Users />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
};
export default Admin;
