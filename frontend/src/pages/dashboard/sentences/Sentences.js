import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Container, Button, Modal, Pagination, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import Spinner from "../../../components/spinner/spinner";
import { Fab, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import style from "./sentences.module.css"
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Sentences = () => {
  const [sentences, setSentences] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [id, setId] = useState(0);
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sentencesPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const fetchData = () => {
    setIsLoading(true);
    axios.get("http://34.136.63.21/api/sentences").then((response) => {
      setSentences(response.data);
      setIsLoading(false);
    });
  };
  useEffect(() => {
    fetchData();
    axios.get("http://34.136.63.21/api/lessons")
        .then(response => {
            setLessons(response.data);
        })
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);
  const handleDelete = async (id) => {
    await axios.delete("http://34.136.63.21/api/sentences/" + id);
    fetchData();
    handleClose();
    toast("Deleted Successful!", {
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
  };
  const handleClose = () => {
    setShow(false);
    setId(0);
  };
  const handleShow = (selectedId) => {
    setShow(true);
    setId(selectedId);
  };
  const indexOfLastSentence = currentPage * sentencesPerPage;
  const indexOfFirstSentence = indexOfLastSentence - sentencesPerPage;
  const filteredSentences = sentences.filter(sentence =>
    sentence.content.toLowerCase().includes(searchQuery.toLowerCase())&&
    (selectedLesson === 0 || sentence.lessonId === selectedLesson)
  );
  const currentSentences = filteredSentences.slice(
    indexOfFirstSentence,
    indexOfLastSentence
  );
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
                value={selectedLesson === 0 ? '' :selectedLesson}
                onChange={(e) => {
                  const value = e.target.value;
                    if (value === '') {
                        setSelectedLesson(0);
                    } else {
                        setSelectedLesson(value);
                    }
                }}
                >
                    <MenuItem value={0}>
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
                <Fab size="medium" color="primary" aria-label="add" onClick={()=>navigate('../sentences/add')}>
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
          <Modal.Body>
            Are you sure to delete this content? It will be removed permanently.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => handleDelete(id)}>
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
              <th>Sentences</th>
              <th>Lesson</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentSentences.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.content}</td>
                <td>{item.lesson.name}</td>
                <td>
                  <IconButton color="warning" aria-label="edit" onClick={()=>navigate("../sentences/edit",{state: { data: item }})}>
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
          {Array.from({
            length: Math.ceil(filteredSentences.length / sentencesPerPage),
          }).map((_, index) => (
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
};
export default Sentences;
