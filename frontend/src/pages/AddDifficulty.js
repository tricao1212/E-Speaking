import { Button, Container, Form } from "react-bootstrap";

const AddDifficulty = () => {
    return (
        <Container>
            <Form>
                <Form.Group>
                    <Form.Label>Difficulty</Form.Label>
                    <Form.Control type="text" placeholder="Enter a difficulty"/>
                    <span></span>
                </Form.Group>
                <Button type="submit">Add</Button>
            </Form>
        </Container>
    )
}
export default AddDifficulty;