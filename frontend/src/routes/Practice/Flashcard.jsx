import "./Flashcard.css";

const Flashcard = ({ vocab, flipped, setFlipped }) => {
  const handleFlip = () => setFlipped(!flipped);

  return (
    <div className="flashcard-container" onClick={handleFlip}>
      {!flipped ? (
        <div className="flashcard front">
          <div className="chinese">{vocab.chinese_simplified}</div>
          <div className="difficulty">{vocab.difficulty ? "Difficulty: " + vocab.difficulty : "..."}</div>
        </div>
      ) : (
        <div className="flashcard back">
          <div className="pinyin">{vocab.pinyin}</div>
          <div className="english">{vocab.english}</div>
        </div>
      )}
    </div>
  );
};

export default Flashcard;