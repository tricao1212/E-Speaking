import React from "react";
import Button from '@mui/material/Button';
import LearnCss from "./LearnCss.module.css";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
function Learn() {
  return (
    <div className={LearnCss.learn}>
      <Card className={LearnCss.option}>
        <Card.Header className={LearnCss.card_header}>
          Practice with word
        </Card.Header>
        <Card.Body className={LearnCss.word}>
          <p>Practice speaking with only one word.</p>
          <Link to="/user/learn/lessons" state={{type: "words"}}>
            <Button className={LearnCss.btn} variant="contained">
              Start
            </Button>
          </Link>
        </Card.Body>
      </Card>
      <Card className={LearnCss.option}>
        <Card.Header className={LearnCss.card_header}>
          Practice with sentence
        </Card.Header>
        <Card.Body className={LearnCss.sentence}>
          <p>Practice speaking with sentences.</p>
          <Link to="/user/learn/lessons" state={{type: "sentences"}}>
            <Button className={LearnCss.btn} variant="contained">
              Start
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Learn;
