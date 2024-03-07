import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const {correct, noOfWords, results} = location.state;
    return (
        <div>
            <div>You have completed the lesson.</div>
            <div>{correct}/{noOfWords} correct answers</div>
            {results.map((item, index)=> (
                <p key={index} style={{color: "green"}}>
                    <div dangerouslySetInnerHTML={{ __html: item }} />
                </p>
            ))}
            <button onClick={()=>navigate('/user/learn/sentence')}>Go back</button>
        </div>

    )
}
export default Result;