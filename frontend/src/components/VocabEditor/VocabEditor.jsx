import { useState } from "react";
import { insertVocabulary } from "../../api/api";
import "./VocabEditor.css"

/**
 * Vocab Editor
 * 
 * Allows a user to edit a vocab object and updates the vocabulary entry in the database (TODO: rn just inserts a new vocab entry lol)
 * 
 * @param {Object} vocab - vocab object to edit
 * @param {function} onSubmit - callback function to determine parent behavior after submission
 */
const VocabEditor = ({ vocab, onSubmit }) => {
  const [activeTab, setActiveTab] = useState("definition"); // Track the active tab
  const [editedVocab, setEditedVocab] = useState({
    chinese_simplified: vocab.chinese_simplified || "",
    chinese_traditional: vocab.chinese_traditional || "",
    pinyin: vocab.pinyin || "",
    english: vocab.english || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedVocab({ ...editedVocab, [name]: value });
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // insert new vocabulary and call parent submit behavior
  const handleSubmit = () => {
    const handleInsertVocab = async (vocab) => {
        try {
          await insertVocabulary(vocab); // insert edited vocab
          console.log("Vocab inserted successfully:", vocab);
        } catch (error) {
          console.error("Failed to insert vocab:", error);
        }
    }
    handleInsertVocab(editedVocab)
    onSubmit() // call parent's submit function
  };

  return (
    <div className="vocab-editor">
      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "definition" ? "active" : ""}
          onClick={() => handleTabClick("definition")}
        >
          Definition
        </button>
        <button
          className={activeTab === "addToSet" ? "active" : ""}
          onClick={() => handleTabClick("addToSet")}
        >
          Add to a Set
        </button>
      </div>

      {/* Content based on active tab */}
      <div className="tab-content">
        {activeTab === "definition" && (
          <div className="definition-tab">
            <div className="row">
              <div className="field">
                <label>Chinese Simplified</label>
                <input
                  type="text"
                  name="chinese_simplified"
                  value={editedVocab.chinese_simplified}
                  onChange={handleInputChange}
                />
              </div>
              <div className="field">
                <label>Chinese Traditional</label>
                <input
                  type="text"
                  name="chinese_traditional"
                  value={editedVocab.chinese_traditional}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="field">
              <label>Pinyin</label>
              <input
                type="text"
                name="pinyin"
                value={editedVocab.pinyin}
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label>English</label>
              <input
                type="text"
                name="english"
                value={editedVocab.english}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}

        {activeTab === "addToSet" && (
          <div className="add-to-set-tab">
            <p>Tab "Add to a Set" is under construction!</p>
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

export default VocabEditor;
