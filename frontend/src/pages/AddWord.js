import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Bounce, toast } from "react-toastify";

const AddWord = ({navigate}) => {
    const [word, setWord] = useState('')
    const [difficulties, setDifficulties] = useState([])
    const [difficulty, setDifficulty] = useState(0)
    useEffect(() => {
        axios.get("http://localhost:5000/api/difficulties")
        .then(response => {
            setDifficulties(response.data);
        })
    },[])
    const handleSubmit = (e) => {
        e.preventDefault();
        const newSentence = {
            id: 0,
            content: word,
            difficultyId: difficulty
        }
        axios.post("http://localhost:5000/api/words",newSentence)
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
export default AddWord;