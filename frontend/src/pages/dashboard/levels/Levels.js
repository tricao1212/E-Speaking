import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Modal, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import Spinner from "../../../components/spinner/spinner";
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Levels = () => {
  const [levels, setLevels] = useState([]);
  const [id, setId] = useState(0);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const fetchData = () => {
    setIsLoading(true);
    axios.get("http://34.136.63.21/api/levels").then((response) => {
      setLevels(response.data);
      setIsLoading(false);
    });
  };
  useEffect(() => {
    fetchData();
  }, [navigate]);
  const handleDelete = async (id) => {
    await axios.delete("http://34.136.63.21/api/levels/" + id);
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
      <Button variant="outline-primary" as={Link} to={"../levels/add"}>
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
      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {levels.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.type}</td>
              <td>
                <IconButton color="warning" aria-label="edit" onClick={()=>navigate("../levels/edit",{state: { data: item }})}>
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
    </Container>
  );
  return <>{isLoading ? <Spinner /> : render}</>;
};
export default Levels;
