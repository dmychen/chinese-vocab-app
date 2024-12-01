import { useState } from "react";
import "./VocabBody.css"

const VocabBody = ({ vocab }) => {
    const [activeTab, setActiveTab] = useState("definition");


    return (
        <div className="vocab-body">
          <div className="vocab-tabs">
            <button
              className={`tab-button ${activeTab === "definition" ? "active" : ""}`}
              onClick={() => setActiveTab("definition")}
            >
              Definition
            </button>
            <button
              className={`tab-button ${activeTab === "radicals" ? "active" : ""}`}
              onClick={() => setActiveTab("radicals")}
            >
              Radicals
            </button>
            <button
              className={`tab-button ${activeTab === "related" ? "active" : ""}`}
              onClick={() => setActiveTab("related")}
            >
              Related
            </button>
            <button
              className={`tab-button ${activeTab === "sentences" ? "active" : ""}`}
              onClick={() => setActiveTab("sentences")}
            >
              Sentences
            </button>
          </div>

          <div className="vocab-tab-content">
            {activeTab === "definition" && <p>{vocab.english}</p>}
            {activeTab === "radicals" && <p>Radicals content goes here...</p>}
            {activeTab === "words" && <p>Words content goes here...</p>}
            {activeTab === "sentences" && <p>Sentences content goes here...</p>}
          </div>
        </div>
      );
}

export default VocabBody;