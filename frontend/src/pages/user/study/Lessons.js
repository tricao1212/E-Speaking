import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "@mui/material/Button";
import style from "./lesson.module.css";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import Spinner from "../../../components/spinner/spinner";
import { UserAuth } from "../../../context/AuthContext";

const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const {type} = location.state;
  const [isLoading, setIsLoading] = useState(false);
  const {user} = UserAuth();
  const processes = user.processes.filter(p => p.type.includes(type));
  useEffect(() => {
    setIsLoading(true);
    axios.get("http://34.136.63.21/api/lessons")
      .then((response) => {
        setLessons(response.data);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);
  const handleClick = (item) => {
    navigate("/study", { state: { lessonId: item, type: type } });
  };
  const back = () => {
    navigate("/user/learn");
  };

  const render = (
    <>
      <div className={style.back}>
        <Button
          variant="outlined"
          onClick={() => back()}
          startIcon={<KeyboardReturnIcon />}
        >
          Back
        </Button>
      </div>
      <div>
        {lessons.map((item, index) =>{
          const lessonProgress = processes.find(p => p.lessonId === item.id)
         return (
          <Card className={style.card} key={index}>
            <Card.Header>
              <div className={style.headerbox}>
                Lesson {index + 1}: {item.name}
              {lessonProgress && (
                <b>{lessonProgress.progress}%</b>
              )}
              </div>
            </Card.Header>
            <Card.Body>
              <Button onClick={() => handleClick(item.id)} variant="contained">
                Start
              </Button>
            </Card.Body>
          </Card>
        )})}
          
      </div>
    </>
  );
  return <>{isLoading ? <Spinner /> : render}</>;
};
export default Lessons;
