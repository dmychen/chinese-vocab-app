# Devx Full Stack Project!  

What is the game plan...  

## The Idea

Goal: A flashcard app specifically for chinese vocabulary.

### **Core Functionality**  
1. Add vocabulary (chinese, pinyin, and english definition) to a global db of flashcards
    - Insert, edit, delete flashcards.
2. Flashcards can be organized into flashcard sets. 
    - Insert flashcard into a set.
    - Delete from a set.
4. Display flashcards
    - display a list of vocab, or from a given set
3. Access a given flashcard set.
    - Sort which vocab is displayed randomly, or by spaced repetition.

### **Extra Feature Set**
1. Create a database of chinese vocabulary.
    - User can search for vocabulary.
    - Flashcards will automatically be populated based on database.
    - Users can edit existing flashcard or create from scratch.
2. Better flashcard algorithm:
    - Spaced repetition.
    - Priority based on manual user assignment (user can assign a priority to a flashcard)
    - Priority based on global standards (use character frequency rankings, how common the word is)
3. Displaying Flashcards by relation instead of set
    - based on relations from chinese vocab database:
        - Overlapping characters
        - Similar meaning
        - Same radicals
4. Import practice sentences and passages.
    - Import passages from external sources. 
    - Automatically determines the words used in the passage.
    - Flashcards automatically link to passages which contain that word.
    - Read passaged based on words in flashcard set
5. Generate practice sentences with ChatGPT integration
    - Based on a flashcard set or other filtering.
    - Or on global flashcard database

## The Implementation

### **Frontend** (React)

1. Use React Router for navigation
2. Use Axios to communicate with the backend.
3. UseContext/UseState/UseReduce for state management

#### Pages

TBD

### **Backend** (Express)

Establish endpoints that allow frontend to communicate with and manipulate the sql db.

#### Endpoints

**Vocabulary Management**

POST /api/v1/vocabulary: Add new vocabulary.
GET /api/v1/vocabulary: Get all vocabulary.
PUT /api/v1/vocabulary/:id: Update vocabulary.
DELETE /api/v1/vocabulary/:id: Delete vocabulary.

**Flashcard Set Management**

POST /api/sets: Create a new set.
GET /api/sets: Get all sets.
GET /api/sets/:id: Get vocabulary from a specific set.
PUT /api/sets/:id: Update a set.
DELETE /api/sets/:id: Delete a set.

**Quiz Functionality**
GET /api/quiz/random?setId=<set_id>: Get random words from a set.
GET /api/quiz/spaced-repetition?setId=<set_id>: Fetch words using an algorithm.


### **Database** (SQL)

Source Chinese vocabulary from here: [pleco-chinese-dictionary](https://github.com/jimmy-zhening-luo/pleco-mega-big-chinese-dictionary/blob/master/README.md)

**Vocabulary Table**

1. id (PRIMARY)  
2. chinese (NOT NULL)  
3. pinyin  
4. english  
5. radicals  
6. frequency  
7. stroke count  
8. difficulty (HSK)  
9. created_at TIMESTAMP
10. updated_at TIMESTAMP

**FlashcardSets Table**

1. id (PRIMARY)  
2. name (NOT NULL)  
3. description  
4. created_at TIMESTAMP  

Vocabulary Table (many-to-many relationship)

1. set_id REFERENCES flashcard_sets
2. vocabulary_id REFERENCES vocabulary
3. last_reviewed TIMESTAMP  
4. review_interval INT  
* PRIMARY KEY (set_id, vocabulary_id)







        


