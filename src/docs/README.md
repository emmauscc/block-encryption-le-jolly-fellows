# Overall block encryption process

## Pre-encryption setup

1. Set the message variable (string)
    - Or read from command line
2. Set encryption/decryption key
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
    - `for (let i = 0; i < length; i++){}`
3. Inside loop add random 1 or 0 to `binaryCode`
    - `binaryCode += Math.floor(Math.random() * 2);`
4. Exit loop and return `binaryCode`
    - `return binaryCode;`

## function textToASCII(text)

Assignee: `ID`

- [X] Completed?

1. Define `asciiArray` as empty array
    - `let asciiArray = [];`
2. Loop over every character in the message
    - `for (let i = 0; i < text.length; i++){}`
3. Inside the loop convert every character to binary
    - `asciiArray[i] = text.charCodeAt(i);`
4. Exit loop and return new `asciiArray`
    - `return asciiArray;`

## function ASCIIToBinary(text)

Assignee: `ID`

- [X] Completed?

1. Define `binaryArray` as empty array
    - `let binaryArray = [];`
2. Loop over every character in the message
    - `for (let i = 0; i < text.length; i++) {}`
3. Add `0` to the front and convert to binary
    - `binaryArray[i] = "0" + text[i].toString(2);`
4. Exit loop and return new `binaryArray`
    - `return binaryArray;`

## function XORgate(text, IV)

Assignee: `JM`

- [X] Completed?

1. Define `XORArray` as empty array
    - `let XORArray = [];`
2. Loop over every character in the message
    - `for (let i = 0; i < text.length; i++) {}`
3. Define `binaryString` as empty string
    - `let binaryString = "";`
4. Loop over every binary character in the message
    - `for (let j = 0; j < text[i].length; j++) {}`
5. Use XOR operator with current binary character and matching IV value
    - `binaryString += text[i][j] ^ IV[j];`
6. Exit binary character loop, push new `binaryString` to `XORArray`
    - `XORArray.push(binaryString);`
7. Use last `binaryString` as the new `IV`
    - `IV = binaryString;`
8. Exit character loop and return new `XORArray`
    - `return XORArray;`

## function encryptText(text, IV)

Assignee: `JM`

- [X] Completed?

1. Send text to `textToASCII` function
    - `textToASCII(text);`
2. Then send it to the `ASCIIToBinary` function
    - `ASCIIToBinary(text);`
3. Finally send to the `XORgate` function
    - `XORgate(text, IV);`
4. Return result of the chained functions
    - `return XORgate(ASCIIToBinary(textToASCII(text)), IV);`
