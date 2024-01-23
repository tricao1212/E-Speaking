import { ListGroup } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import "../styles/adminsidebar.css"
const AdminSidebar = () => {
    return (
        <ListGroup>
            <ListGroup.Item as={NavLink} to={'/admin'} end>Home</ListGroup.Item>
            <ListGroup.Item as={NavLink} to={'/admin/words'}>Words</ListGroup.Item>
            <ListGroup.Item as={NavLink} to={'/admin/sentences'}>Sentences</ListGroup.Item>
            <ListGroup.Item as={NavLink} to={'/admin/levels'}>Levels</ListGroup.Item>
            <ListGroup.Item as={NavLink} to={'/admin/difficulties'}>Difficulties</ListGroup.Item>
        </ListGroup>
    )
}
export default AdminSidebar;