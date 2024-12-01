import "./Vocab.css"

const Vocab = ({ vocab, handleAddVocab }) => {
    return (
        <div className="vocab-container">
            <div className="vocab-details">
                {/* Chinese Simplified and Traditional */}
                <div className="chinese">
                    <span className="chinese-simplified">{vocab.chinese_simplified}</span>
                    <span className="chinese-traditional">({vocab.chinese_traditional})</span>
                </div>
                
                {/* Pinyin and English */}
                <div className="pinyin-english">
                    <span className="pinyin">{vocab.pinyin}</span>
                    |
                    <span className="english">{vocab.english}</span>
                </div>
            </div>

            {/* Add Vocab Button */}
            <button className="add-vocab-button" onClick={ handleAddVocab } >Add Vocab</button>
        </div>
    );
};

export default Vocab;
