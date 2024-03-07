import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Bounce, toast } from "react-toastify";

const AddWord = ({navigate}) => {
    const [word, setWord] = useState('')
    const [lessons, setLessons] = useState([])
    const [lesson, setLesson] = useState(0)
    useEffect(() => {
        axios.get("http://34.136.63.21/api/lessons")
        .then(response => {
            setLessons(response.data);
        })
    },[])
    const handleSubmit = (e) => {
        e.preventDefault();
        const newWord = {
            id: 0,
            content: word,
            lessonId: lesson
        }
        axios.post("http://34.136.63.21/api/words",newWord)
        .then(response => {
            console.log(response.data);
            toast.success('Added Successful!', {
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
                    <Form.Control type="text" onChange={e => setWord(e.target.value)} placeholder="Enter a word"/>
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
export default AddWord;