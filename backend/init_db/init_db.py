import mysql.connector
import parser

# Define our database connection
db_connection = mysql.connector.connect(
    host='127.0.0.1',
    user="root", 
    password="dmdmmlad",
    database="vocab_app",
    port=3306
)

# Create a cursor object to interact with the database
cursor = db_connection.cursor()

# Parse cc_cedict data into a list
cc_cedict_data = parser.parse_dictionary('cc-cedict_src.txt')

# insert data into the vocab table
def insert_vocab(data):
    # Prepare the SQL query for insertion
    vocabQuery = """
    INSERT INTO vocabulary (chinese_traditional, chinese_simplified, pinyin, english)
    VALUES (%s, %s, %s, %s)
    """
    
    # Extract values from the dictionary
    traditional = data["traditional"]
    simplified = data["simplified"]
    pinyin = data["pinyin"] # Remove the square brackets from pinyin
    english = data["english"]
    print(f"-> trad: {traditional}, simp: {simplified}, pinyin: {pinyin}, english: {english}")
    # Execute the insertion
    cursor.execute(vocabQuery, (traditional, simplified, pinyin, english))
    
    # Commit the transaction
    db_connection.commit()

# Iterate over each entry and insert it into the database
print("--Adding Entries--")
for entry in cc_cedict_data:
    insert_vocab(entry)

# Close the cursor and connection after the operation
cursor.close()
db_connection.close()

print("Data import completed successfully!")
