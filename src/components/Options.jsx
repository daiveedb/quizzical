import React from "react";

function Options(props) {
  function optionClassName() {
    if (!props.submitted) {
      return props.selected === props.text ? "selected-option" : "option";
    } else if (props.submitted) {
      if (props.text === props.correctAnswer) {
        return "correct-option";
      } else if (
        props.selected !== props.correctAnswer &&
        props.selected === props.text
      ) {
        return "wrong-option";
      } else {
        return "option";
      }
    }
  }

  return (
    <div
      className={optionClassName()}
      onClick={() => props.selectOption(props.question, props.text)}
    >
      <p className="option-text">{props.text}</p>
    </div>
  );
}
export default Options;
