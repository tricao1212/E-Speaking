import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddWord = () => {
    const [word, setWord] = useState('')
    const [difficulties, setDifficulties] = useState([])
    const [difficulty, setDifficulty] = useState(0)
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("https://localhost:7149/api/difficulties")
        .then(response => {
            setDifficulties(response.data);
        })
    },[])
    const handleSubmit = () => {
        const newSentence = {
            id: 0,
            content: word,
            difficultyId: difficulty
        }
        axios.post("https://localhost:7149/api/words",newSentence)
        .then(response => {
            console.log(response.data);
        })
        .catch(error=>{
            console.error("Error: ", error);
        });
        navigate('/admin/words');
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
                    <Form.Label>Difficulty</Form.Label>
                    <Form.Select aria-label="Difficulty" onChange={e=>setDifficulty(e.target.value)}>
                        <option>Select a difficulty</option>
                        {difficulties.map((item) => (
                            <option key={item.id} value={item.id}>{item.type}</option>
                        ))}
                    </Form.Select>
                    <span></span>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Group</Form.Label>
                    <Form.Select>
                        <option>Select a group</option>
                        <option>1</option>
                        <option>2</option>
                    </Form.Select>
                    <span></span>
                </Form.Group>
                <Button type="submit">Add</Button>
            </Form>
        </Container>
    )
}
export default AddWord;