# Devx Full Stack Project!  

This app combines a Chinese-English dictionary with a flashcard system built for practicing Chinese. It stores an extensive database of Chinese words, characters, and radicals, along with their English definitions and other information. The app allows users to search for vocabulary in Chinese, pinyin, or English. Users can "save" vocabulary, and can also add vocabulary to specific flashcard sets. The user can practice a flashcard set. The user can also change any vocab entry, or add new vocabulary to the database.

## Running the App

### Initialize Node

1) Run `npm init` in "/backend" and "/frontend"

2) Do you also need do `npm install`? Who knows.

### Initialize a MySQL database

1) Create a new database in MySQL Workbench or whatever service you are using.

2) Initialize the database for the app (navigate first to `/backend/init_db`):  

- Open `init_db.py`. At the bottom of the script you can specify the root, user, password, and database name for the database you just made.
- Run `python3 init_db.py`. (Make sure you have `mysql.connector` installed)

> The script should create the following tables: `vocabulary`, `characters`, `radicals`, `users`, `vocabulary_sets`, `vocabulary_characters`, `vocabulary_users`.

3) Import all the vocab data into the database:
- Open `import_data.py`, at the top of the script you can specify the root, user, etc...
- Run `python3 import_data.py`. (Make sure you have `argparse`, and `parser` installed)

> I created a few options for `import_data.py`, since the data import will usually be rather large. You can specify the following:  
> `-v` to show verbose output, which lists every vocab entry that is imported.
> `--count NUM` to specify the number of entries to import (cap the vocab imported to a certain number).
> `-f FILE` to specify a file to import data from. The data must be formatted according to the cc-cedict model. By default, it will import './cc-cedict.txt'

### Edit Some App Settings

1) Update the backend: (backend/src/) 
- Update the database info in `db.js`.
- Update the localhost and port number if neccessary in `index.js`.

2) Update the frontend: (frontend/src/)
- Update `/api/api.jsx` to have the right localhost 


### Start the App

Run `npm start` in both the backend and frontend subdirectories.

## The App Idea

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