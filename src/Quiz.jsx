import React, { useState, useEffect } from "react";
import { resultInitalState } from "./constants";
import logo from './assets/logo.png';

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitalState);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(10);
  const [timerColor, setTimerColor] = useState("black");
  const [showPopup, setShowPopup] = useState(true); // Initially show the popup
  const [showSidebar, setShowSidebar] = useState(false);

  const { question, choices, correctAnswer } = questions[currentQuestion];

  useEffect(() => {
    if (timer === 0) {
      handleTimeout();
    } else if (timer <= 5) {
      setTimerColor("red");
    } else {
      setTimerColor("black");
    }

    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const handleTimeout = () => {
    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
    setTimer(10);
  };

  const onAnswerClick = (answer, index) => {
    setAnswerIdx(index);
    setAnswer(answer === correctAnswer);
  };

  const onClickNext = () => {
    setAnswerIdx(null);
    setResult((prev) =>
      answer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
    setTimer(10);
  };

  const onSkip = () => {
    setAnswerIdx(null);
    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
    setTimer(10);
  };

  const onBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setTimer(10);
    }
  };

  const onTryAgain = () => {
    setResult(resultInitalState);
    setShowResult(false);
    setCurrentQuestion(0);
    setTimer(10);
  };

  const togglePopup = () => {
    setShowPopup(false);
  };

  const openChat = () => {
    setShowSidebar(true);
    setShowPopup(false); // Ensure popup is closed when chat opens
  };

  const closeChat = () => {
    setShowSidebar(false);
  };

  return (
    <div className="quiz-container">
      <nav className="navbar">
        <div className="navbar-content">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <h1 className="navbar-title">Quiz App</h1>
          <span className="navbar-score">Points: {result.score}</span>
        </div>
      </nav>
      {!showResult ? (
        <div className="quiz-content">
          <div className="question-section">
            <button onClick={onBack} disabled={currentQuestion === 0}>
              Back
            </button>
            <span className="active-question-no">
              {currentQuestion + 1}/{questions.length}
            </span>
            <div
              style={{
                fontSize: "1.5rem",
                color: timerColor,
              }}
            >
              ⏱ {timer}s
            </div>
            <button onClick={onSkip}>Skip</button>
          </div>
          <h2>{question}</h2>
          <ul>
            {choices.map((choice, index) => (
              <li
                onClick={() => onAnswerClick(choice, index)}
                key={choice}
                className={answerIdx === index ? "selected-answer" : null}
              >
                {choice}
              </li>
            ))}
          </ul>
          <div className="footer">
            <button onClick={onClickNext} disabled={answerIdx === null}>
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      ) : (
        <div className="result">
          <h3>Result</h3>
          <p>
            Total Questions: <span>{questions.length}</span>
          </p>
          <p>
            Total Score: <span>{result.score}</span>
          </p>
          <p>
            Correct Answers: <span>{result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers: <span>{result.wrongAnswers}</span>
          </p>
          <button onClick={onTryAgain}>Try Again</button>
        </div>
      )}

      {showPopup && (
        <div className="chat-popup show">
          <div className="message">AI is here to help you</div>
          <button className="exit-button" onClick={togglePopup}>x</button>
        </div>
      )}

      <button className="chat-button" onClick={openChat}>💬</button>

      <div className={`chat-sidebar ${showSidebar ? 'show' : ''}`}>
        <div className="chat-header">
          <button className="back-button" onClick={closeChat}>&larr;</button>
          Chat
        </div>
        <div className="chat-content">
          <p>How can I help you?</p>
          {/* Add more chat functionalities here */}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            placeholder="Type your message..."
            onFocus={togglePopup} // Close the popup when the input box is focused
          />
          <button>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
