import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const EditDifficulty = ({navigate}) => {
    const location = useLocation();
    const {data} = location.state;
    
    const [difficulty, setDifficulty] = useState(data.type);
    const handleSubmit = (e) => {
        e.preventDefault();
        const newDifficulty = {
            id: data.id,
            type: difficulty
        }
        axios.put("http://localhost:5000/api/difficulties/"+data.id, newDifficulty)
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
            navigate('/admin/difficulties');
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
                    <Form.Control type="text" placeholder="Enter a difficulty" value={difficulty} onChange={e=>{setDifficulty(e.target.value)}}/>
                    <span></span>
                </Form.Group>
                <Button type="submit">Update</Button>
            </Form>
        </Container>
    )
}
export default EditDifficulty;