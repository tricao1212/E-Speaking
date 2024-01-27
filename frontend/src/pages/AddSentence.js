import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddSentence = () => {

    const navigate = useNavigate();
    const [sentence, setSentence] = useState('');
    const [difficulties, setDifficulties] = useState([]);
    const [difficulty, setDifficulty] = useState(0);

    useEffect(() => {
        axios.get("https://localhost:7149/api/difficulties")
        .then(response => {
            setDifficulties(response.data);
        })
    },[])
    const handleSubmit = () => {
        const newSentence = {
            id: 0,
            content: sentence,
            difficultyId: difficulty
        }
        axios.post("https://localhost:7149/api/sentences",newSentence)
        .then(response => {
            console.log(response.data);
        })
        .catch(error=>{
            console.error("Error: ", error);
        });
        navigate('/admin/sentences');
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
                    <Form.Label>Difficulty</Form.Label>
                    <Form.Select aria-label="Difficulty" onChange={e=>setDifficulty(e.target.value)}>
                        <option>Select a difficulty</option>
                        {difficulties.map((item) => (
                            <option key={item.id} value={item.id}>{item.type}</option>
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