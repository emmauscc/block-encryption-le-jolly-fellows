import readline from "readline";
import { XORgate, caesarCipher } from "./common.js";

let bitLength = 8;
let encryptionKey = 5;
let initializationVector = randomBinary(bitLength);

let rl = readline.createInterface(process.stdin, process.stdout);

rl.question("What text do you want to encrypt? ", (textToEncrypt) => {
  console.log("Using text: " + textToEncrypt);

  console.log("\n");

  console.log("The encrypted text in binary:");
  encryptText(textToEncrypt, initializationVector);

  rl.close();
});

function randomBinary(length) {
  let binaryCode = "";

  for (let i = 0; i < length; i++) {
    binaryCode += Math.floor(Math.random() * 2);
  }

  return binaryCode;
}

function textToASCII(character) {
  return character.charCodeAt(0);
}

function ASCIIToBinary(character) {
  return "0" + character.toString(2);
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
