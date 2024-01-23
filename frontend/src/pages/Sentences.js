import {Table ,Container, Button} from "react-bootstrap";
import { Link } from "react-router-dom";

const Sentences = () => {
    const handleDelete = () => {
        window.confirm("Are you sure?")
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
                    <tr>
                        <td>1</td>
                        <td>The fox jumps over the lazy dogs</td>
                        <td>easy</td>
                        <td>3</td>
                        <td>
                            <Button variant="outline-warning" as={Link} to={'../sentences/edit'}>Edit</Button>
                            <Button variant="outline-danger" onClick={handleDelete}>Delete</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    )
}
export default Sentences;