def next_code(codestr):
    chars = "0123456789abcdefghijelmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    MAX_CHAR_POS = len(chars) - 1
    chardict = {}
    for i, char in enumerate(chars):
        chardict[char] = i

    if codestr == None or codestr == '':
        return chars[0]
    
    code = [char for char in codestr]
    newcode = []
    
    i = len(code) - 1
    char = code[i]
    pos = chardict[char]
    bump = False

    if pos >= MAX_CHAR_POS:
        newcode = [chars[0]] + newcode
        bump = True
    else:
        newcode = [chars[pos+1]] + newcode
        newcode = code[:i] + newcode
    
    while bump and (i > 0):
        i -= 1
        char = code[i]
        pos = chardict[char]
        if pos >= MAX_CHAR_POS:
            # Leave bump at True
            newcode = [chars[0]] + newcode
        else:
            newcode = [chars[pos+1]] + newcode
            newcode = code[:i] + newcode
            bump = False

    # If we made it all the way to the first character,
    # and we are still bumpin', prepend one last 0
    if bump:
        newcode = [chars[0]] + newcode
            
    
    return ''.join([char for char in newcode])

if __name__ == '__main__':
    codes = [None] # Tests
    for code in codes:
        print code, next_code(code)
