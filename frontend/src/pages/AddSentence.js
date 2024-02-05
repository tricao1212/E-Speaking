import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Bounce, toast } from "react-toastify";

const AddSentence = ({navigate}) => {

    const [sentence, setSentence] = useState('');
    const [difficulties, setDifficulties] = useState([]);
    const [difficulty, setDifficulty] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:5000/api/difficulties")
        .then(response => {
            setDifficulties(response.data);
        })
    },[])
    const handleSubmit = (event) => {
        event.preventDefault();
        const newSentence = {
            id: 0,
            content: sentence,
            difficultyId: difficulty
        }
        axios.post("http://localhost:5000/api/sentences",newSentence)
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