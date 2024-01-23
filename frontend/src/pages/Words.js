import {Table ,Container, Button} from "react-bootstrap";
import { Link } from "react-router-dom";

const Words = () => {
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
                    <tr>
                        <td>1</td>
                        <td>practice</td>
                        <td>easy</td>
                        <td>3</td>
                        <td>
                            <Button variant="outline-warning" as={Link} to={'../words/edit'}>Edit</Button>
                            <Button variant="outline-danger" onClick={handleDelete}>Delete</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    )
}
export default Words;