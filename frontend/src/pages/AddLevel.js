import { Button, Container, Form } from "react-bootstrap";

const AddLevel = () => {
    return (
        <Container>
            <Form>
                <Form.Group>
                    <Form.Label>Level</Form.Label>
                    <Form.Control type="text" placeholder="Enter a level"/>
                    <span></span>
                </Form.Group>
                <Button type="submit">Add</Button>
            </Form>
        </Container>
    )
}
export default AddLevel;