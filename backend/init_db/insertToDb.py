import mysql.connector

# Define your database connection
db_connection = mysql.connector.connect(
    host='127.0.0.1',
    user="root", 
    password="dmdmmlad",
    database="vocab_app",
    port=3306
)

# Create a cursor object to interact with the database
cursor = db_connection.cursor()

# Sample data (replace this with the list returned by your script)
cc_cedict_data = [
    {
        "traditional": "你",
        "simplified": "你",
        "pinyin": "nihao",
        "english": "hello"
    },
    {
        "traditional": "把",
        "simplified": "把",
        "pinyin": "ba3",
        "english": "idk man"
    }
]

# Function to insert data into the characters table
def insert_character(data):
    # Prepare the SQL query for insertion
    query = """
    INSERT INTO characters (character_traditional, character_simplified, pinyin, meaning)
    VALUES (%s, %s, %s, %s)
    """
    
    # Extract values from the dictionary
    traditional = data["traditional"]
    simplified = data["simplified"]
    pinyin = data["pinyin"] # Remove the square brackets from pinyin
    definition = data["english"]
    print(f"-> trad: {traditional}, simp: {simplified}, pinyin: {pinyin}, def: {definition}")
    # Execute the insertion
    cursor.execute(query, (traditional, simplified, pinyin, definition))
    
    # Commit the transaction
    db_connection.commit()

# Iterate over each entry and insert it into the database
print("--Adding Entries--")
for entry in cc_cedict_data:
    insert_character(entry)

# Close the cursor and connection after the operation
cursor.close()
db_connection.close()

print("Data import completed successfully!")
