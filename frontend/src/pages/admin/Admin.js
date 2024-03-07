import { Col, Container, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Words from "../dashboard/words/Words";
import Sentences from "../dashboard/sentences/Sentences";
import AddSentence from "../dashboard/sentences/AddSentence";
import AdminHome from "./AdminHome";
import AddWord from "../dashboard/words/AddWord";
import EditWord from "../dashboard/words/EditWord";
import EditSentence from "../dashboard/sentences/EditSentence";
import Levels from "../dashboard/levels/Levels";
import Lessons from "../dashboard/lessons/Lessons";
import AddLesson from "../dashboard/lessons/AddLesson";
import AddLevel from "../dashboard/levels/AddLevel";
import EditLesson from "../dashboard/lessons/EditLesson";
import style from "./admin.module.css";
import EditLevel from "../dashboard/levels/EditLevel";
import Avatar from "@mui/material/Avatar";
import Users from "../dashboard/user_info/user";
import { UserAuth } from "../../context/AuthContext";

const Admin = () => {
  const { user } = UserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <div>
        <ToastContainer />
        <main>
          <Container className={style.adminContent} fluid>
            <Row>
              <Col className={style.sidebar} md={2}>
                <AdminSidebar />
              </Col>
              <Col className={style.content} md={10}>
                <div className={style.headerAd}>
                  <div className={style.adminAva}>
                    <Avatar className={style.avatar} src={user.avatar} />
                    <p> {user.name}</p>
                  </div>
                </div>
                <Routes>
                  <Route path="/" element={<AdminHome />} />
                  <Route path="/words" element={<Words />} />
                  <Route
                    path="/words/add"
                    element={<AddWord navigate={navigate} />}
                  />
                  <Route
                    path="/words/edit"
                    element={<EditWord location={location} />}
                  />
                  <Route path="/sentences" element={<Sentences />} />
                  <Route
                    path="/sentences/add"
                    element={<AddSentence navigate={navigate} />}
                  />
                  <Route
                    path="/sentences/edit"
                    element={<EditSentence navigate={navigate} />}
                  />
                  <Route path="/levels" element={<Levels />} />
                  <Route
                    path="/levels/add"
                    element={<AddLevel navigate={navigate} />}
                  />
                  <Route
                    path="/levels/edit"
                    element={<EditLevel navigate={navigate} />}
                  />
                  <Route path="/lessons" element={<Lessons />} />
                  <Route
                    path="/lessons/add"
                    element={<AddLesson navigate={navigate} />}
                  />
                  <Route
                    path="/lessons/edit"
                    element={<EditLesson navigate={navigate} />}
                  />
                  <Route path="/users" element={<Users />} />
                </Routes>
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    </>
  );
};
export default Admin;
// import { Col, Container, Row } from "react-bootstrap";
// import { ToastContainer } from "react-toastify";
// import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
// import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
// import Words from "../Words";
// import Sentences from "../Sentences";
// import AddSentence from "../AddSentence";
// import AdminHome from "../AdminHome";
// import AddWord from "../AddWord";
// import EditWord from "../EditWord";
// import EditSentence from "../EditSentence";
// import Levels from "../Levels";
// import Lessons from "../Lessons";
// import AddLesson from "../AddLesson";
// import AddLevel from "../AddLevel";
// import EditLesson from "../EditLesson";
// import EditLevel from "../EditLevel";
// import style from "./admin.module.css";

// const Admin = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   return (
//     <div>
//       <ToastContainer />
//       <main>
//         <Container className={style.adminContent} fluid>
//           <Row>
//             <Col md={2}>
//               <AdminSidebar />
//             </Col>
//             <Col md={10}>
//               <Routes>
//                 <Route path="/" element={<AdminHome />} />
//                 <Route path="/words" element={<Words />} />
//                 <Route
//                   path="/words/add"
//                   element={<AddWord navigate={navigate} />}
//                 />
//                 <Route
//                   path="/words/edit"
//                   element={<EditWord location={location} />}
//                 />
//                 <Route path="/sentences" element={<Sentences />} />
//                 <Route
//                   path="/sentences/add"
//                   element={<AddSentence navigate={navigate} />}
//                 />
//                 <Route
//                   path="/sentences/edit"
//                   element={<EditSentence navigate={navigate} />}
//                 />
//                 <Route path="/levels" element={<Levels />} />
//                 <Route
//                   path="/levels/add"
//                   element={<AddLevel navigate={navigate} />}
//                 />
//                 <Route
//                   path="/levels/edit"
//                   element={<EditLevel navigate={navigate} />}
//                 />
//                 <Route path="/lessons" element={<Lessons />} />
//                 <Route
//                   path="/lessons/add"
//                   element={<AddLesson navigate={navigate} />}
//                 />
//                 <Route
//                   path="/lessons/edit"
//                   element={<EditLesson navigate={navigate} />}
//                 />
//               </Routes>
//             </Col>
//           </Row>
//         </Container>
//       </main>
//     </div>
//   );
// };
// export default Admin;
