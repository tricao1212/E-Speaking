import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "@mui/material/Button";
import banner from "../../images/banner.png";
import homeStyle from "./home.module.css";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Header from '../../components/header/Header'

const Home = () => {
  const ColorButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#000",
    boxShadow: "1px 4px",
    color: "#FFF",
    "&:hover": {
      backgroundColor: "#FFF",
      color: "#000",
    },
  }));

  return (
    <>
    <Header/>
    <main>
      <Container>
        <hr></hr>
      </Container>
      <Container className={homeStyle.firstBlock}>
        <Row>
          <Col className={homeStyle.left} md={6}>
            <div>
              <h1>Improve Your Speaking Skills with Our App</h1>
            </div>
            <p>
              Practice speaking and gain confidence in a fun and interactive
              way.
            </p>
            <div className={homeStyle.start}>
              <Link to="/login">
                <ColorButton variant="contained">Get Started</ColorButton>
              </Link>
            </div>
          </Col>
          <Col className={homeStyle.right} md={6}>
            <img src={banner} alt="banner"></img>
          </Col>
        </Row>
        <hr></hr>
      </Container>
    </main>
    </>
  );
};

export default Home;
