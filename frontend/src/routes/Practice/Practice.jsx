import React, { useState, useEffect } from 'react';
import { useLoaderData, Form } from 'react-router-dom';
import { getSetById, getSetVocabulary, insertVocabulary, insertSetVocabulary } from '../../api/api';
import Flashcard from "./Flashcard"
import './Practice.css';

// on page load, retrieve set data
export async function loader({ params }) {
    try {
        const [setResult, vocabResult] = await Promise.allSettled([
            getSetById(params.setId),  // Fetch set by id
            getSetVocabulary(params.setId),  // Fetch vocab for set
        ]);
        
        // Check the results of both promises
        const set = setResult.status === "fulfilled" ? setResult.value : null;
        const vocab = vocabResult.status === "fulfilled" ? vocabResult.value.vocabulary : [];
        return { set, vocab };
    } catch (error) {
        console.error("Error loading data:", error);
        return { error: 'Failed to load data. Please try again later.' };
    }
}

export async function action({ params }) {
    try {
        const newVocab = {
            chinese_simplified: "快樂",
            chinese_traditional: "快樂",
            pinyin: "kuai4le4",
            english: "happy",
        }

        const vocabResult = await insertVocabulary(newVocab);
        const setResult = await insertSetVocabulary(params.setId, vocabResult.id)
    } catch (error) {
        console.error("Failed to insert vocab:", error);
    }
    return true;
}

const Practice = () => {
    const { set, vocab } = useLoaderData(); // get set data
    const [flipped, setFlipped] = useState(false); // Whether flashcard is flipped
    const [currentVocab, setCurrentVocab] = useState(null); // Current vocab to show
    const [usedVocab, setUsedVocab] = useState(new Set()); // Set to track used vocab
    const [remainingVocab, setRemainingVocab] = useState([...vocab]); // Vocab that hasn't been used yet
    
    // Display a vocab word
    useEffect(() => {
        console.log("Remaining", remainingVocab)
        if (remainingVocab.length > 0) selectVocab();
    }, []);

    if (!set) return <p>Uh oh! Could not find the requested Set.</p>; // validate set

    // Select a vocab that hasn't been used yet (Randomly right now)
    const selectVocab = () => {
        if (remainingVocab.length > 0) {
        const randomIndex = Math.floor(Math.random() * remainingVocab.length);
        const vocab = remainingVocab[randomIndex];
        setCurrentVocab(vocab);

        // Remove this vocab from the remainingVocab list
        const newRemainingVocab = remainingVocab.filter((v, index) => index !== randomIndex);
        setRemainingVocab(newRemainingVocab);

        // Add the current vocab to the usedVocab set
        setUsedVocab(prev => new Set(prev).add(vocab.id));
        }
    };
    
    // Handler for the "Next Word" button
    const handleNextVocab = () => {
        if (remainingVocab.length > 0) {
            selectVocab();
        } else {
            // Reset the state to start over
            setUsedVocab(new Set());
            setRemainingVocab([...vocab]);
            // Create a dummy flashcard to display reset
            const resetCard = {
                chinese_simplified: "All done!",
                pinyin: "Press next to restart"
            }
            setCurrentVocab(resetCard)
        }
    };

    return (
        <div className="practice-page-container">
            {/* Header */}
            <div className="header">
                <h1>{set.name}</h1>
                <p className="description">{set.description}</p>
            </div>

            {/* Stats */}
            <div className="stats">
                <span>{vocab.length} words</span>
                <span>Last practiced: NOT DONE</span>
            </div>

            {/* Flashcard Section */}
            <div className="main-content">
                
                <div className="flashcard-column">
                {currentVocab ? < Flashcard vocab={currentVocab} flipped={flipped} setFlipped={setFlipped} /> : <p>No Vocab in this Set</p>}
                </div>

                <div className="button-column">
                    <Form method="post">
                        <button className="button" type="submit">Add Vocab</button>
                    </Form>
                    <button className="button" onClick={handleNextVocab}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );       
};

export default Practice;
