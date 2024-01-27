import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const EditDifficulty = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {data} = location.state;
    const [difficulty, setDifficulty] = useState(data.type);
    const handleSubmit = () => {
        const newDifficulty = {
            id: data.id,
            type: difficulty
        }
        axios.put("https://localhost:7149/api/difficulties/"+data.id, newDifficulty)
        .then(response => {
            console.log(response.data);
        })
        .catch(error=>{
            console.error("Error: ", error);
        });
        navigate('/admin/difficulties');
    }
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Difficulty</Form.Label>
                    <Form.Control type="text" placeholder="Enter a difficulty" value={difficulty} onChange={e=>{setDifficulty(e.target.value)}}/>
                    <span></span>
                </Form.Group>
                <Button type="submit">Update</Button>
            </Form>
        </Container>
    )
}
export default EditDifficulty;