const Vocab = ({ vocab }) => {
    return (
      <div className="vocab-item">
        <p>
          <strong>{vocab.chinese_simplified}</strong> ({vocab.pinyin})
        </p>
        <p>{vocab.english}</p>
      </div>
    );
  };
  
  export default Vocab;