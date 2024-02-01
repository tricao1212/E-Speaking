import { Col, Container, Row } from "react-bootstrap"
import Header from "../components/Header"
import GoogleButton from "react-google-button"
import { UserAuth } from "../context/AuthContext"

const HomePage = () => {
    const { googleSignIn } = UserAuth();
    const handleGoogleSignIn = async () => {
        await googleSignIn();
    }
    return (
        <div>
            <Header/>
            <Container>
                <Row>
                    <Col md>
                        <h1>E-Speaking</h1>
                        <p>Start practice speaking English with a free service for community</p>
                    </Col>
                    <Col md>
                        <GoogleButton onClick={handleGoogleSignIn}/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default HomePage