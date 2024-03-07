import { Col, Container, Row } from "react-bootstrap";
import style from "./adminHome.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

const AdminHome = () => {
    const [words, setWords] = useState(0);
    const [sentences, setSentences] = useState(0);
    const [lessons, setLessons] = useState(0);
    const [noOfUsers, setNoOfUsers] = useState(0);
    useEffect(()=>{
        axios.get("http://34.136.63.21/api/words")
        .then(response => {
            setWords(response.data.length);
        })
        axios.get("http://34.136.63.21/api/sentences")
        .then(response => {
            setSentences(response.data.length);
        })
        axios.get("http://34.136.63.21/api/lessons")
        .then(response => {
            setLessons(response.data.length);
        })
        axios.get("http://34.136.63.21/api/auth")
        .then(response => {
            setNoOfUsers(response.data.length);
        })},[]);
    return (
        <Container>
            <Row>
                <Col className={style.box} md={5}>
                    total words: {words}
                </Col>
                <Col className={style.box} md={5}>
                    total sentences: {sentences}
                </Col>
            </Row>
            <Row>
                <Col className={style.box} md={5}>
                    total lessons: {lessons}
                </Col>
                <Col className={style.box} md={5}>
                    total users: {noOfUsers}
                </Col>
            </Row>
        </Container>
    )
}
export default AdminHome;