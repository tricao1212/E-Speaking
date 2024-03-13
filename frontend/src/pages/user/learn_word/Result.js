import { Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./result.module.css";
import Button from "@mui/material/Button";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { UserAuth } from "../../../context/AuthContext";
import axios from "axios";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { correct, noOfWords, results, lessonId } = location.state;
  const {user} = UserAuth();
  const handleSubmit = () => {
    const process = {
        userUID: user.uid,
        lessonId: lessonId,
        progress: (correct * 100 ) / noOfWords,
        type: "word"
    }
    axios.post("https://localhost:7149/api/processes",process)
    .then(response => {
        console.log(response.data);
        navigate("/user/learn/word");
    })
    .catch(error=>{
        console.error("Error: ", error);
    });
}
  return (
    <>
      <Card className={style.card}>
        <Card.Header>
          <h2>Result</h2>
        </Card.Header>
        <Card.Body>
          <h3>
            {correct}/{noOfWords} correct answers
          </h3>
          {results.map((item, index) => (
            <p key={index} style={{ color: "green" }}>
              <div dangerouslySetInnerHTML={{ __html: item }} />
            </p>
          ))}
          <Button
            variant="outlined"
            onClick={()=>handleSubmit()}
            startIcon={<KeyboardReturnIcon />}
          >
            Back
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};
export default Result;
