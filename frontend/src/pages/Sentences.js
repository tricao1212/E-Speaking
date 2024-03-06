import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Container, Button, Modal, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
const Sentences = () => {
  const [sentences, setSentences] = useState([]);
  const [id, setId] = useState(0);
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sentencesPerPage] = useState(5);
  const fetchData = () => {
    axios.get("http://34.136.63.21/api/sentences").then((response) => {
      setSentences(response.data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
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
  const currentSentences = sentences.slice(
    indexOfFirstSentence,
    indexOfLastSentence
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <Container>
      <Button variant="outline-primary" as={Link} to={"../sentences/add"}>
        Add
      </Button>
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
          length: Math.ceil(sentences.length / sentencesPerPage),
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
  );
};
export default Sentences;
