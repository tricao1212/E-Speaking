import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const EditLesson = ({navigate}) => {
    const location = useLocation();
    const {data} = location.state;
    
    const [lesson, setLesson] = useState(data.name);
    const handleSubmit = (e) => {
        e.preventDefault();
        const newLesson = {
            id: data.id,
            name: lesson
        }
        axios.put("http://34.136.63.21/api/lessons/"+data.id, newLesson)
        .then(response => {
            console.log(response.data);
            toast('Updated Successful!', {
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
        .catch(error=>{
            console.error("Error: ", error);
        });
    }
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Difficulty</Form.Label>
                    <Form.Control type="text" placeholder="Enter a lesson" value={lesson} onChange={e=>{setLesson(e.target.value)}}/>
                    <span></span>
                </Form.Group>
                <Button type="submit">Update</Button>
            </Form>
        </Container>
    )
}
export default EditLesson;