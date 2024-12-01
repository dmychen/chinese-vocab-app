import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api/v1", // BASE URl
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});


export const getSets = async () => {
  try {
    const response = await api.get("/sets");
    return response.data;
  } catch (error) {
    console.error("Error fetching sets:", error.response?.data || error.message);
    throw error; // throw error for handling in components or loaders
  }
};

export const getSetById = async (id) => {
  try {
    const response = await api.get(`/sets/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching set by ID:", error.response?.data || error.message);
    throw error;
  }
};

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
    vocab:
         {
        "chinese_simplified": STRING,
        "chinese_traditional": STRING,
        "frequency": INT OR NULL,
        "difficulty": DOUBLE OR NULL,
        "pinyin": STRING,
        "english": STRING
        }
*/
export const insertSetVocabulary = async (setId, vocabId) => {
    try {
        console.log("Inserting vocab into set:", setId, vocabId);
        const response = await api.post(`sets/${setId}/vocabulary/${vocabId}`);
        return response.data;
    } catch (error) {
        console.error("Error inserting vocab:", error.message);
        throw error;
    }
}

// Function to fetch vocab from backend
export const searchVocab = async (query) => {
    let searchField = "english"
    if (isChinese(query)) {
      searchField = "chinese_simplified"
    }
    try {
      const response = await api.get(`/vocabulary/${searchField}/${query}`);
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
