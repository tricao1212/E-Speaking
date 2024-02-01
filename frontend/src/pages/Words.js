import axios from "axios";
import { useEffect, useState } from "react";
import {Table ,Container, Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../styles/buttons.module.css";
const Words = () => {
    const [words, setWords] = useState([]);
    const fetchData = () => {
        axios.get("http://localhost:5000/api/words")
        .then(response => {
            setWords(response.data);
        })
    }
    useEffect(() => {
        fetchData();
    },[])
    const handleDelete =async (id) => {
        await axios.delete("http://localhost:5000/api/words/"+id);
        fetchData();
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
                                <Button variant="outline-danger" onClick={()=>handleDelete(item.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}
export default Words;