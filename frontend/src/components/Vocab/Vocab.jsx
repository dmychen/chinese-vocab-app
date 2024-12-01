import { useState, useEffect } from "react";
import { isSavedVocab } from "../../api/api";
import VocabBody from "../VocabBody/VocabBody";
import "./Vocab.css"
import VocabEditor from "../VocabEditor/VocabEditor";


const Vocab = ({ vocab, handleAddVocab }) => {
  const [isSaved, setIsSaved] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  
  // toggle expanded vocab component
  const toggleExpand = (e) => {
    e.stopPropagation()
    setIsExpanded(!isExpanded);
  }
  
  // toggle vocab editor
  const toggleEditing = (e) => {
    setIsExpanded(true) // open expanded vocab body
    setIsEditing(!isEditing);
  }

  // determine whether this vocab is saved to a set
  useEffect(() => {
    async function checkVocabStatus() {
      try {
        const savedStatus = await isSavedVocab(vocab); // check if saved
        setIsSaved(savedStatus);
      } catch (error) {
        console.error('Error checking vocab status:', error);
      }
    }
    checkVocabStatus();
  }, [vocab]);


  return (
    <div className={`vocab-container ${isExpanded ? "expanded" : ""}`} onClick={!isExpanded ? toggleExpand : null}>
      {isEditing ? 
        <VocabEditor vocab={ vocab } onSubmit={toggleEditing} /> :
        (<>
          <div className="vocab-header">
            <div className="vocab-hero">
                {/* Chinese Simplified and Traditional */}
                <div className="chinese">
                    <span className="chinese-simplified">{vocab.chinese_simplified}</span>
                    <span className="chinese-traditional">({vocab.chinese_traditional})</span>
                </div>
                
                {/* Pinyin and English */}
                <div className="pinyin-english">
                  <span className="pinyin">{vocab.pinyin}</span>
                  {isExpanded ? 
                    null
                  :
                    <> | <span className="english">{vocab.english}</span> </>
                  }
                </div>
            </div>

            {/* Conditionally render add/edit vocab*/}
            <div className="vocab-actions">
              {isSaved === null ? (
                <span>Loading...</span> // Show loading indicator while checking
              ) : isSaved ? (
                <button onClick={(e) => toggleEditing(e, vocab)} className="edit-button">
                  Edit
                </button>
              ) : (
                <button onClick={(e) => handleAddVocab(e, vocab)} className="add-button">
                  Add Vocab
                </button>
              )}
            </div>
          </div>

          {/* Expanded Content */}
          {isExpanded && (
            <div className="vocab-expanded">

              {/* Display vocab body OR vocab editor */}
              <VocabBody vocab={ vocab } toggleExpand={toggleExpand}/>

              {/* Close Expanded content */}
              <button className="close-button" onClick={toggleExpand}>
                ^
              </button>
            </div>
          )} 
        </>)
      }
    </div>
  );
};

export default Vocab;
