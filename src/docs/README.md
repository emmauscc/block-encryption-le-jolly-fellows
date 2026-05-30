# Overall block encryption process

## Pre-encryption setup

1. Set the message variable (string)
    - Or read from command line
2. Set encryption key
3. Create a random IV (8 bit binary) at runtime
4. Define other variables to be used in process

## Encryption process

1. Convert the whole message it's ASCII (hex) representation
2. Then convert the ASCII output to it's equivalent binary (8 bit) form
3. Use a XOR gate with pre-defined IV and the binary message's 1st character
4. Follow cipher encryption process (e.g. caesar) with the pre-defined key on the output of step 3
5. Repeat steps 3 and 4 on next character with step 4 output as new the IV until all characters have been encrypted

---

# Function explanations

## function randomBinary(length)

Assignee: `JM`

- [X] Completed?

1. Define `binaryCode` as empty string
    - `let binaryCode = "";`
2. Loop over code `length` amount of times
    - `for (let i = 0; i < length; i++){`
3. Inside loop add random 1 or 0 to `binaryCode`
    - `binaryCode += Math.floor(Math.random() * 2);`
    - `}`
4. Exit loop and return `binaryCode`
    - `return binaryCode;`

## function textToASCII(character)

Assignee: `ID`

- [X] Completed?

1. Convert using charCodeAt and return
    - `return character.charCodeAt(0);`

## function ASCIIToBinary(character)

Assignee: `ID`

- [X] Completed?

1. Convert using toString, add `0` to front and return
    - `return "0" + character.toString(2);`

## function XORgate(character, IV)

Assignee: `JM`

- [X] Completed?

1. Define `binaryString` as empty string
    - `let binaryString = "";`
2. Loop over every character provided
    - `for (let j = 0; j < character.length; j++) {`
3. Inside of loop add XOR operator output to end of `binaryString`
    - `binaryString += character[j] ^ IV[j];`
    - `}`
4. Once loop is finished return `binaryString`
    - `return binaryString`

## function caesarCipher(text, key, length)

Assignee: `ID`

- [X] Completed?

1. Define `cipherText` as empty
    - `let cipherText;`
2. Add `text` as integer with `key`, convert back to binary and then set `cipherText` to it
    - `cipherText = (parseInt(text, 2) + key).toString(2);`
3. While loop to add `0` to front of cipherText until it's equal to `length`
    - `while (cipherText.length < length) {`
    - `cipherText = "0" + cipherText;`
    - `}`
4. return cipherText;
    - `return binaryString`

## function encryptText(text, IV)

Assignee: `JM`

- [X] Completed?

1. Split `text` into array of individual characters and set `encryptedText` to it
    - `let encryptedText = text.split("");`
2. Loop over every character of `encryptedText`
    - `for (let i = 0; i < encryptedText.length; i++) {`
3. Send character to `textToASCII` and `ASCIIToBinary` then add it to it's place in the array
    - `encryptedText.splice(i, 1, ASCIIToBinary(textToASCII(encryptedText[i])));`
4. If using the first character use provided `IV` with `XORgate` function and add to array
    - `if (i == 0) {`
    - `encryptedText.splice(i, 1, XORgate(encryptedText[i], IV));`
    - `}`
5. If not then use the last character as the IV and then add it to it's place in the array
    - `else {`
    - `encryptedText.splice(i, 1, XORgate(encryptedText[i], encryptedText[i - 1]));`
    - `}`
6. Send current character to `caesarCipher` with global `encryptionKey` and `bitLength`, add to array
    - `encryptedText.splice(i, 1, caesarCipher(encryptedText[i], encryptionKey, bitLength));`
7. Once loop is complete return `encryptedText`
    - `encryptedText;`
