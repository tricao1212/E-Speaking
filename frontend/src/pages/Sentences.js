import axios from "axios";
import { useEffect, useState } from "react";
import {Table ,Container, Button, Modal} from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../styles/buttons.module.css";
import { Bounce, toast } from "react-toastify";
const Sentences = () => {
    const [sentences, setSentences] = useState([]);
    const [id, setId] = useState(0);
    const [show, setShow] = useState(false)
    
    const fetchData = () => {
        axios.get("http://localhost:5000/api/sentences")
        .then(response => {
            setSentences(response.data);
        })
    }
    useEffect(() => {
        fetchData();
    },[])
    const handleDelete = async (id) => {
        await axios.delete("http://localhost:5000/api/sentences/"+id);
        fetchData();
        handleClose()
        toast('Deleted Successful!', {
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
    }
    const handleClose = () => {
        setShow(false);
        setId(0);
    }
    const handleShow = (selectedId) => {
        setShow(true);
        setId(selectedId);
    }
    return (
        <Container>
            <Button variant="outline-primary" as={Link} to={'../sentences/add'}>Add</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this content? It will be removed permanently.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="danger" onClick={()=>handleDelete(id)}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Sentences</th>
                        <th>Difficulty</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {sentences.map((item, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.content}</td>
                            <td>{item.difficulty.type}</td>
                            <td className={styles.btn2}>
                                <Button variant="outline-warning" as={Link} to={'../sentences/edit'} state={{data: item}}>Edit</Button>
                                <Button variant="outline-danger" onClick={()=>handleShow(item.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}
export default Sentences;