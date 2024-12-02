import axios from "axios";
import { DEFAULT_SEARCH_INPUT_TYPE, DEFAULT_SEARCH_PAGE_SIZE } from "../components/globals";


const api = axios.create({
    baseURL: "http://localhost:5001/api/v1", // BASE URl
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});




// Get a list of all sets
export const getSets = async () => {
  try {
    const response = await api.get("/sets");
    return response.data;
  } catch (error) {
    console.error("Error fetching sets:", error.response?.data || error.message);
    throw error; // throw error for handling in components or loaders
  }
};

// Get a set by its setId
export const getSetById = async (id) => {
  try {
    const response = await api.get(`/sets/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching set by ID:", error.response?.data || error.message);
    throw error;
  }
};

// Get the vocabulary corresponding to a particular setId
export const getSetVocabulary = async (setId) => {
    try {
      const response = await api.get(`/sets/${setId}/vocabulary`);
      return response.data;
    } catch (error) {
      console.error("Error fetching sets:", error.response?.data || error.message);
      throw error; // throw error for handling in components or loaders
    }
};

/* 
Insert a new set

Params:
    set:
        {
        "name": STRING,
        "description": STRING,
        "user_id": INT
        }
*/
export const insertSet = async (set) => {
    try {
        console.log("Inserting set:", set);
        const response = await api.post(`/sets`, {
            name: set.name,
            description: set.description,
            user_id: set.user_id,
        });
        return response.data;
    } catch (error) {
        console.error("Error inserting set:", error.message);
        throw error;
    }
}

/* 
Insert a new vocabulary entry

Params:
    vocab:
        {
        "chinese_simplified": STRING,
        "chinese_traditional": STRING,
        "frequency": INT OR NULL,
        "difficulty": DOUBLE OR NULL,
        "pinyin": STRING,
        "english": STRING
        }
      
Returns:

*/
export const insertVocabulary = async (vocab) => {
    try {
        console.log("Inserting vocab:", vocab);
        const response = await api.post(`/vocabulary`, {
            chinese_simplified: vocab.chinese_simplified,
            chinese_traditional: vocab.chinese_traditional,
            frequency: vocab.frequency,
            difficulty: vocab.difficulty,
            pinyin: vocab.pinyin,
            english: vocab.english,
        });
        return response.data;
    } catch (error) {
        console.error("Error inserting vocab:", error.message);
        throw error;
    }
}

/* 
Params:
  {
    setId: Set to insert into
    vocabId: vocab to insert into set
  }
*/
export const insertSetVocabulary = async (setId, vocabId) => {
    try {
        const response = await api.post(`sets/${setId}/vocabulary/${vocabId}`);
        return response.data;
    } catch (error) {
        console.error("Error inserting vocab:", error.message);
        throw error;
    }
}

// Function to fetch vocab from backend
export const searchVocab = async (query, count = DEFAULT_SEARCH_PAGE_SIZE, offset = 0, searchField = DEFAULT_SEARCH_INPUT_TYPE) => {
    let field = searchField;
    if (isChinese(query)) {
      field = "chinese_simplified"
    }
    try {
        console.log("SEARCHING FOR:", query, field, count, offset)
      const response = await api.get(`/vocabulary/search/${field}/${query}/${count}/${offset}`);
      return response.data.vocabulary;
    } catch (error) {
      console.error("Error searching for vocab:", error);
      throw error;
    }
  };

// check if query is chinese
function isChinese(str) {
    const chineseRegex = /[\u4e00-\u9fff]/;
    return chineseRegex.test(str);
}

// Check if a vocab object is contained within the "vocabulary_sets" table
export const isSavedVocab = async (vocab) => {
  if (!vocab || !vocab.id) {
    throw new Error('Invalid vocab object');
  }

  try {
    const response = await api.get(`/sets/-1/vocabulary/${vocab.id}`);
    return true;
  } catch (error) {
    if (error.response?.status === 404) {
      // If it's a 404, return false
      return false;
    } else {
      // Throw an error for any other status codes
      throw new Error(
        `Unexpected error occurred: ${error.response?.status || error.message}`
      );
    }
  }
}
