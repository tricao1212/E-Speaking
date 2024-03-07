import axios from "axios";
import { useEffect, useState } from "react";
import {Table ,Container, Button, Modal, Pagination} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import Spinner from "../../../components/spinner/spinner";

const Words = () => {

    const [id, setId] = useState(0);
    const [show, setShow] = useState(false);
    const [words, setWords] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [wordsPerPage] = useState(5);
    const [isLoading, setIsLoading] = useState(false);
    const fetchData = () => {
        setIsLoading(true);
        axios.get("http://34.136.63.21/api/words")
        .then(response => {
            setWords(response.data);
            setIsLoading(false);
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
        await axios.delete("http://34.136.63.21/api/words/"+id);
        fetchData();
        handleClose();
        toast.success('Deleted Successful!', {
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
    const indexOfLastWord = currentPage * wordsPerPage;
    const indexOfFirstWord = indexOfLastWord - wordsPerPage;
    const currentWords = words.slice(indexOfFirstWord, indexOfLastWord);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const render = (
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
                        <th>Lesson</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentWords.map((item, index) => (
                        <tr key={index}>
                            <td>{(currentPage-1)*wordsPerPage+index+1}</td>
                            <td>{item.content}</td>
                            <td>{item.lesson.name}</td>
                            <td >
                                <Button  variant="outline-warning" as={Link} to={'../words/edit'} state={{data: item}}>Edit</Button>
                                <Button  variant="outline-danger" onClick={()=>handleShow(item.id)}>Delete</Button>
                            </td>
                        </tr>
                        
                    ))}
                </tbody>
            </Table>
            <Pagination>
                {Array.from({ length: Math.ceil(words.length / wordsPerPage) }).map((_, index) => (
                    <Pagination.Item
                        key={index}
                        active={index + 1 === currentPage}
                        onClick={() => paginate(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </Container>
    );

    return (
        <>
        {isLoading ? <Spinner /> : render}
        </>
    )
}
export default Words;

