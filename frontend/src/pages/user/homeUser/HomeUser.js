import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Learn from "../learn/Learn";
import { Routes, Route } from "react-router-dom";
import LearnWord from "../learn_word/Lessons";
import Wordlesson from "../learn_word/Render";
import Result from "../learn_word/Result";
import LearnSentence from "../learn_sentence/Lessons";
import SentenceLesson from "../learn_sentence/Render";
import SentenceResult from "../learn_sentence/Result";
import UserSidebar from "../../../components/userSidebar/userSidebar";
import style from "./HomeUserCss.module.css";
import Profile from "../profile/profile";
function HomeUser() {
  return (
    <>
      <Container fluid className="main">
        <Row>
          <Col className={style.sidebar} xs={2}>
            <UserSidebar/>
          </Col>
          <Col  >
            <Routes>
              <Route path="/learn" element={<Learn />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/learn/word" element={<LearnWord />} />
              <Route path="/learn/word/lesson" element={<Wordlesson />} />
              <Route path="/learn/word/result" element={<Result />} />
              <Route path="/learn/sentence" element={<LearnSentence />} />
              <Route path="/learn/sentence/lesson" element={<SentenceLesson />} />
              <Route path="/learn/sentence/result" element={<SentenceResult />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomeUser;
