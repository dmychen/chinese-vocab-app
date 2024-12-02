import mysql.connector
from mysql.connector import Error

def initialize_database(host, user, password, database, port):
    """
    Initialize a database, creating necessary tables.
    
    Args:
        host (str): mysql host.
        user (str): mysql user.
        password (str): mysql password.
        database (str): The database name to connect to.
        port (str): what port to use

    Returns:
        list: A list of errors encountered during table creation.
    """
    table_definitions = [
        """
        CREATE TABLE IF NOT EXISTS `users` (
            `id` int NOT NULL AUTO_INCREMENT,
            `email` varchar(255) NOT NULL,
            `username` varchar(255) NOT NULL,
            `password_hash` varchar(255) NOT NULL,
            `name` varchar(255) DEFAULT NULL,
            PRIMARY KEY (`id`),
            UNIQUE KEY `email` (`email`),
            UNIQUE KEY `username` (`username`)
        """,
        """
        CREATE TABLE IF NOT EXISTS `characters` (
            `id` int NOT NULL AUTO_INCREMENT,
            `chinese_simplified` varchar(1) DEFAULT NULL,
            `chinese_traditional` varchar(1) NOT NULL,
            `radical_simplified` int DEFAULT NULL,
            `radical_traditional` int DEFAULT NULL,
            `stroke_count_simplified` int DEFAULT NULL,
            `stroke_count_traditional` int DEFAULT NULL,
            `english` text NOT NULL,
            `difficulty` int DEFAULT '1',
            `pinyin` varchar(255) NOT NULL,
            PRIMARY KEY (`id`),
            UNIQUE KEY `unique_characters` (`chinese_simplified`,`chinese_traditional`),
            KEY `characters_ibfk_1` (`radical_simplified`),
            KEY `characters_ibfk_2` (`radical_traditional`),
            CONSTRAINT `characters_ibfk_1` FOREIGN KEY (`radical_simplified`) REFERENCES `radicals` (`id`) ON DELETE SET NULL,
            CONSTRAINT `characters_ibfk_2` FOREIGN KEY (`radical_traditional`) REFERENCES `radicals` (`id`) ON DELETE SET NULL
        );
        """,
        """
        CREATE TABLE IF NOT EXISTS `radicals` (
            `id` int NOT NULL AUTO_INCREMENT,
            `radical_simplified` varchar(5) DEFAULT NULL,
            `radical_traditional` varchar(5) NOT NULL,
            `definition` varchar(100) DEFAULT NULL,
            `stroke_count_simplified` int DEFAULT NULL,
            `stroke_count_traditional` int NOT NULL,
            `difficulty` int DEFAULT '1',
            PRIMARY KEY (`id`)
        );
        """,
        """
        CREATE TABLE IF NOT EXISTS vocabulary (
            id int NOT NULL AUTO_INCREMENT,
            chinese_simplified varchar(50) NOT NULL,
            chinese_traditional varchar(50) DEFAULT NULL,
            pinyin varchar(150) DEFAULT NULL,
            english text NOT NULL,
            frequency int DEFAULT NULL,
            difficulty int DEFAULT '0',
            created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            UNIQUE KEY unique_vocabulary (chinese_traditional,chinese_simplified,pinyin,english(255))
        );
        """,
        """
        CREATE TABLE IF NOT EXISTS sets (
            id int NOT NULL AUTO_INCREMENT,
            name varchar(50) NOT NULL,
            description text,
            created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
            user_id int NOT NULL,
            PRIMARY KEY (id),
            KEY fk_user (user_id),
            CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        );
        """,
        """
        CREATE TABLE IF NOT EXISTS vocabulary_sets (
            id int NOT NULL AUTO_INCREMENT,
            vocabulary_id int NOT NULL,
            set_id int NOT NULL,
            added_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            UNIQUE KEY vocabulary_id (vocabulary_id,set_id),
            KEY set_id (set_id),
            CONSTRAINT vocabulary_sets_ibfk_1 FOREIGN KEY (vocabulary_id) REFERENCES vocabulary (id) ON DELETE CASCADE,
            CONSTRAINT vocabulary_sets_ibfk_2 FOREIGN KEY (set_id) REFERENCES sets (id) ON DELETE CASCADE
        );
        """,
        """
        CREATE TABLE IF NOT EXISTS vocabulary_users (
            id int NOT NULL AUTO_INCREMENT,
            vocabulary_id int NOT NULL,
            user_id int NOT NULL,
            last_reviewed timestamp NULL DEFAULT NULL,
            review_interval int DEFAULT '`1,
            review_score int DEFAULT NULL,
            view_count int DEFAULT 0,
            priority int DEFAULT 0,
            created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY vocabulary_id (vocabulary_id),
            KEY user_id (user_id),
            CONSTRAINT vocabulary_users_ibfk_1 FOREIGN KEY (vocabulary_id) REFERENCES vocabulary (id) ON DELETE CASCADE,
            CONSTRAINT vocabulary_users_ibfk_2 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        );
        """,
        """
        CREATE TABLE IF NOT EXISTS `vocabulary_characters` (
            `vocabulary_id` int NOT NULL,
            `character_id` int NOT NULL,
            `sequence` int DEFAULT NULL,
            PRIMARY KEY (`vocabulary_id`,`character_id`),
            KEY `character_id` (`character_id`),
            CONSTRAINT `vocabulary_characters_ibfk_1` FOREIGN KEY (`vocabulary_id`) REFERENCES `vocabulary` (`id`) ON DELETE CASCADE,
            CONSTRAINT `vocabulary_characters_ibfk_2` FOREIGN KEY (`character_id`) REFERENCES `characters` (`id`) ON DELETE CASCADE
        );
        """
    ]
    
    errors = []
    try:
        # Connect to the database
        connection = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database,
            port=port
        )
        cursor = connection.cursor()

        # Iterate over the table definitions and create each one
        for table_sql in table_definitions:
            try:
                cursor.execute(table_sql)
                print(f"Table created successfully: {table_sql.split()[2]}")
            except Error as e:
                print(f"Error creating table: {e}")
                errors.append(str(e))

        connection.commit()
        cursor.close()
        connection.close()
    except Error as e:
        errors.append(str(e))
        print(f"Connection error: {e}")
    
    return errors

# Default use
if __name__ == "__main__":
    host='127.0.0.1',
    user="root", 
    password="dmdmmlad",
    database="vocab_app",
    port=3306
    
    errors = initialize_database(host, user, password, database)
    if errors:
        print("Errors occurred:")
        for error in errors:
            print(error)
    else:
        print("All tables created successfully.")
