import React from "react";
import Option from "./Options.jsx";

function Question(props) {
  const [optionsArray, setOptionsArray] = React.useState([]);
  // let optionsArray = props.incorrectAnswers

  React.useEffect(
    function () {
      const shuffled = shuffle([
        ...props.incorrectAnswers,
        props.correctAnswer,
      ]);
      setOptionsArray(shuffled);
      // optionsArray.push(props.correctAnswer)
      // optionsArray = shuffle(optionsArray)
    },
    [props.question]
  );

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  const OptionElements = optionsArray.map((option) => (
    <Option
      text={option}
      selected={props.selected}
      selectOption={props.selectOption}
      question={props.question}
      submitted={props.submitted}
      correctAnswer={props.correctAnswer}
    />
  ));

  return (
    <div className="question-block">
      <p className="question">{props.question.replace(/&quot;/g, '"')}</p>
      <div className="options">{OptionElements}</div>
    </div>
  );
}
export default Question;
