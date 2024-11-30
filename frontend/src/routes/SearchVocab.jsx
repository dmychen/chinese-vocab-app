import { useState } from "react";
import { useSubmit, useLoaderData, useActionData } from "react-router-dom";
import { searchVocab } from "../api/api";
import Vocab from "./Vocab"
import "./SearchVocab.css"

// get initial vocab on load
export async function loader() {
    try {
      const response =  [] // await fetchVocabList(); 
      return response; 
    } catch (error) {
      console.error("Error fetching vocab in loader:", error);
      return [];
    }
  }

// Get vocab dynamically from search query
export async function action({ request }) {
    const formData = await request.formData();
    const query = formData.get("query") || "";
  
    if (!query) return []; // Return an empty array if the query is empty
    try {
        const response = await searchVocab(query);
        if (response) return response;
        return [];
    } catch (error) {
        console.error("Error getting vocab from searchVocab():", error);
        return new Response("Failed to fetch vocab", { status: 500 });
    }
}

const SearchVocab = () => {
    const [searchQuery, setSearchQuery] = useState(""); // user search
    const initialVocabList = useLoaderData(); // Data from the loader on page load
    const updatedVocabList = useActionData(); // Data from the action after a search
    const vocabList = updatedVocabList || initialVocabList; // Use dynamic data if available
    const submit = useSubmit(); // Dynamically trigger loader/action
    // const [loading, setLoading] = useState(false); // Loading state

    // Handle input changes
    const handleInputChange = (e) => {
        const newQuery = e.target.value;
        setSearchQuery(newQuery); // Update the query state

        const formData = new FormData();
        formData.set("query", e.target.value);
        submit(formData, { method: "post" });
    };

    // Handle clear search
    const clearSearch = () => {
        setSearchQuery("");

        // Submit an empty query to reset results
        const formData = new FormData();
        formData.set("query", "");
        submit(formData, { method: "post" });
    };

    return (
        <div className="search-vocab">
            {/* Header */}
            <div className="search-header">
                <button className="left-button">Left Action</button>
                <input
                type="text"
                placeholder="Search vocabulary..."
                value={searchQuery}
                onChange={handleInputChange}
                className="search-bar"
                />
                <button className="right-button" onClick={clearSearch}>
                    Clear
                </button>
            </div>

            {/* Vocabulary List */}
            <div className="vocab-list">
                {vocabList.length > 0 ? (
                    vocabList.map((vocab) => ( <Vocab key={vocab.id} vocab={vocab} /> ))
                    ) : (
                    <p>No vocab found</p>
                )}
            </div>
        </div>
    );
};

export default SearchVocab;
