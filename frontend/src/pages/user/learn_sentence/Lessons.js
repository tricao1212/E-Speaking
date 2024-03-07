import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
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
    navigate("/user/learn/sentence/lesson", { state: { lessonId: item } });
  };
  return (
    <div>
      <Card>
        <Card.Header>Choose the lesson</Card.Header>
        <Card.Body>
          <ul>
            {lessons.map((item, index) => (
              <li key={index} onClick={() => handleClick(item.id)}>
                {item.name}
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
};
export default Lessons;
