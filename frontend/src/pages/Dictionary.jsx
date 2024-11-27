import React from "react";
import "./Dictionary.css";


/*
Dictionary page
*/
function Dictionary() {
  // Dummy word data for now
  const words = [
    { id: 1, chinese: "你好", pinyin: "nǐ hǎo", definition: "hello" },
    { id: 2, chinese: "谢谢", pinyin: "xièxie", definition: "thank you" },
    { id: 3, chinese: "再见", pinyin: "zàijiàn", definition: "goodbye" },
    { id: 4, chinese: "学习", pinyin: "xuéxí", definition: "to study" },
  ];

  return (
    <div className="page">
      <header className="title">Vocab Search</header>

      <div className="search-bar-container">
        <button className="search-btn">←</button>
        <input
          type="text"
          className="search-input"
          placeholder="Search for a word..."
        />
        <button className="search-btn">→</button>
      </div>

      <div className="word-list">
        {words.map((word) => (
          <VocabItem key={word.id} word={word} />
        ))}
      </div>
    </div>
  );
}

// display a single vocab
function VocabItem({ word }) {
  return (
    <div className="word-item">
      <div className="word-chinese">{word.chinese}</div>
      <div className="word-pinyin">{word.pinyin}</div>
      <div className="word-definition">{word.definition}</div>
    </div>
  );
}

export default Dictionary;
