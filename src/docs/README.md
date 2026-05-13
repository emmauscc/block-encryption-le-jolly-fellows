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

NOTE: Use existing asciiMessage from outside this function

NOTE: Don't use joining space when `i == 0`

1. Loop over every character in the message
    - `for (let i = 0; i < text.length; i++){}`
2. Inside the loop convert every character to binary
    - `asciiMessage.concat(" ", charCodeAt(i));`

## function ASCIIToBinary(text)

NOTE: Use existing binaryMessage from outside this function

1. Convert the message to binary and export it
    - `binaryMessage = text.toString(2);`
