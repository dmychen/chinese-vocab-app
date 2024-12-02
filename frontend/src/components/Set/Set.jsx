import './Set.css'

// Set Component: display name and other information about a Set
const Set = ({ set, onClick, onEdit, onDelete }) => {
    return (
        <div className="set" onClick={onClick}>
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