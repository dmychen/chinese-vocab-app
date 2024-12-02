import mysql.connector, argparse, parser

DEFAULT_DATABASE = 'cc-cedict_src.txt' # Default import

# Define our database connection
db_connection = mysql.connector.connect(
    host='127.0.0.1',
    user="root", 
    password="dmdmmlad",
    database="vocab_app",
    port=3306
)

# ALLOW ARGUMENTS
arg_parser = argparse.ArgumentParser(description="A script with options.")
arg_parser.add_argument("-f", "--file", type=str, help="Path to the input file")
arg_parser.add_argument("-v", "--verbose", action="store_true", help="Enable verbose output")
arg_parser.add_argument("--count", type=int, default=-1, help="Number of iterations (default: all)")
args = arg_parser.parse_args()


# Create a cursor object to interact with the database
cursor = db_connection.cursor()

print("-----")
if args.file:
    print(f"Using data from: {args.file}")
    data = parser.parse_dictionary(args.file) # Parse specified data file into a list
else:
    print(f"Using data from: {DEFAULT_DATABASE}")
    data = parser.parse_dictionary(DEFAULT_DATABASE) # Parse default data file into a list

# Printing the chosen options
if args.verbose:
    print(f"Verbose mode ON!!! Get ready for a lot of chinese :D")
if args.count:
    print(f"Limiting import count to {args.count}")
print("-----\n")

# insert data into the vocab table
def insert_vocab(data):
    # Prepare the SQL query for insertion
    vocabQuery = """
    INSERT INTO vocabulary (chinese_traditional, chinese_simplified, pinyin, english)
    VALUES (%s, %s, %s, %s)
    """
    
    # Extract values from the dictionary
    traditional = data["chinese_traditional"]
    simplified = data["chinese_simplified"]
    pinyin = data["pinyin"] # Remove the square brackets from pinyin
    english = data["english"]

    # Optional verbose output
    if args.verbose:
        print(f"-> trad: {traditional}, simp: {simplified}, pinyin: {pinyin}, english: {english}")

    # Execute insertion
    try:
        cursor.execute(vocabQuery, (traditional, simplified, pinyin, english))
    except mysql.connector.errors.IntegrityError as e:
        if e.errno == 1062:  # Duplicate entry error code
            print("ERROR: Duplicate entry (already exists in sql): ", e)
        else:
            print("Integrity error: ", e)
    
    # Commit the transaction
    db_connection.commit()

# Iterate over each entry and insert it into the database
print("\n--Adding Entries--")


count = 0
for entry in data:
    insert_vocab(entry)
    count += 1
    if args.count and count > args.count: break # If count option is provided, limit the number of entries

# Close the cursor and connection after the operation
cursor.close()
db_connection.close()

print("Data import completed successfully!")
print(f"Total import size: {len(data)}")
