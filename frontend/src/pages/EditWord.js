import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const EditWord = ({location}) => {
    const navigate = useNavigate();
    const {data} = location.state;
    const [lessons, setLessons] = useState([]);
    const [word, setWord] = useState(data.content);
    const [lesson, setLesson] = useState(data.lessonId);

    useEffect(()=> {
        axios.get("http://34.136.63.21/api/lessons")
        .then(response=> {
            setLessons(response.data)
        });
    },[])
    const handleSubmit = (event) => {
        event.preventDefault();
        const newWord = {
            id: data.id,
            content: word,
            lessonId: lesson
        }
        axios.put("http://34.136.63.21/api/words/"+data.id, newWord)
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
            navigate('/admin/words');
        })
        .catch(error=>{
            console.error("Error: ", error);
        });
    }
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Word</Form.Label>
                    <Form.Control type="text" placeholder="Enter a word" value={word} onChange={e=>setWord(e.target.value)}/>
                    <span></span>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Difficulty</Form.Label>
                    <Form.Select aria-label="Difficulty" value={lesson} onChange={e=>setLesson(e.target.value)}>
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
export default EditWord;