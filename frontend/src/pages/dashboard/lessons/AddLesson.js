import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const AddLesson = () => {
    const navigate = useNavigate();
    const [lesson, setLesson] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const newLesson = {
            id: 0,
            name: lesson
        }
        axios.post("http://34.136.63.21/api/lessons", newLesson)
        .then(()=>{
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
            navigate('/admin/lessons');
        })
    }
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Lesson</Form.Label>
                    <Form.Control type="text" onChange={(e) => setLesson(e.target.value)} placeholder="Enter a lesson"/>
                    <span></span>
                </Form.Group>
                <Button type="submit">Add</Button>
            </Form>
        </Container>
    )
}
export default AddLesson;