import axios from "axios";
import { useEffect, useState } from "react"
import styles from "../styles/lessons.module.css"
import { useNavigate } from "react-router-dom";
const Lessons = () => {
    const [lessons, setLessons] = useState([]);
    const navigate = useNavigate();
    useEffect(()=> {
        axios.get("http://34.136.63.21/api/lessons")
        .then(response=> {
            setLessons(response.data);
        })
        .catch(e=>console.log(e));
    },[])
    const handleClick = (item) => {
        navigate("/lesson", {state: {lessonId: item}})
    }
    return (
        <div>
            <ul className={styles.lessons}>
                {lessons.map((item, index)=> (
                    <li key={index} onClick={()=>handleClick(item.id)}>{item.name}</li>
                ))}
            </ul>
        </div>
    ) 
}
export default Lessons