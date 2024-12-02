import React, { useState } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { getSets } from '../../api/api'
import SetEditor from '../../components/SetEditor/SetEditor';
import Set from '../../components/Set/Set';
import './Sets.css';

// Get the data for current sets on page load
export async function loader() {
    const initialSets = await getSets();
    return { initialSets };
}

/**
 * Flashcard Sets
 *  
 * Displays a list of the user's sets
 * Filter the displayed sets based on set.name
 * On click of a Set, navigate to /practice/:set-id
 * 
 */
const FlashcardSets = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState(''); // filters which sets we display
    const [isEditing, setIsEditing] = useState(false); // display editor when editing 
    const { initialSets } = useLoaderData(); // pull set data from backend
    const [sets, setSets] = useState(initialSets)
    const [editingSet, setEditingSet] = useState({
        name: "",
        description: "",
        id: 1
    })

    // Don't display if no sets are found :P
    if (!sets || sets.length === 0) return <p>Oops! No sets found!</p>

    // When a set is clicked, navigate to the corresponding practice page: /practice/:set-id
    const handleSetClick = (set) => {
        navigate(`/practice/${set.id}`);
    };

    // Open an editor for the provided set
    const handleEditSet = (set) => {
        setEditingSet({
            name: set.name,
            description: set.description,
            id: set.id
        })
        setIsEditing(!isEditing);
    };

    const handleDeleteSet = (set) => {
        console.log("Deleting sets not implemented yet! Oops...");
        alert("Ahh sorry! Not implemented yet.");
    }

    // When a set is created, re-render set list, and close editor
    const handleSetSubmit = async () => {
        const newSets = await getSets();
        setSets(newSets);
        setIsEditing(!isEditing);
    }

    // Filter displayed sets by search term
    const filteredSets = sets.filter(set =>
        set.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return (
        <div className="flashcard-sets-container">
            {/* Header */}
            <header className="tab-header">
                <p>My Sets</p>
                <button 
                    className="button" 
                    onClick={() => handleEditSet({
                        name: "",
                        description: "",
                        id: 1
                    })}
                >{isEditing ? "Cancel" : "New Set"}</button>
            </header>
            
            {/* Set Editor (if isEditing) */}
            {isEditing && <SetEditor set={editingSet} onSubmit={handleSetSubmit}/>}


            {/* Set Display (if notEditing) */}
            {!isEditing &&
            <>
                {/* Search Bar */}
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for a set"
                    className="search-bar"
                />

                {/* Scrollable List */}
                <div className="set-list">
                    {filteredSets.length > 0 ? (
                        filteredSets.map(set => (
                            <Set 
                                key={set.id} 
                                set={set} 
                                onClick={() => handleSetClick(set)} 
                                onEdit={() => handleEditSet(set)}
                                onDelete={() => handleDeleteSet(set)}
                            />
                        ))
                    ) : (
                        <p className="no-sets">No sets found.</p>
                    )}
                </div>
            </>}
        </div>
    );
};

export default FlashcardSets;
