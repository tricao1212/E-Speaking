import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Words = () => {
  const [id, setId] = useState(0);
  const [show, setShow] = useState(false);
  const [words, setWords] = useState([]);
  const fetchData = () => {
    axios.get("http://localhost:5000/api/words").then((response) => {
      setWords(response.data);
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
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete("http://localhost:5000/api/words/" + id);
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
  return (
    <Container>
      <Button variant="outline-primary" as={Link} to={"../words/add"}>
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">#</TableCell>
              <TableCell align="right">Word</TableCell>
              <TableCell align="right">Difficulty</TableCell>
              <TableCell align="right">Group</TableCell>
              <TableCell align="right">Function</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {words.map((item, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="right">{index + 1}</TableCell>
                <TableCell align="right">{item.content}</TableCell>
                <TableCell align="right">{item.difficulty.type}</TableCell>
                <TableCell align="right">3</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outline-warning"
                    as={Link}
                    to={"../words/edit"}
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
export default Words;
