import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Practice.css';

// TEMP: Flashcard Component
const Flashcard = ({ word, definition }) => {
    const [flipped, setFlipped] = useState(false);

    const handleFlip = () => setFlipped(!flipped);

    return (
        <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
            {flipped ? definition : word}
        </div>
    );
};  


const Practice = ({ set: propSet }) => {
    const location = useLocation();
    const set = propSet || location.state; // set data passed by prop or routing
    const [currentIndex, setCurrentIndex] = useState(0); // index of current vocab word
    
    // check set data
    if (!set) return <p>Uh oh! Could not find the requested Set.</p>;
    if (!set.vocab || set.vocab.length === 0) {
        return <p>This set has no vocabulary yet. Whoops!</p>; // TEMP: LATER STILL WANT TO DISPLAY COMPONENT
    } else {
        const currentWord = set.vocab[currentIndex];

        const handleClick = (direction) => {
            alert("Clicked! Direction = ", direction);
        }

        return (
            <div className="practice-page-container">
                {/* Header */}
                <div className="header">
                    <h1>{set.name}</h1>
                    <p className="description">{set.description}</p>
                </div>

                {/* Stats */}
                <div className="stats">
                    <span>{set.wordCount} words</span>
                    <span>Last practiced: {set.lastPracticed}</span>
                </div>

                {/* Flashcard Section */}
                <div className="main-content">
                    <Flashcard 
                        word={currentWord.word} 
                        definition={currentWord.definition} 
                    />
                    <div className="button-column">
                        <button onClick={() => alert('Add Vocab')}>Add Vocab</button>
                        <button onClick={() => handleClick('Right')}>
                            Next Word
                        </button>
                        {/* Add more buttons later */}
                    </div>
                </div>
            </div>
        );
    }
};

export default Practice;
