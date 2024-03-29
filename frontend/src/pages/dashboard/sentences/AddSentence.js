import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const AddSentence = () => {
    const navigate = useNavigate();
    const [sentence, setSentence] = useState('');
    const [lessons, setLessons] = useState([]);
    const [lesson, setLesson] = useState(0);

    useEffect(() => {
        axios.get("http://34.136.63.21/api/lessons")
        .then(response => {
            setLessons(response.data);
        })
    },[])
    const handleSubmit = (event) => {
        event.preventDefault();
        const newSentence = {
            id: 0,
            content: sentence,
            lessonId: lesson
        }
        axios.post("http://34.136.63.21/api/sentences",newSentence)
        .then(response => {
            console.log(response.data);
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
            navigate('/admin/sentences');
        })
        .catch(error=>{
            console.error("Error: ", error);
        });
    }
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Sentence</Form.Label>
                    <Form.Control type="text" onChange={e=>setSentence(e.target.value)} placeholder="Enter a sentence"/>
                    <span></span>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Lesson</Form.Label>
                    <Form.Select aria-label="Lesson" onChange={e=>setLesson(e.target.value)}>
                        <option>Select a lesson</option>
                        {lessons.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </Form.Select>
                    <span></span>
                </Form.Group>
                <Button type="submit">Add</Button>
            </Form>
        </Container>
    )
}
export default AddSentence;