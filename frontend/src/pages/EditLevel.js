import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const EditLevel = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {data} = location.state;
    const [level, setLevel] = useState(data.type);
    const handleSubmit = () => {
        const newLevel = {
            id: data.id,
            type: level
        }
        axios.put("https://localhost:7149/api/levels/"+data.id, newLevel)
        .then(response => {
            console.log(response.data);
        })
        .catch(error=>{
            console.error("Error: ", error);
        });
        navigate('/admin/levels');
    }
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Level</Form.Label>
                    <Form.Control type="text" value={level} placeholder="Enter a level" onChange={e=>setLevel(e.target.value)}/>
                    <span></span>
                </Form.Group>
                <Button type="submit">Update</Button>
            </Form>
        </Container>
    )
}
export default EditLevel;