# Overall block encryption process

## Pre-encryption setup

1. Set the message variable (string)
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

## function textToASCII(text)

NOTE: Don't use joining space when `i == 0`

1. Define asciiMessage as empty
    - `let asciiMessage;`
2. Loop over every character in the message
    - `for (let i = 0; i < text.length; i++){}`
3. Inside the loop convert every character to binary
    - `asciiMessage = asciiMessage.concat(" ", text.charCodeAt(i));`
4. Exit loop and return new asciiMessage
    - `return(asciiMessage);`

## function ASCIIToBinary(text)

1. Define binaryMessage as empty
    - `let binaryMessage;`
2. Convert the message to binary and export it
    - `binaryMessage = text.toString(2);`
3. Return new binaryMessage
    - `return(binaryMessage);`
