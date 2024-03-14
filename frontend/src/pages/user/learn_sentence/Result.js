import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";

const Result = () => {
  const { user } = UserAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { lessonId, correct, noOfWords, results } = location.state;
  const [listProcess, setListProcess] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/processes")
      .then((response) => {
        setListProcess(response.data);
      })
      .catch((e) => console.error(e));
  }, []);

  
  const handleGoBack = () => {
    // const percent = correct*100/noOfWords;
    // const newProcess = {
    //     userUID: user.uid,
    //     lessonId: lessonId,
    //     progress: percent,
    // }
    // axios.post("http://34.136.63.21/api/processes", newProcess)
    // .then(()=> {
    navigate("/user/learn/sentence");
    // })
  };
  return (
    <div>
      <div>You have completed the lesson.</div>
      <div>
        {correct}/{noOfWords} correct answers
      </div>
      {results.map((item, index) => (
        <p key={index} style={{ color: "green" }}>
          <div dangerouslySetInnerHTML={{ __html: item }} />
        </p>
      ))}
      <button onClick={() => handleGoBack()}>Go back</button>
    </div>
  );
};
export default Result;
