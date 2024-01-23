import { Button, Container, Form } from "react-bootstrap";

const AddSentence = () => {
    return (
        <Container>
            <Form>
                <Form.Group>
                    <Form.Label>Sentence</Form.Label>
                    <Form.Control type="text" placeholder="Enter a sentence"/>
                    <span></span>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Difficulty</Form.Label>
                    <Form.Select aria-label="Difficulty">
                        <option>Select a difficulty</option>
                        <option>Easy</option>
                        <option>Normal</option>
                        <option>Hard</option>
                    </Form.Select>
                    <span></span>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Group</Form.Label>
                    <Form.Select>
                        <option>Select a group</option>
                        <option>1</option>
                        <option>2</option>
                    </Form.Select>
                    <span></span>
                </Form.Group>
                <Button type="submit">Add</Button>
            </Form>
        </Container>
    )
}
export default AddSentence;