import { useEffect, useState } from "react";
import { useSubmit, useLoaderData, useActionData } from "react-router-dom";
import { insertSetVocabulary, searchVocab } from "../../api/api";
import { DEFAULT_SEARCH_INPUT_TYPE, DEFAULT_SEARCH_PAGE_SIZE, DEFAULT_SET_ID } from "../../globals";
import Vocab from "../Vocab/Vocab"
import "./VocabSearch.css"



// Gets an initial set of vocab entries to display on page load
export async function loader() {
    try {
      const response =  [] // change if we want a non-empty default
      return response; 
    } catch (error) {
      console.error("Error fetching vocab in loader:", error);
      return [];
    }
  }

// Gets vocab dynamically from a search query
// request.formData should contain a query, count, offset, and type
export async function action({ request }) {
    const formData = await request.formData();
    const query = formData.get("query") || "";
    const count = formData.get("count") || DEFAULT_SEARCH_PAGE_SIZE;
    const offset = formData.get("offset") || 0;
    const type = formData.get("type") || DEFAULT_SEARCH_INPUT_TYPE;
    
    if (!query) return []; // Return an empty array if the query is empty
    try {
        const response = await searchVocab(query, count, offset, type);
        if (response) return response;
        return [];
    } catch (error) {
        console.error("Error getting vocab from searchVocab():", error);
        return [];
    }
}
/**
 * Vocab Search
 * 
 * Displays a list of Vocab entries, depending on a search query.
 * 
 * Requests vocab to display by calling searchVocab(query, count, offset, type)
 *  query: the query string a user inputs
 *  count: the number of results to display at a time (DEFAULT_SEARCH_PAGE_SIZE)
 *  offset: determine the "page" of results to display, to allow for pagination of search results
 *  type: "chinese", "english", or "pinyin".
 * 
 * Usage: 
 * <Vocab Search />
 */
const VocabSearch = () => {
    const [searchQuery, setSearchQuery] = useState(""); // user search
    const [searchOffset, setSearchOffset] = useState(0); // offset for user search
    const [searchType, setSearchType] = useState(DEFAULT_SEARCH_INPUT_TYPE); // default search type
    const displayLimit = DEFAULT_SEARCH_PAGE_SIZE; // number of vocab entries to display at a time
    const submit = useSubmit(); // Dynamically trigger loader/action

    const initialVocabList = useLoaderData(); // Data from the loader on page load
    const updatedVocabList = useActionData(); // Data from the action after a search
    const vocabList = updatedVocabList || initialVocabList; // Use dynamic data if available

    // Force render update when offset or search type changes
    useEffect(() => {
        const formData = new FormData();
        formData.set("query", searchQuery);
        formData.set("count", displayLimit);
        formData.set("offset", searchOffset);
        formData.set("type", searchType);
        submit(formData, { method: "post" }); 
    }, [searchOffset, searchType]);

    // Handle changes to the search query
    const handleInputChange = (e) => {
        const newQuery = e.target.value;
        setSearchQuery(newQuery); 

        const formData = new FormData();
        formData.set("query", e.target.value);
        formData.set("count", displayLimit);
        formData.set("type", searchType);
        submit(formData, { method: "post" }); // call action() to update vocabList
    };

    // `AddVocab` button adds a vocab entry to the user's default set
    const  handleAddVocab = async (e, vocab) => {
        e.stopPropagation()
        try {
            // insert vocab into default set
            const response = await insertSetVocabulary(DEFAULT_SET_ID, vocab.id) 

            // force render update
            const formData = new FormData();
            formData.set("query", searchQuery);
            formData.set("count", displayLimit);
            formData.set("offset", searchOffset);
            formData.set("type", searchType);
            submit(formData, { method: "post" }); 
        } catch (error) {
            console.error("Error inserting new vocab:", error)
        }
    } 
    
    // `Back` and `Forward` button paginate which entries to display
    const handlePaginate = (e, direction) => {
        if (direction === "back") {
            // paginate backwards by `displayLimit` entries
            const newOffset = searchOffset - displayLimit;
            newOffset < 0 ? setSearchOffset(0) : setSearchOffset(newOffset);
            console.log("offset", searchOffset)
        } else if (direction === "forward") {
            // paginate forward by `displayLimit` entries
            const newOffset = searchOffset + displayLimit;
            setSearchOffset(newOffset);
            console.log("offset", searchOffset)
        } else {
            console.error("Unexpected paginate direction in VocabSearch (handlePaginate())")
        }
    }

    // `Input Type` button determines whether default search type is english or pinyin
    const handleSearchTypeChange = () => {
        if (searchType === "english") {
            setSearchType("pinyin");
        } else {
            setSearchType("english");
        }
    }

    // clear search
    const clearSearch = () => {
        setSearchQuery("");

        // Submit an empty query to reset results
        const formData = new FormData();
        formData.set("query", "");
        submit(formData, { method: "post" });
    };

    return (
        <div className="vocab-search">
            {/* Header */}
            <div className="search-header">
                <button className="paginate-back-btn" onClick={(e) => handlePaginate(e, "back")}>{"<"}</button>
                <button className="paginate-forward-btn" onClick={(e) => handlePaginate(e, "forward")}>{">"}</button>
                <input
                type="text"
                placeholder="Search vocabulary..."
                value={searchQuery}
                onChange={handleInputChange}
                className="search-bar"
                />
                <button className="clear-button" onClick={clearSearch}>Clear</button>
                <button className="input-type-button" onClick={handleSearchTypeChange}>{searchType === "english" ? "E" : "P"}</button>
            </div>

            {/* Vocabulary List */}
            <div className="vocab-list">
                {vocabList.length > 0 ? (
                    vocabList.map((vocab) => ( <Vocab key={vocab.id} vocab={vocab} handleAddVocab={handleAddVocab}/> ))
                    ) : (
                    <p className="no-vocab">No vocab found</p>
                )}
            </div>
        </div>
    );
};

export default VocabSearch;
