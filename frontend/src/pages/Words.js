import axios from "axios";
import { useEffect, useState } from "react";
import {Table ,Container, Button, Modal} from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../styles/buttons.module.css";
import { Bounce, toast } from "react-toastify";
const Words = () => {
    const [id, setId] = useState(0);
    const [show, setShow] = useState(false);
    const [words, setWords] = useState([]);
    const fetchData = () => {
        axios.get("http://localhost:5000/api/words")
        .then(response => {
            setWords(response.data);
        })
    }
    const handleClose = () => {
        setShow(false);
        setId(0);
    }
    const handleShow = (selectedId) => {
        setShow(true);
        setId(selectedId);
    }
    useEffect(() => {
        fetchData();
    },[])
    
    const handleDelete =async (id) => {
        await axios.delete("http://localhost:5000/api/words/"+id);
        fetchData();
        handleClose();
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
    return (
        
        <Container>
            <Button variant="outline-primary" as={Link} to={'../words/add'}>Add</Button>
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
                        <th>Word</th>
                        <th>Difficulty</th>
                        <th>Group</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {words.map((item, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.content}</td>
                            <td>{item.difficulty.type}</td>
                            <td>3</td>
                            <td className={styles.btn2}>
                                <Button variant="outline-warning" as={Link} to={'../words/edit'} state={{data: item}}>Edit</Button>
                                <Button variant="outline-danger" onClick={()=>handleShow(item.id)}>Delete</Button>
                            </td>
                        </tr>
                        
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}
export default Words;