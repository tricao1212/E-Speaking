import { Col, Container, Row } from "react-bootstrap"
import Header from "../components/Header"
import GoogleButton from "react-google-button"
import { UserAuth } from "../context/AuthContext"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
    const navigate = useNavigate();
    const { googleSignIn, user } = UserAuth();
    const handleGoogleSignIn = async () => {
        await googleSignIn();
    }
    useEffect(()=> {
        if (user!=null) {
            navigate('/admin')
        }
    })
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