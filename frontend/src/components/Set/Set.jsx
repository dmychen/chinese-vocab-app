import { useState, useEffect } from 'react';
import { getSetVocabulary } from '../../api/api';
import './Set.css'

// Set Component: display name and other information about a Set
const Set = ({ set, onClick, onEdit, onDelete }) => {
    const [vocab, setVocab] = useState(null);

    // Fetch the vocabulary for this set when the component mounts or the set.id changes
    useEffect(() => {
        const fetchVocab = async () => {
            try {
                const vocabData = await getSetVocabulary(set.id); // Fetch vocab for the set
                setVocab(vocabData.vocabulary); // Update the state with the fetched vocab
            } catch (error) {
                console.log("No vocab for set ", set.id)
            }
        };
        fetchVocab(); // Call the async function
    }, [set.id]);

    return (
        <div className="set" onClick={onClick}>
            {/* Set Stats */}
            <p className="set-stats">{vocab ? `${vocab.length} words` : ""}</p>

            {/* Set Name and Description */}
            <div className="set-hero">
                <p className="set-name">{set.name}</p>
                <p className="set-description">{set.description}</p>
            </div>

            {/* Buttons */}
            <div className="set-actions">
                <button onClick={(e) => { e.stopPropagation(); onEdit(set); }} className="edit-button">
                    Edit
                </button>
                <button onClick={(e) => { e.stopPropagation(); onDelete(set); }} className="delete-button">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Set;