import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "@mui/material/Button";
import style from "./lesson.module.css";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://34.136.63.21/api/lessons")
      .then((response) => {
        setLessons(response.data);
      })
      .catch((e) => console.log(e));
  }, []);
  const handleClick = (item) => {
    navigate("/user/learn/word/lesson", { state: { lessonId: item } });
  };
  const back = () => {
    navigate("/user/learn");
  };
  return (
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
        {lessons.map((item, index) => (
          <Card className={style.card} key={index}>
            <Card.Header>
              Lesson {index + 1}: {item.name}
            </Card.Header>
            <Card.Body>
              <Button onClick={() => handleClick(item.id)} variant="contained">
                Start
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};
export default Lessons;
