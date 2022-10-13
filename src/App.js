import React from "react";
import Navbar from "./components/Navbar";
import Question from "./components/Question";

function App() {
  const [questionList, setQuestionList] = React.useState([]);
  const [submitted, setSubmitted] = React.useState(false);
  const [score, setScore] = React.useState(undefined);

  function fetchQuestions() {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple"
    )
      .then((res) => res.json())
      .then((data) =>
        setQuestionList(
          data.results.map((result) => {
            return {
              ...result,
              selected: undefined,
            };
          })
        )
      );
  }

  React.useEffect(function () {
    fetchQuestions();
  }, []);

  function selectOption(question, option) {
    if (submitted === false) {
      setQuestionList((prevQuestionList) => {
        return prevQuestionList.map((questionObject) => {
          return question === questionObject.question
            ? { ...questionObject, selected: option }
            : questionObject;
        });
      });
    }
  }

  function checkAnswers() {
    setSubmitted(true);
    let quizScore = 0;
    questionList.map((questionObject) => {
      questionObject.selected === questionObject.correct_answer
        ? (quizScore += 1)
        : (quizScore = quizScore);
    });
    setScore(quizScore);
  }

  const questionElements = questionList.map((questionObject) => (
    <Question
      question={questionObject.question}
      correctAnswer={questionObject.correct_answer}
      incorrectAnswers={questionObject.incorrect_answers}
      selected={questionObject.selected}
      selectOption={selectOption}
      submitted={submitted}
    />
  ));

  function playAgain() {
    setSubmitted(false);
    fetchQuestions();
    setScore(undefined);
  }

  return (
    <div className="all">
      <Navbar />
      <div className="main">
        <div className="main-container">
          {questionElements}
          {submitted && <p className="score">Your Score :{score}/5</p>}
          {!submitted ? (
            <button onClick={() => checkAnswers()} className="submit">
              Submit
            </button>
          ) : (
            <button onClick={() => playAgain()} className="submit">
              Play Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default App;
