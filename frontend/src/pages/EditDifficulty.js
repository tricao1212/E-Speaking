const EditDifficulty = () => {
    return (
        <Container>
            <Form>
                <Form.Group>
                    <Form.Label>Difficulty</Form.Label>
                    <Form.Control type="text" placeholder="Enter a difficulty"/>
                    <span></span>
                </Form.Group>
                <Button type="submit">Update</Button>
            </Form>
        </Container>
    )
}
export default EditDifficulty;