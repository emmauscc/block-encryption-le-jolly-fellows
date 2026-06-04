# Blockchain encryption

## Pre-encryption setup

1. Import readline from node.
2. Import common functions using ES modules.
3. Define the encryption key and initialization vector.
    - The initialization vector is a random binary with the length of 8.

## Encryption process

1. Split text into the individual characters.
2. Convert the first character it's ASCII form.
3. Then convert the ASCII to binary form.
4. Use a XOR gate on each bit in the binary with the predefined initialization vector.
5. Execute the caesar cipher encryption process with the key defined from before.
6. Repeat steps 2-5 but with the initialization vector as the last encrypted character.

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

## function caesarCipher(text, key)

Assignee: `ID`

- [X] Completed?

1. Define `cipherText` as empty
    - `let cipherText;`
2. Add `text` as integer with `key`, convert back to binary and then set `cipherText` to it
    - `cipherText = (parseInt(text, 2) + key).toString(2);`
3. While loop to add `0` to front of cipherText until it's equal to 8
    - `while (cipherText.length < 8) {`
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
6. Send current character to `caesarCipher` with global `encryptionKey` and 8, add to array
    - `encryptedText.splice(i, 1, caesarCipher(encryptedText[i], encryptionKey, 8));`
7. Once loop is complete return `encryptedText`
    - `encryptedText;`
