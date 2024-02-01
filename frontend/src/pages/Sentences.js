import axios from "axios";
import { useEffect, useState } from "react";
import {Table ,Container, Button} from "react-bootstrap";
import { ConfirmToast } from "react-confirm-toast";
import { Link } from "react-router-dom";
import styles from "../styles/buttons.module.css";
const Sentences = () => {
    const [sentences, setSentences] = useState([]);
    const fetchData = () => {
        axios.get("http://localhost:5000/api/sentences")
        .then(response => {
            setSentences(response.data);
        })
    }
    useEffect(() => {
        fetchData();
    },[])
    const handleDelete = async (id) => {
        await axios.delete("http://localhost:5000/api/sentences/"+id);
        fetchData();
    }
    return (
        <Container>
            <Button variant="outline-primary" as={Link} to={'../sentences/add'}>Add</Button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Sentences</th>
                        <th>Difficulty</th>
                        <th>Group</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {sentences.map((item, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.content}</td>
                            <td>{item.difficulty.type}</td>
                            <td>3</td>
                            <td className={styles.btn2}>
                                <Button variant="outline-warning" as={Link} to={'../sentences/edit'} state={{data: item}}>Edit</Button>
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
export default Sentences;