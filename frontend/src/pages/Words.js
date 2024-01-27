import axios from "axios";
import { useEffect, useState } from "react";
import {Table ,Container, Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../styles/buttons.module.css";
import { ConfirmToast } from "react-confirm-toast";
const Words = () => {
    const [words, setWords] = useState([]);
    useEffect(() => {
        axios.get("https://localhost:7149/api/words")
        .then(response => {
            setWords(response.data);
        })
    },[])
    const handleDelete = () => {
        window.confirm("Are you sure?")
    }
    return (
        <Container>
            <Button variant="outline-primary" as={Link} to={'../words/add'}>Add</Button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Word</th>
                        <th>Difficulty</th>
                        <th>Group</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {words.map((item, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.content}</td>
                            <td>{item.difficulty.type}</td>
                            <td>3</td>
                            <td className={styles.btn2}>
                                <Button variant="outline-warning" as={Link} to={'../words/edit'} state={{data: item}}>Edit</Button>
                                <ConfirmToast
                                    asModal={true}
                                    customCancel={'No'}
                                    customConfirm={'Yes'}
                                    customFunction={handleDelete}
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
export default Words;