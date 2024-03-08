import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const EditLevel = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {data} = location.state;
    const [level, setLevel] = useState(data.type);
    const handleSubmit = (e) => {
        e.preventDefault();
        const newLevel = {
            id: data.id,
            type: level
        }
        axios.put("http://34.136.63.21/api/levels/"+data.id, newLevel)
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
            navigate('/admin/levels');
        })
        .catch(error=>{
            console.error("Error: ", error);
        });
    }
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Level</Form.Label>
                    <Form.Control type="text" value={level} placeholder="Enter a level" onChange={e=>setLevel(e.target.value)}/>
                    <span></span>
                </Form.Group>
                <Button type="submit">Update</Button>
            </Form>
        </Container>
    )
}
export default EditLevel;