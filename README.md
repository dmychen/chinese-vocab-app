# Devx Full Stack Project!  

## Running this App

### Initialize the MySQL database

1) Create a new database in MySQL Workbench or whatever service you are using.
2) Initialize the database: 
- Edit `init_db.py`, at the bottom of the script you can specify the root, user, password, and database name for the database you made.
- Run `python3 init_db.py`.
3) Import data into the database:
- Edit `import_data.py`, at the top of the script you can specify the root, user, etc...
- Run `python3 import_data.py`. This may take a few seconds

> I created a few options for `import_data.py`, since the import is rather large. You can specify the following:  
> `-v` to show verbose output, listing every vocab entry that is added.
> `--count NUM` to specify the number of entries to import (cap the vocab imported to a certain number).
> `-f FILE` to specify a file to import data from. The data must be formatted according to the cc-cedict model.

### 

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

CC-CEDICT Database: [CC-CEDICT](https://www.mdbg.net/chinese/dictionary?page=cc-cedict)
Extra Chinese vocabulary from here: [pleco-chinese-dictionary](https://github.com/jimmy-zhening-luo/pleco-mega-big-chinese-dictionary/blob/master/README.md)

Parsing CC-CEDICT: [Python-Script](https://github.com/rubber-duck-dragon/rubber-duck-dragon.github.io/blob/master/cc-cedict_parser/parser.py)

**Characters**
- `id` *(INT, AUTO_INCREMENT, PRIMARY KEY)*: Unique identifier for each character.
- `character_simplified` *(VARCHAR(10))*: The simplified version of the character.
- `character_traditional` *(VARCHAR(10))*: The traditional version of the character.
- `radical_simplified` *(VARCHAR(10))*: The simplified version of the radical.
- `radical_traditional` *(VARCHAR(10))*: The traditional version of the radical.
- `stroke_count_simplified` *(INT)*: The number of strokes in the character.
- `stroke_count_traditional` *(INT)*: The number of strokes in the character.
- `difficulty` *(INT, NULL)*: Difficulty rating of the character (e.g., 1-5).
- `meaning` *(TEXT, NULL)*: The meaning of the character.
- `created_at` *(TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)*: Timestamp when the character record was created.
- `updated_at` *(TIMESTAMP, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)*: Timestamp when the character record was last updated.

**Radicals**
- `id` *(INT, AUTO_INCREMENT, PRIMARY KEY)*: Unique identifier for each radical.
- `simplified_radical` *(VARCHAR(10), NULL)*: Simplified version of the radical.
- `traditional_radical` *(VARCHAR(10), NULL)*: Traditional version of the radical.
- `meaning` *(TEXT, NULL)*: The meaning of the radical.
- `stroke_count_simplified` *(INT)*: The number of strokes in the radical.
- `stroke_count_traditional` *(INT)*: The number of strokes in the radical.
- `created_at` *(TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)*: Timestamp when the radical record was created.
- `updated_at` *(TIMESTAMP, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)*: Timestamp when the radical record was last updated.

**Vocabulary**
- `id` *(INT, AUTO_INCREMENT, PRIMARY KEY)*: Unique identifier for each vocabulary word.
- `chinese_simplified` *(TEXT)*: Simplified version of the word.
- `chinese_traditional` *(TEXT, NULL)*: Traditional version of the word.
- `pinyin` *(VARCHAR(100), NULL)*: Pinyin pronunciation of the word.
- `english` *(TEXT, NULL)*: The meaning of the word.
- `frequency` *(INT, NULL)*: Frequency of the word’s occurrence.
- `difficulty` *(INT, NULL)*: Difficulty rating of the character (e.g., 1-5).
- `created_at` *(TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)*: Timestamp when the vocabulary record was created.
- `updated_at` *(TIMESTAMP, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)*: Timestamp when the vocabulary record was last updated.

**Sets**
- `id` *(INT, AUTO_INCREMENT, PRIMARY KEY)*: Unique identifier for each vocabulary set.
- `name` *(VARCHAR(255), NOT NULL)*: Name of the vocabulary set.
- `description` *(TEXT, NULL)*: Description of the vocabulary set.
- `created_at` *(TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)*: Timestamp when the set was created.
- `updated_at` *(TIMESTAMP, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)*: Timestamp when the set was last updated.

**Vocabulary_Characters**
- `id` *(INT, AUTO_INCREMENT, PRIMARY KEY)*: Unique identifier for each character-vocabulary relationship.
- `vocabulary_id` *(INT, NOT NULL)*: Foreign key linking to the vocabulary table.
- `character_id` *(INT, NOT NULL)*: Foreign key linking to the characters table.
- `created_at` *(TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)*: Timestamp when the vocabulary-character record was created.

**Set_Vocabulary**
- `id` *(INT, AUTO_INCREMENT, PRIMARY KEY)*: Unique identifier for each set-vocabulary relationship.
- `set_id` *(INT, NOT NULL)*: Foreign key linking to the sets table.
- `vocabulary_id` *(INT, NOT NULL)*: Foreign key linking to the vocabulary table.
- `created_at` *(TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)*: Timestamp when the set-vocabulary record was created.

**Reviews**
- `id` *(INT, AUTO_INCREMENT, PRIMARY KEY)*: Unique identifier for each review record.
- `vocabulary_id` *(INT, NOT NULL)*: Foreign key linking to the vocabulary table.
- `user_id` *(INT, NOT NULL)*: Foreign key linking to the users table.
- `last_reviewed` *(TIMESTAMP, NULL)*: Timestamp of the last review.
- `review_interval` *(INT, DEFAULT 1)*: Number of days until the next review (spaced repetition).
- `review_score` *(INT, NULL)*: Score indicating how well the word was recalled (e.g., 1-5).
- `view_count` *(INT, DEFAULT 0)*: Number of times the word has been reviewed.
- `next_review_date` *(TIMESTAMP, NULL)*: Calculated date for the next review.
- `created_at` *(TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)*: Timestamp when the review record was created.
- `updated_at` *(TIMESTAMP, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)*: Timestamp when the review record was last updated.

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







        


