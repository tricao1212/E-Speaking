import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Render = () => {
  const [words, setWords] = useState([]);
  const [result, setResult] = useState([]);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { lessonId } = location.state;
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  useEffect(() => {
    axios
      .get("http://34.136.63.21/api/sentences")
      .then((response) => {
        const filteredWords = response.data.filter(
          (word) => word.lessonId === lessonId
        );
        setWords(filteredWords);
      })
      .catch((e) => console.error(e));
  }, []);
  const [index, setIndex] = useState(0);
  const handlePrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };
  const handleNext = () => {
    const { highlightedWord } = getHighlightedText();
    setResult((prev) => [...prev, highlightedWord]);
    resetTranscript();
    if (index + 1 < words.length) {
      setIndex(index + 1);
    } else {
      navigate("/user/learn/sentence/result", {
        state: {
          lessonId: lessonId,
          correct: count,
          noOfWords: words.length,
          results: [...result, highlightedWord],
        },
      });
    }
  };
  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };
  const stopListening = () => {
    SpeechRecognition.stopListening();
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
  return (
    <div>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button
        onTouchStart={startListening}
        onMouseDown={startListening}
        onTouchEnd={stopListening}
        onMouseUp={stopListening}
      >
        Hold to talk
      </button>

      {words[index] &&
        (transcript ? (
          <p style={{ color: "green" }}>
            {
              <div
                dangerouslySetInnerHTML={{
                  __html: getHighlightedText().highlightedWord,
                }}
              />
            }
          </p>
        ) : (
          <p>{words[index].content}</p>
        ))}

      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};
export default Render;
