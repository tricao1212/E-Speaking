import { Col, Row } from "react-bootstrap"
import { ToastContainer } from "react-toastify"
import AdminHeader from "../components/AdminHeader"
import AdminSidebar from "../components/AdminSidebar"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Words from "./Words"
import Sentences from "./Sentences"
import AddSentence from "./AddSentence"
import AdminHome from "./AdminHome"
import AddWord from "./AddWord"
import EditWord from "./EditWord"
import EditSentence from "./EditSentence"
import Levels from "./Levels"
import Difficulties from "./Difficulties"
import AddDifficulty from "./AddDifficulty"
import AddLevel from "./AddLevel"
import EditDifficulty from "./EditDifficulty"
import EditLevel from "./EditLevel"

const Admin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div>
            <ToastContainer/>
            <AdminHeader/>
            <main>
                <Row>
                    <Col md={3}>
                        <AdminSidebar/>
                    </Col>
                    <Col md={9}>
                        <Routes>
                            <Route path="/" element={<AdminHome/>}/>
                            <Route path="/words" element={<Words />} />
                            <Route path="/words/add" element={<AddWord navigate={navigate}/>} />
                            <Route path="/words/edit" element={<EditWord location={location}/>} />
                            <Route path="/sentences" element={<Sentences />} />
                            <Route path="/sentences/add" element={<AddSentence navigate={navigate}/>} />
                            <Route path="/sentences/edit" element={<EditSentence navigate={navigate}/>} />
                            <Route path="/levels" element={<Levels />} />
                            <Route path="/levels/add" element={<AddLevel navigate={navigate}/>} />
                            <Route path="/levels/edit" element={<EditLevel navigate={navigate}/>} />
                            <Route path="/difficulties" element={<Difficulties />} />
                            <Route path="/difficulties/add" element={<AddDifficulty navigate={navigate}/>} />
                            <Route path="/difficulties/edit" element={<EditDifficulty navigate={navigate}/>} />
                        </Routes>
                    </Col>
                </Row>
            </main>
        </div>
    )
}
export default Admin;