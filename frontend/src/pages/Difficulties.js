import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { ConfirmToast } from "react-confirm-toast";
import { Link } from "react-router-dom";
import styles from "../styles/buttons.module.css";

const Difficulties = () => {
    const [difficulties, setDifficulties] = useState([]);
    useEffect(()=> {
        axios.get('https://localhost:7149/api/difficulties')
        .then(response => setDifficulties(response.data))
    },[])
    console.log(difficulties);
    const handleDelete = (id) => {
        
    }
    return (
        <Container>
            <Button variant="outline-primary" as={Link} to={'../difficulties/add'}>Add</Button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {difficulties.map((item, index)=>(
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.type}</td>
                            <td className={styles.btn2}>
                                <Button variant="outline-warning" as={Link} to={'../difficulties/edit'} state={{data:item}}>Edit</Button>
                                <ConfirmToast
                                    asModal={true}
                                    customCancel={'No'}
                                    customConfirm={'Yes'}
                                    customFunction={handleDelete(item.id)}
                                    message={'Do you want to continue and execute the function?'}
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
export default Difficulties;