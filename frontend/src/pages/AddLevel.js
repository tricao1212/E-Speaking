import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddLevel = () => {
    const [level, setLevel] = useState('');
    const navigate = useNavigate();
    const handleSubmit = () => {
        const newLevel= {
            id: 0,
            type: level
        }
        axios.post("https://localhost:7149/api/levels", newLevel);
        navigate('/admin/levels')
    }
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Level</Form.Label>
                    <Form.Control type="text" onChange={e => setLevel(e.target.value)} placeholder="Enter a level"/>
                    <span></span>
                </Form.Group>
                <Button type="submit">Add</Button>
            </Form>
        </Container>
    )
}
export default AddLevel;