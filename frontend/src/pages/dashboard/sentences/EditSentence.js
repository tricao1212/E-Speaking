import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useLocation, useNavigate } from 'react-router-dom'
import { Bounce, toast } from "react-toastify";
const EditSentence = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const {data} = location.state;
    const [lessons, setLessons] = useState([]);
    const [sentence, setSentence] = useState(data.content);
    const [lesson, setLesson] = useState(data.difficultyId);

    useEffect(()=> {
        axios.get("http://34.136.63.21/api/lessons")
        .then(response=> {
            setLessons(response.data)
        });
    },[])
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const newSentence = {
            id: data.id,
            content: sentence,
            lessonId: lesson
        }
        axios.put("http://34.136.63.21/api/sentences/"+data.id, newSentence)
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
                    <Form.Control type="text" value={sentence} placeholder="Enter a sentence" onChange={e=>setSentence(e.target.value)}/>
                    <span></span>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Lesson</Form.Label>
                    <Form.Select aria-label="Lesson" value={lesson} onChange={e=>setLesson(e.target.value)}>
                        <option>Select a lesson</option>
                        {lessons.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </Form.Select>
                    <span></span>
                </Form.Group>
                <Button type="submit">Update</Button>
            </Form>
        </Container>
    )
}
export default EditSentence;