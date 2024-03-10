import axios from "axios";
import { useEffect, useState } from "react";
import {Table ,Container, Button, Modal, Pagination, Row, Col} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import Spinner from "../../../components/spinner/spinner";
import style from "./words.module.css"
import { Fab, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const Words = () => {
    const [id, setId] = useState(0);
    const [show, setShow] = useState(false);
    const [words, setWords] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLesson, setSelectedLesson] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [wordsPerPage] = useState(5);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
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
        axios.get("http://34.136.63.21/api/lessons")
        .then(response => {
            setLessons(response.data);
        })
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
    const filteredWords = words.filter(word =>
        word.content.toLowerCase().includes(searchQuery.toLowerCase())&&
        (selectedLesson === 0 || word.lessonId === selectedLesson)
      );
    const currentWords = filteredWords.slice(indexOfFirstWord, indexOfLastWord);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const render = (
        <div>
            <div className={style.filterbox}>
                <Row>
                    <Col md={6}>
                        <TextField fullWidth id="outlined-size-small" size="small" label="Search" variant="filled" onChange={(e) => setSearchQuery(e.target.value)} />
                    </Col>
                    <Col md={3}>
                    <FormControl variant="standard" size="small" fullWidth>
                        <InputLabel id="demo-simple-select-standard-label">Lessons</InputLabel>
                        <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label={selectedLesson}
                        value={selectedLesson===0?'':selectedLesson}
                        onChange={(e) => setSelectedLesson(e.target.value)}
                        >
                            <MenuItem value=''>
                                <em>None</em>
                            </MenuItem>
                            {lessons.map((item, index)=> (
                                <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    </Col>
                    <Col md={3}>
                        <div className={style.addBtn}>
                            <Fab size="medium" color="primary" aria-label="add" onClick={()=>navigate('../words/add')}>
                                <AddIcon />
                            </Fab>
                        </div>
                    </Col>
                </Row>
            </div>
            <Container>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Warning</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure to delete this content? It will be removed permanently.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={()=>handleDelete(id)}>
                            Yes
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Table bordered>
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
                                    <IconButton color="warning" aria-label="edit" onClick={()=>navigate("../words/edit",{state: { data: item }})}>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton color="error" aria-label="delete" onClick={() => handleShow(item.id)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </td>
                            </tr>
                            
                        ))}
                    </tbody>
                </Table>
                <Pagination>
                    {Array.from({ length: Math.ceil(filteredWords.length / wordsPerPage) }).map((_, index) => (
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
        </div>
    );

    return (
        <>
        {isLoading ? <Spinner /> : render}
        </>
    )
}
export default Words;

