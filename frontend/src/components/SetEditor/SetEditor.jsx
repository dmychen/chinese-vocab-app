import { useState } from "react";
import { insertSet } from "../../api/api";
import "./SetEditor.css"


const SetEditor = ({ set, onSubmit }) => {
const [activeTab, setActiveTab] = useState("description"); // Track the active tab
const [editedSet, setEditedSet] = useState({
    name: set.name || "",
    description: set.description || "",
    user_id: 1 // USERS FUNCTION NOT IMPLEMENTED YET
});

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedSet({ ...editedSet, [name]: value });
};

const handleTabClick = (tab) => {
    setActiveTab(tab);
};

// insert new set and call parent's callback function
const handleSubmit = async () => {
    const handleInsertSet = async (set) => {
        try {
        const result = await insertSet(set); // insert edited set
        console.log("Vocab inserted successfully:", result);
        } catch (error) {
        console.error("Failed to insert vocab:", error);
        }
    }
    await handleInsertSet(editedSet)
    onSubmit() // call parent's submit function
};

return (
    <div className="set-editor">
    {/* Tabs */}
    <div className="small-tabs">
        <button
        className={activeTab === "description" ? "active" : ""}
        onClick={() => handleTabClick("description")}
        >
        Description
        </button>
        <button
        className={activeTab === "addVocab" ? "active" : ""}
        onClick={() => handleTabClick("addVocab")}
        >
        Add Vocab
        </button>
    </div>

    {/* Content based on active tab */}
    <div className="tab-content">
        {activeTab === "description" && (
        <div className="description-tab">
            <div className="row">
            <div className="field">
                <label>Name</label>
                <input
                type="text"
                name="name"
                value={editedSet.name}
                onChange={handleInputChange}
                />
            </div>
            <div className="field">
                <label>Description</label>
                <input
                type="text"
                name="description"
                value={editedSet.description}
                onChange={handleInputChange}
                />
            </div>
            </div>
        </div>
        )}

        {activeTab === "addVocab" && (
        <div className="add-vocab-tab">
            <p>Tab "Add Vocab" is under construction!</p>
        </div>
        )}
    </div>

    {/* Submit Button */}
    <button className="submit-button" onClick={handleSubmit}>
        Submit
    </button>
    </div>
);
};

export default SetEditor;
