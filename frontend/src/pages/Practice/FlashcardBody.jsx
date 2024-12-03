const FlashcardBody = () => {
    return (<div className="main-content">
                    
        <div className="flashcard-column">
            {currentVocab ? < Flashcard vocab={currentVocab} /> : <p>No Vocab in this Set</p>}
            <div className="flashcard-buttons">
                <button className="button" onClick={handlePreviousVocab}>
                        {"< Prev"}
                </button>
                <button className="button" onClick={handleNextVocab}>
                        {"Next >"}
                </button>
            </div>
        </div>

        <div className="button-column">
            <button onClick={handleAddVocab}>Add Vocab</button>                    
            <button onClick={handleTogglePinyin}>Toggle Pinyin</button>    
            <button onClick={handleTogglePinyin}>Not Implemented</button>    
        </div>
    </div>);
}

export default FlashcardBody;