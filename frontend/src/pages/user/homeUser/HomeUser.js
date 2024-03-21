import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Learn from "../learn/Learn";
import { Routes, Route } from "react-router-dom";
import UserSidebar from "../../../components/userSidebar/UserSidebar";
import style from "./HomeUserCss.module.css";

import Lessons from "../study/Lessons";
import Ranking from "../ranking/Ranking";
import Profile from "../profile/Profile";


function HomeUser() {
  return (
    <main>
      <Container fluid>
        <Row>
          <Col className={style.sidebar} md={2}>
            <UserSidebar />
          </Col>
          <Col className={style.content} >
            <Routes>
              <Route path="/learn" element={<Learn />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/learn/lessons" element={<Lessons/>}/>
              <Route path="/ranking" element={<Ranking/>}/>
            </Routes>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default HomeUser;
