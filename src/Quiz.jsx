// import { useState } from "react";
// import { resultInitalState } from "./constants";

// const Quiz = ({ questions }) => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answerIdx, setAnswerIdx] = useState(null);
//   const [answer, setAnswer] = useState(null);
//   const [result, setResult] = useState(resultInitalState);
//   const [showResult, setShowResult] = useState(false);

//   const { question, choices, correctAnswer } = questions[currentQuestion];

//   const onAnwswerClick = (answer, index) => {
//     setAnswerIdx(index);
//     if (answer === correctAnswer) {
//       setAnswer(true);
//     } else {
//       setAnswer(false);
//     }
//   };

//   const onClickNext = () => {
//     setAnswerIdx(null);
//     setResult((prev) =>
//       answer
//         ? {
//             ...prev,
//             score: prev.score + 5,
//             correctAnswers: prev.correctAnswers + 1,
//           }
//         : {
//             ...prev,
//             wrongAnswers: prev.wrongAnswers + 1,
//           }
//     );

//     if (currentQuestion !== questions.length - 1) {
//       setCurrentQuestion((prev) => prev + 1);
//     } else {
//       setCurrentQuestion(0);
//       setShowResult(true);
//     }
//   };

//   const onTryAgain = () => {
//     setResult(resultInitalState);
//     setShowResult(false);
//   };

//   return (
//     <div className="quiz-container">
//       {!showResult ? (
//         <>
//           <span className="active-question-no">{currentQuestion + 1}</span>
//           <span className="total-question">/{questions.length}</span>
//           <h2>{question}</h2>
//           <ul>
//             {choices.map((choice, index) => (
//               <li
//                 onClick={() => onAnwswerClick(choice, index)}
//                 key={choice}
//                 className={answerIdx === index ? "selected-answer" : null}
//               >
//                 {choice}
//               </li>
//             ))}
//           </ul>
//           <div className="footer">
//             <button onClick={onClickNext} disabled={answerIdx === null}>
//               {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
//             </button>
//           </div>
//         </>
//       ) : (
//         <div className="result">
//           <h3>Result</h3>
//           <p>
//             Total Questions: <span>{questions.length}</span>
//           </p>
//           <p>
//             Total Score: <span>{result.score}</span>
//           </p>
//           <p>
//             Correct Answers: <span>{result.correctAnswers}</span>
//           </p>
//           <p>
//             Wrong Answers: <span>{result.wrongAnswers}</span>
//           </p>
//           <button onClick={onTryAgain}>Try again</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Quiz;

import { useState, useEffect } from "react";
import { resultInitalState } from "./constants";

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitalState);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(10); // Timer starts at 10 seconds
  const [timerColor, setTimerColor] = useState("black"); // Initial timer color

  const { question, choices, correctAnswer } = questions[currentQuestion];

  useEffect(() => {
    if (timer === 0) {
      handleTimeout(); // Handles timeout when timer reaches 0
    } else if (timer <= 5) {
      setTimerColor("red"); // Change timer color to red when 5 seconds remain
    } else {
      setTimerColor("black"); // Reset timer color
    }

    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown); // Cleanup on unmount or question change
  }, [timer]);

  const handleTimeout = () => {
    // setResult((prev) => ({
    //   ...prev,
    //   wrongAnswers: prev.wrongAnswers + 1,
    // }));

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
    setTimer(10); // Reset timer for the next question
  };

  const onAnswerClick = (answer, index) => {
    setAnswerIdx(index);
    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
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
    setTimer(10); // Reset timer for the next question
  };

  const onTryAgain = () => {
    setResult(resultInitalState);
    setShowResult(false);
    setCurrentQuestion(0);
    setTimer(10);
  };

  return (
    <div className="quiz-container">
      {!showResult ? (
        <>
        
          <span className="active-question-no b">{currentQuestion + 1}</span>
          <div className="a b">
          <span className="total-question ">/{questions.length}</span>
          <div className="b"
            style={{
              fontSize: "1.5rem",
              color: timerColor,
              display: "flex",
              alignItems: "end",
              justifyContent: "end",
              margin: "0 0",
            }}
          >
            ⏱ {timer}s
          </div>
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
        </>
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
          <button onClick={onTryAgain}>Try again</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
