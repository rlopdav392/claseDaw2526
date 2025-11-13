import "./styles.css";
import { useState } from "react";

export default function App() {
  return (
    <div className="App">
      <FlashCards />
    </div>
  );
}

const questions = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript",
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components",
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX",
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props",
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook",
  },
  {
    id: 2002,
    question:
      "What do we call an input element that is completely synchronised with state?",
    answer: "Controlled element",
  },
];

function FlashCards() {
  const [selectedID, setSelectedID] = useState(null);

  function handleClick(id) {
    setSelectedID(id !== selectedID ? id : null);
  }
  return (
    <div className="flashcards">
      {questions.map((elto) => (
        <Question
          elto={elto}
          selectedID={selectedID}
          onHandleClick={handleClick}
          key={elto.id}
        />
      ))}
    </div>
  );
}

function Question({ elto, selectedID, onHandleClick }) {
  return (
    <div
      onClick={() => onHandleClick(elto.id)}
      className={elto.id === selectedID ? "selected" : ""}
    >
      <p>{elto.id === selectedID ? elto.answer : elto.question}</p>
    </div>
  );
}
