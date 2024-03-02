import { Col, Container, Image, Row } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { UserAuth } from "../../context/AuthContext";
import Login from "./login.module.css";
import loginBanner from "../../images/loginBanner.png";
import Header from "../../components/header/Header";

const HomePage = () => {
  const { googleSignIn } = UserAuth();
  const handleGoogleSignIn = async () => {
    await googleSignIn();
  };
  return (
    <>
      <Container fluid className={Login.login}>
        <Row>
          <Col className={Login.left} md={7}>
            <Image src={loginBanner} fluid></Image>
          </Col>
          <Col className={Login.right} md={5}>
            <Header />
            <div className={Login.welcome}>
              <h1>Welcome to E-speaking</h1>
            </div>
            <div className={Login.login_btn}>
              <GoogleButton onClick={handleGoogleSignIn} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default HomePage;
