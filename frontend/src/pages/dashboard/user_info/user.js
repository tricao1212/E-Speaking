import axios from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  Container,
  Button,
  Modal,
  Pagination,
  Form,
} from "react-bootstrap";
import Spinner from "../../../components/spinner/spinner";
import { Bounce, toast } from "react-toastify";

const Users = () => {
  const [user, setUser] = useState({});
  const [role, setRole] = useState(0);
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [wordsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = () => {
    setIsLoading(true);
    axios.get("http://localhost:5000/api/auth").then((response) => {
      setUsers(response.data);
      setIsLoading(false);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleClose = () => {
    setShow(false);
    setUser({});
  };

  const handleShow = (selectedUser) => {
    setShow(true);
    setUser(selectedUser);
    setRole(selectedUser.role)
  };

  const handleSave = async () => {
    const newRole = {
      uid: user.uid,
      avatar: user.avatar,
      email: user.email,
      name: user.name,
      role: role
    }
    await axios.put("http://34.136.63.21/api/auth/"+user.uid, newRole)
      .then(()=>{
        fetchData()
        toast('Updated Successful!', {
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
        handleClose();
      })
    }
  const indexOfLastWord = currentPage * wordsPerPage;
  const indexOfFirstWord = indexOfLastWord - wordsPerPage;
  const currentWords = users.slice(indexOfFirstWord, indexOfLastWord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const render = (
    <Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control type="Name" value={user.name} disabled />
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={user.email} disabled />
            </Form.Group>
            <Form.Select aria-label="Default select example" onChange={(e)=>setRole(e.target.value)} value={role}>
              <option>Select Role</option>
              <option value="1">Admin</option>
              <option value="2">User</option>
            </Form.Select>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleSave()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentWords.map((item, index) => (
            <tr key={index}>
              <td>{(currentPage - 1) * wordsPerPage + index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role === 1 ? "Admin" : "User"}</td>
              <td>
                <Button onClick={() => handleShow(item)}>Edit role</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {Array.from({ length: Math.ceil(users.length / wordsPerPage) }).map(
          (_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          )
        )}
      </Pagination>
    </Container>
  );

  return <>{isLoading ? <Spinner /> : render}</>;
};
export default Users;
