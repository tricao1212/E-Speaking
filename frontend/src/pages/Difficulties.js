import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Difficulties = () => {
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
                    <tr>
                        <td>1</td>
                        <td>Easy</td>
                        <td>
                            <Button variant="outline-warning" as={Link} to={'../difficulties/edit'}>Edit</Button>
                            <Button variant="outline-danger" onClick={()=>{}}>Delete</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    )
}
export default Difficulties;