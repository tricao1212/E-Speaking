import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Container, Button, Modal, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import Spinner from "../../../components/spinner/spinner";
import { TextField } from "@mui/material";
import style from "./sentences.module.css"

const Sentences = () => {
  const [sentences, setSentences] = useState([]);
  const [id, setId] = useState(0);
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sentencesPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true);
    axios.get("http://34.136.63.21/api/sentences").then((response) => {
      setSentences(response.data);
      setIsLoading(false);
    });
  };
  useEffect(() => {
    fetchData();
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
    sentence.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const currentSentences = filteredSentences.slice(
    indexOfFirstSentence,
    indexOfLastSentence
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const render = (
    <div>
      <div className={style.filterbox}>
        <TextField id="outlined-size-small" size="small" label="Search" variant="filled" onChange={(e) => setSearchQuery(e.target.value)} />
        <Button variant="outline-primary" as={Link} to={"../sentences/add"}>
          Add
        </Button>
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
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button variant="danger" onClick={() => handleDelete(id)}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
        <Table variant="white">
          <thead>
            <tr>
              <th>#</th>
              <th>Sentences</th>
              <th>Lesson</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentSentences.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.content}</td>
                <td>{item.lesson.name}</td>
                <td>
                  <Button
                    variant="outline-warning"
                    as={Link}
                    to={"../sentences/edit"}
                    state={{ data: item }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleShow(item.id)}
                  >
                    Delete
                  </Button>
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
