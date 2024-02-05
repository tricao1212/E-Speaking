import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

const AddDifficulty = ({navigate}) => {
    const [difficulty, setDifficulty] = useState('');
    const handleSubmit = () => {
        const newDifficulty = {
            id: 0,
            type: difficulty
        }
        axios.post("http://localhost:5000/api/difficulties", newDifficulty)
        .then(()=>{
            navigate('/admin/difficulties');
        })
    }
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Difficulty</Form.Label>
                    <Form.Control type="text" onChange={(e) => setDifficulty(e.target.value)} placeholder="Enter a difficulty"/>
                    <span></span>
                </Form.Group>
                <Button type="submit">Add</Button>
            </Form>
        </Container>
    )
}
export default AddDifficulty;