import readline from "readline";

let bitLength = 8;
let encryptionKey = 5;
let initializationVector = randomBinary(bitLength);

let rl = readline.createInterface(process.stdin, process.stdout);

rl.question("What text do you want to encrypt? ", (plainText) => {
  console.log("Using text: " + plainText);

  console.log("\n");

  console.log("The encrypted text in binary:");
  encryptText(plainText, initializationVector);

  rl.close();
});

// Helper functions
function randomBinary(length) {
  let binaryCode = "";

  for (let i = 0; i < length; i++) {
    binaryCode += Math.floor(Math.random() * 2);
  }

  return binaryCode;
}

// Encryption functions
function textToASCII(character) {
  return character.charCodeAt(0);
}

function ASCIIToBinary(character) {
  return "0" + character.toString(2);
}

function XORgate(character, IV) {
  let binaryString = "";

  for (let j = 0; j < character.length; j++) {
    binaryString += character[j] ^ IV[j];
  }

  return binaryString;
}

function caesarCipher(text, key, length) {
  let cipherText;

  cipherText = (parseInt(text, 2) + key).toString(2);
  while (cipherText.length < length) {
    cipherText = "0" + cipherText;
  }
  return cipherText;
}

// TODO: Solve issue with binary ticking over to 9 bits
// TODO: Research if code is consistent over multiple hand tests
function encryptText(text, IV) {
  let encryptedText = text.split("");

  for (let i = 0; i < encryptedText.length; i++) {
    encryptedText.splice(i, 1, ASCIIToBinary(textToASCII(encryptedText[i])));

    console.log("Text in binary:");
    console.log(encryptedText);

    if (i == 0) {
      encryptedText.splice(i, 1, XORgate(encryptedText[i], IV));
      console.log("Using IV: " + IV);
    } else {
      encryptedText.splice(i, 1, XORgate(encryptedText[i], encryptedText[i - 1]));
      console.log("Using IV: " + encryptedText[i - 1]);
    }
    console.log("Text after XOR gate:");
    console.log(encryptedText);

    encryptedText.splice(i, 1, caesarCipher(encryptedText[i], encryptionKey, bitLength));

    console.log("Text after cipher:");
    console.log(encryptedText);
    console.log("\n");
  }
  return encryptedText;
}
