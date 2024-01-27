import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useLocation, useNavigate } from 'react-router-dom'
const EditSentence = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const {data} = location.state;
    const [difficulties, setDifficulties] = useState([]);
    const [sentence, setSentence] = useState(data.content);
    const [difficulty, setDifficulty] = useState(data.difficultyId);

    useEffect(()=> {
        axios.get("https://localhost:7149/api/difficulties")
        .then(response=> {
            setDifficulties(response.data)
        });
    },[])
    
    const handleSubmit = () => {
        const newSentence = {
            id: data.id,
            content: sentence,
            difficultyId: difficulty
        }
        axios.put("https://localhost:7149/api/sentences/"+data.id, newSentence)
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
                    <Form.Control type="text" value={sentence} placeholder="Enter a sentence" onChange={e=>setSentence(e.target.value)}/>
                    <span></span>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Difficulty</Form.Label>
                    <Form.Select aria-label="Difficulty" value={difficulty} onChange={e=>setDifficulty(e.target.value)}>
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
                <Button type="submit">Update</Button>
            </Form>
        </Container>
    )
}
export default EditSentence;