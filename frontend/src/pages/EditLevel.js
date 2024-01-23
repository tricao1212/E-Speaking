const EditLevel = () => {
    return (
        <Container>
            <Form>
                <Form.Group>
                    <Form.Label>Level</Form.Label>
                    <Form.Control type="text" placeholder="Enter a level"/>
                    <span></span>
                </Form.Group>
                <Button type="submit">Update</Button>
            </Form>
        </Container>
    )
}
export default EditLevel;