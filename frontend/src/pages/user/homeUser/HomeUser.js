import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Learn from "../learn/Learn";
import { Routes, Route } from "react-router-dom";
import UserSidebar from "../../../components/userSidebar/userSidebar";
import style from "./HomeUserCss.module.css";
import Profile from "../profile/Profile";
import Lessons from "../study/Lessons";

function HomeUser() {
  return (
    <Container fluid className="main">
      <Row>
        <Col className={style.sidebar} xs={2}>
          <UserSidebar/>
        </Col>
        <Col className={style.content} >
          <Routes>
            <Route path="/learn" element={<Learn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/learn/lessons" element={<Lessons/>}/>
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}

export default HomeUser;
