import { useState } from "react";
import "./Flashcard.css";

const Flashcard = ({ vocab }) => {
  const [flipped, setFlipped] = useState(false); // track whether flashcard is flipped
  const handleFlip = () => setFlipped(!flipped);

  return (
    <div className={`flashcard-container ${flipped ? 'flashcard-container-flipped' : ''}`}  onClick={handleFlip}>
      {!flipped ? (
        <div className="flashcard front">
          <div className="flashcard-chinese">{vocab.chinese_simplified}</div>
          <div className="difficulty">{vocab.difficulty ? "Difficulty: " + vocab.difficulty : ""}</div>
        </div>
      ) : (
        <div className="flashcard back">
          <div className="flashcard-english">{vocab.english}</div>
          <div className="pinyin">{vocab.pinyin}</div>
        </div>
      )}
    </div>
  );
};

export default Flashcard;