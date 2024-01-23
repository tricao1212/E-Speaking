import { Col, Row } from "react-bootstrap"
import AdminHeader from "../components/AdminHeader"
import AdminSidebar from "../components/AdminSidebar"
import { Route, Routes } from "react-router-dom"
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

const Admin = () => {
    return (
        <div>
            <AdminHeader/>
            <main>
                <Row>
                    <Col md={3}>
                        <AdminSidebar/>
                    </Col>
                    <Col md={9}>
                        <Routes>
                            <Route path="/" element={<AdminHome/>}/>
                            <Route path="/words" element={<Words/>} />
                            <Route path="/words/add" element={<AddWord/>} />
                            <Route path="/words/edit" element={<EditWord/>} />
                            <Route path="/sentences" element={<Sentences/>} />
                            <Route path="/sentences/add" element={<AddSentence/>} />
                            <Route path="/sentences/edit" element={<EditSentence/>} />
                            <Route path="/levels" element={<Levels/>} />
                            <Route path="/levels/add" element={<AddLevel/>} />
                            <Route path="/levels/edit" element={<EditSentence/>} />
                            <Route path="/difficulties" element={<Difficulties/>} />
                            <Route path="/difficulties/add" element={<AddDifficulty/>} />
                            <Route path="/difficulties/edit" element={<EditSentence/>} />
                        </Routes>
                    </Col>
                </Row>
            </main>
        </div>
    )
}
export default Admin;