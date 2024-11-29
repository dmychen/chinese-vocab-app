import React, { useState } from 'react';
import { useNavigate, useLoaderData, Form } from 'react-router-dom';
import { getSets, insertSet } from '../../api/api'
import './FlashcardSets.css';

// On page load, get set data
export async function loader() {
    const sets = await getSets();
    return { sets };
}

// On creation of new set,
export async function action() {
    try {
        const newSet = {
        name: "New Set",
        description: "This is a test set",
        user_id: 1, // Replace with the correct user ID
        };
        const result = await insertSet(newSet);
        console.log("Set created successfully:", result);
    } catch (error) {
        console.error("Failed to create set:", error);
    }
    return true;
}

// Set Component: Display name and other information about a Set
const Set = ({ name, onClick }) => {
    return (
        <div className="set" onClick={onClick}>
            {name}
        </div>
    );
};

/* 
FlashcardSets: displays a list of the user's sets

Filter the displayed sets based on set.name
On click of a Set, navigate to /practice/:set-id
*/
const FlashcardSets = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState(''); // filters which sets we display
    const { sets } = useLoaderData(); // pull set data from backend

    if (!sets || sets.length === 0) {
        return <p>No sets found!</p>;
    }

    // On a click, navigate to /practice/:set-id
    const handleSetClick = (set) => {
        navigate(`/practice/${set.id}`);
    };

    // Filter displayed sets by search term
    const filteredSets = sets.filter(set =>
        set.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return (
        <div className="flashcard-sets-container">
            {/* Header */}
            <header className="tab-header">
                <p>My Sets</p>
                <Form method="post">
                    <button className="button" type="submit">New Set</button>
                </Form>
            </header>
            
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
                            name={set.name} 
                            onClick={() => handleSetClick(set)} 
                        />
                    ))
                ) : (
                    <p className="no-sets">No sets found.</p>
                )}
            </div>
        </div>
    );
};

export default FlashcardSets;
