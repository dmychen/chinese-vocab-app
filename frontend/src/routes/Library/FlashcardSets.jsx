import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FlashcardSets.css';

// TEMP Store sets statically
const sets = [
    {
        id: 1,
        name: 'Set 1',
        description: 'This is set 1.',
        wordCount: 20,
        lastPracticed: '2024-11-25',
        vocab: [
            { id: 1, character: '你好', definition: 'Hello' },
            { id: 2, character: '世界', definition: 'World' },
        ],
    },
    {
        id: 2,
        name: 'Set 2',
        description: 'This is set 2.',
        wordCount: 15,
        lastPracticed: '2024-11-20',
        vocab: [
            { id: 1, character: '学习', definition: 'Learn' },
            { id: 2, character: '工作', definition: 'Work' },
        ],
    },
];

// TEMP, later create real set
const Set = ({ name, onClick }) => {
    return (
        <div className="set" onClick={onClick}>
            {name}
        </div>
    );
};

/* Component to display a list of the user's sets */
const FlashcardSets = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(''); // filter which sets we display

  

    // On click navigate to practice page
    const handleClick = (set) => {
        navigate(`/practice/${set.id}`, { state: set });
    };

    // Filter displayed sets based on search term
    const filteredSets = sets.filter(set =>
        set.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return (
        <div className="flashcard-sets-container">
            {/* Header */}
            <header className="tab-header">My Sets</header>
            
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
                            onClick={() => handleClick(set)} 
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
