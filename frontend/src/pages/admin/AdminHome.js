import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import style from "./adminHome.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

const AdminHome = () => {
  const [words, setWords] = useState(0);
  const [sentences, setSentences] = useState(0);
  const [lessons, setLessons] = useState(0);
  const [noOfUsers, setNoOfUsers] = useState(0);
  useEffect(() => {
    axios.get("http://34.136.63.21/api/words").then((response) => {
      setWords(response.data.length);
    });
    axios.get("http://34.136.63.21/api/sentences").then((response) => {
      setSentences(response.data.length);
    });
    axios.get("http://34.136.63.21/api/lessons").then((response) => {
      setLessons(response.data.length);
    });
    axios.get("http://34.136.63.21/api/auth").then((response) => {
      setNoOfUsers(response.data.length);
    });
  }, []);
  return (
    <Container className={style.content}>
      <Row>
        <Col className={style.card} md={6}>
            <Card>
              <Card.Header className={style.cardHead}>Word</Card.Header>
              <Card.Body>Total words: {words}</Card.Body>
            </Card>
        </Col>
        <Col className={style.card} md={6}>
          <Card>
            <Card.Header className={style.cardHead} >Sentence</Card.Header>
            <Card.Body>Total sentences: {sentences}</Card.Body>
          </Card>
        </Col>
        <Col className={style.card} md={6}>
          <Card>
            <Card.Header className={style.cardHead} >Lesson</Card.Header>
            <Card.Body>Total lessons: {lessons}</Card.Body>
          </Card>
        </Col>
        <Col className={style.card} md={6}>
          <Card>
            <Card.Header className={style.cardHead} >User</Card.Header>
            <Card.Body>Total users: {noOfUsers}</Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        
      </Row>
    </Container>
  );
};
export default AdminHome;
