import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link, useHref } from "react-router-dom";
import styles from "../styles/buttons.module.css";
import { ConfirmToast } from "react-confirm-toast";

const Difficulties = () => {
    const [difficulties, setDifficulties] = useState([]);
    const href = useHref();
    const fetchData = () => {
        axios.get('http://localhost:5000/api/difficulties')
        .then(response => setDifficulties(response.data))
    }
    useEffect(()=> {
        fetchData();
    },[href])
    console.log(difficulties);
    const handleDelete = async (id) => {
        await axios.delete("http://localhost:5000/api/difficulties/"+id);
        fetchData();
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
export default Difficulties;