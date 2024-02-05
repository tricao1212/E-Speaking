import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

const AddLevel = ({navigate}) => {
    const [level, setLevel] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        const newLevel= {
            id: 0,
            type: level
        }
        axios.post("http://localhost:5000/api/levels", newLevel)
        .then(response=>{
            console.log(response);
            navigate('/admin/levels')
        });
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