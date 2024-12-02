import React, { useState, useEffect } from 'react';
import { useLoaderData, Form, useNavigate } from 'react-router-dom';
import { getSetById, getSetVocabulary, insertVocabulary, insertSetVocabulary } from '../../api/api';
import Flashcard from "../../components/Flashcard/Flashcard"
import './Practice.css';

// retrieve current set data on page load (sets and vocabulary_sets data)
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

// idk yet
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

/**
 * Practice Page
 * 
 * Displays Flashcards for vocabulary associated with a particular set. 
 */
const Practice = () => {
    const { set, vocab } = useLoaderData(); // get set data
    const [currentVocab, setCurrentVocab] = useState(null); // Current vocab to show
    const [usedVocab, setUsedVocab] = useState([]); // track used vocab words
    const [remainingVocab, setRemainingVocab] = useState([...vocab]); // Vocab that hasn't been used yet
    const navigate = useNavigate();
    
    // Display a vocab word
    useEffect(() => {
        if (remainingVocab.length > 0) selectVocab();
    }, []);

    if (!set) return <p>Uh oh! Could not find the requested Set.</p>; // validate set exists

    // Select a vocab that hasn't been used yet (Randomly for now)
    const selectVocab = () => {
        if (remainingVocab.length > 0) {
        const randomIndex = Math.floor(Math.random() * remainingVocab.length);
        const vocab = remainingVocab[randomIndex];
        setCurrentVocab(vocab);
        setUsedVocab([...usedVocab, vocab]);

        // Remove this vocab from the remainingVocab list
        const newRemainingVocab = remainingVocab.filter((v, index) => index !== randomIndex);
        setRemainingVocab(newRemainingVocab);
        console.log("Remaining vocab: ", remainingVocab);
        console.log("Used vocab: ", usedVocab);
        }
    };
    
    // Go to the next vocab word 
    const handleNextVocab = () => {
        if (remainingVocab.length > 0) {
            // Select the next vocab word, or
            selectVocab();
        } else {
            // Reset the state to start over
            setUsedVocab([]);
            setRemainingVocab([...vocab]);
            // Create a dummy flashcard to display reset
            const resetCard = {
                chinese_simplified: "All done!",
                pinyin: "Press next to restart"
            }
            setCurrentVocab(resetCard)
        }
    };

    // Go to the previously shown vocab word BROKEN
    const handlePreviousVocab = () => { 
        if (usedVocab.length > 0) {
            // re-insert current vocab into remaining vocab
            const newRemainingVocab = [...remainingVocab, currentVocab];
            setRemainingVocab(newRemainingVocab);
            console.log("remaining", remainingVocab);

            // take previous vocab from usedVocab and set to currentVocab
            const newUsedVocab = [...usedVocab];
            const previousVocab = newUsedVocab.pop();
            setUsedVocab(newUsedVocab);
            setCurrentVocab(previousVocab);
            console.log("used", usedVocab);
            console.log("current", currentVocab);
        }
    }

    return (
        <div className="practice-page-container">
            {/* Header */}
            <div className="practice-header">
                <div className="header-left">
                    <button onClick={() => navigate(-1)}>{"<"}</button>
                    <h1>{set.name}</h1>
                </div>
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
                    {currentVocab ? < Flashcard vocab={currentVocab} /> : <p>No Vocab in this Set</p>}
                    <button className="button" onClick={handlePreviousVocab}>
                            Prev
                    </button>
                    <button className="button" onClick={handleNextVocab}>
                            Next
                    </button>
                </div>

                <div className="button-column">
                    <Form method="post">
                        <button className="button" type="submit">Add Vocab</button>
                    </Form>
                    
                </div>
            </div>
        </div>
    );       
};

export default Practice;
