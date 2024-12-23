#A parser for the CC-Cedict. Convert the Chinese-English dictionary into a list of python dictionaries with "traditional","simplified", "pinyin", and "english" keys.

#Make sure that the cedict_ts.u8 file is in the same folder as this file, and that the name matches the file name on line 13.

#Before starting, open the CEDICT text file and delete the copyright information at the top. Otherwise the program will try to parse it and you will get an error message.

#Characters that are commonly used as surnames have two entries in CC-CEDICT. This program will remove the surname entry if there is another entry for the character. If you want to include the surnames, simply delete lines 59 and 60.

list_of_dicts = []

def parse_line(line):
    parsed = {}
    if line == '':
        return 0
    line = line.rstrip('/')
    line = line.split('/')
    if len(line) <= 1:
        return 0
    english = line[1]
    char_and_pinyin = line[0].split('[')
    characters = char_and_pinyin[0]
    characters = characters.split()
    traditional = characters[0]
    simplified = characters[1]
    pinyin = char_and_pinyin[1]
    pinyin = pinyin.rstrip()
    pinyin = pinyin.rstrip("]")
    parsed['chinese_traditional'] = traditional
    parsed['chinese_simplified'] = simplified
    parsed['pinyin'] = pinyin
    parsed['english'] = english
    list_of_dicts.append(parsed)

def remove_surnames():
    for x in range(len(list_of_dicts)-1, -1, -1):
        if "surname " in list_of_dicts[x]['english']:
            if list_of_dicts[x]['chinese_traditional'] == list_of_dicts[x+1]['chinese_traditional']:
                list_of_dicts.pop(x)

def parse_dictionary(file_path):
    with open(file_path) as file:
        text = file.read()
        lines = text.split('\n')
        dict_lines = list(lines)
        
    # make each line into a dictionary
    print("Parsing dictionary . . .")
    for line in dict_lines:
        parse_line(line)


    # remove entries for surnames (optional)
    print("Removing Surnames . . .")
    remove_surnames()

    return list_of_dicts

if __name__ == "__main__":
    parsed_dict = parse_dictionary('cc-cedict_src.txt')
    print(parsed_dict)