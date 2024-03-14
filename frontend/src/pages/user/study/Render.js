import Card from "react-bootstrap/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import style from "./render.module.css";
import IconButton from "@mui/material/IconButton";
import Spinner from "../../../components/spinner/spinner";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Render = () => {
  const [words, setWords] = useState([]);
  const [result, setResult] = useState([]);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { lessonId, type } = location.state;
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [paragraphColor, setParagraphColor] = useState("#000");
  let speech = new SpeechSynthesisUtterance();
  speech.voice = window.speechSynthesis.getVoices()[1];
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  useEffect(() => {
    setIsLoading(true);
    axios.get("http://34.136.63.21/api/"+type)
      .then((response) => {
        const filteredWords = response.data.filter(
          (word) => word.lessonId === lessonId
        );
        setWords(filteredWords);
        setIsLoading(false);
      })
      .catch((e) => console.error(e));
  }, []);
  const [index, setIndex] = useState(0);
  const handleListen= () => {
    speech.text = words[index].content;
    window.speechSynthesis.speak(speech)
  }
  const handleSkip = () => {
    setIsButtonDisabled(true);
    setParagraphColor("red");
  };
  const handleNext = () => {
    const { highlightedWord } = getHighlightedText();
    setResult((prev) => [...prev, highlightedWord]);
    resetTranscript();
    setIsButtonDisabled(false);
    setParagraphColor("#000");
    if (index + 1 < words.length) {
      setIndex(index + 1);
    } else {
      navigate("/study/result", {
        state: {
          correct: count,
          noOfWords: words.length,
          results: [...result, highlightedWord],
          lessonId: lessonId,
          type: type
        },
      });
    }
  };
  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };
  const stopListening = async () => {
    await SpeechRecognition.stopListening();
    countCorrectAnswer();
  };

  const getHighlightedText = () => {
    let highlighted = "";
    const speech = transcript.toLowerCase();
    const word = words[index].content.toLowerCase();
    for (let i = 0; i < word.length; i++) {
      if (speech[i] !== word[i]) {
        highlighted += `<span style="color: red">${words[index].content[i]}</span>`;
      } else {
        highlighted += words[index].content[i];
      }
    }
    const filteredText = highlighted.replace(/<span[^>]*>.*?<\/span>/g, "");
    return {
      highlightedWord: highlighted,
      countWord: filteredText.length,
    };
  };
  const countCorrectAnswer = () => {
    const { countWord } = getHighlightedText();

    const percent = (countWord * 100) / words[index].content.length;
    if (percent >= 80) {
      setCount((prevState) => prevState + 1);
    }
  };
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const render = (
    <Card className={style.card}>
      <Card.Header>Lesson {lessonId}: </Card.Header>
      <Card.Body className={style.cardBody}>
        <div className={style.content}>
          {words[index] &&
            (transcript ? (
              <h1 style={{ color: "green" }}>
                {
                  <div
                    dangerouslySetInnerHTML={{
                      __html: getHighlightedText().highlightedWord,
                    }}
                  />
                }
              </h1>
            ) : (
              <h1 style={{ color: paragraphColor }}>{words[index].content}</h1>
            ))}
          <IconButton onClick={handleListen}>
            <VolumeUpIcon />
          </IconButton>
        </div>
        <IconButton
          onTouchStart={startListening}
          onMouseDown={startListening}
          onTouchEnd={stopListening}
          onMouseUp={stopListening}
          className={style.iconBtn}
          disabled={isButtonDisabled}
        >
          <KeyboardVoiceIcon fontSize="inherit" />
        </IconButton>
        <p>Hold to talk</p>
        <p>Microphone: {listening ? "on" : "off"}</p>
        <div className={style.actionBtn}>
          <Button
            className={style.btn}
            variant="contained"
            onClick={handleSkip}
          >
            Skip
          </Button>
          <Button
            className={style.btn}
            variant="contained"
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
  return <>{isLoading ? <Spinner /> : render}</>;
};
export default Render;
