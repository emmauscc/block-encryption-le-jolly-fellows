import readline from "readline";
import { XORgate, caesarCipher } from "./common.js";

let initializationVector = randomBinary(8);

let rl = readline.createInterface(process.stdin, process.stdout);

rl.question("What text do you want to encrypt? ", (textToEncrypt) => {
  rl.question("What is your encryption key? ", (encryptionKey) => {
    console.log("Using text: " + textToEncrypt);
    console.log("Using IV: " + initializationVector);
    console.log("Using key: " + encryptionKey);

    console.log("\n");

    console.log("The encrypted text in binary:");
    console.log(
      String(encryptText(textToEncrypt, initializationVector, Number(encryptionKey))).replace(/,/g, ""),
    );

    rl.close();
  });
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
function encryptText(text, IV, key) {
  let encryptedText = text.split("");

  for (let i = 0; i < encryptedText.length; i++) {
    encryptedText.splice(i, 1, ASCIIToBinary(textToASCII(encryptedText[i])));

    if (i == 0) {
      encryptedText.splice(i, 1, XORgate(encryptedText[i], IV));
    } else {
      encryptedText.splice(i, 1, XORgate(encryptedText[i], encryptedText[i - 1]));
    }

    encryptedText.splice(i, 1, caesarCipher(encryptedText[i], key, 8));
  }
  return encryptedText;
}
