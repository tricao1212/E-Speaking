import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const AddLevel = () => {
    const [level, setLevel] = useState('');
    const [rangePoint, setRangePoint] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const newLevel= {
            id: 0,
            type: level,
            rangePoint
        }
        axios.post("http://34.136.63.21/api/levels", newLevel)
        .then(response=>{
            console.log(response);
            toast('Added Successful!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
            navigate('/admin/levels')
        });
    }
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Level</Form.Label>
                    <Form.Control type="text" onChange={e => setLevel(e.target.value)} placeholder="Enter a level"/>
                    <Form.Label>Range Point</Form.Label>
                    <Form.Control type="text" onChange={e => setRangePoint(e.target.value)} placeholder="Enter a range point"/>
                    <span></span>
                </Form.Group>
                <Button type="submit">Add</Button>
            </Form>
        </Container>
    )
}
export default AddLevel;