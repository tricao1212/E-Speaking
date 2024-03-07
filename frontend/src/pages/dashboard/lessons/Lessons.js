import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import Spinner from "../../../components/spinner/spinner";

const Lesson = ({ navigate }) => {
  const [lesson, setLesson] = useState([]);
  const [id, setId] = useState(0);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true);

    axios.get("http://34.136.63.21/api/lessons").then((response) => {
      setLesson(response.data);
      setIsLoading(false);
    });
  };
  useEffect(() => {
    fetchData();
  }, [navigate]);
  const handleDelete = async (id) => {
    await axios.delete("http://34.136.63.21/api/lessons/" + id);
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
  const render = (
    <Container>
      <Button variant="outline-primary" as={Link} to={"../lessons/add"}>
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
          <Button variant="danger" onClick={() => handleDelete(id)}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {lesson.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>

              <td>{item.name}</td>
              <td>
                <Button
                  variant="outline-warning"
                  as={Link}
                  to={"../lessons/edit"}
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
    </Container>
  );

  return <>{isLoading ? <Spinner /> : render}</>;
};
export default Lesson;