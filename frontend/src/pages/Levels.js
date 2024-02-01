import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../styles/buttons.module.css";
import { ConfirmToast } from "react-confirm-toast";
const Levels = () => {
    const [levels, setLevels] = useState([]);
    const fetchData = () => {
        axios.get("http://localhost:5000/api/levels")
        .then(response => setLevels(response.data));
    }
    useEffect(() => {
        fetchData();
    },[])
    const handleDelete =async (id) => {
        await axios.delete("http://localhost:5000/api/levels/"+id);
        fetchData();
    }
    return (
        <Container>
            <Button variant="outline-primary" as={Link} to={'../levels/add'}>Add</Button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {levels.map((item, index)=>(
                        <tr key={item.id}>
                            <td>{index+1}</td>
                            <td>{item.type}</td>
                            <td className={styles.btn2}>
                                <Button variant="outline-warning" as={Link} to={'../levels/edit'} state={{data: item}}>Edit</Button>
                                <ConfirmToast
                                    asModal={true}
                                    customCancel={'No'}
                                    customConfirm={'Yes'}
                                    customFunction={()=>handleDelete(item.id)}
                                    message={'Do you want to continue and execute the function?'}
                                    position={'top-left'}
                                    showCloseIcon={false}
                                    theme={'light'}
                                >
                                    <Button variant="outline-danger">Delete</Button>
                                </ConfirmToast>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}
export default Levels;