import readline from "readline";
import { XORgate, caesarCipher } from "./common.js";

if (process.argv.length == 4) {
  encryptionProcess(process.argv[2], process.argv[3], randomBinary(8));
} else {
  let rl = readline.createInterface(process.stdin, process.stdout);
  rl.question("What text do you want to encrypt? ", (textToEncrypt) => {
    rl.question("What is your encryption key? ", (encryptionKey) => {
      encryptionProcess(textToEncrypt, encryptionKey, randomBinary(8));
      rl.close();
    });
  });
}

function randomBinary(length) {
  let binaryCode = "0";

  for (let i = 0; i < length - 1; i++) {
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

// TODO: Research if code is consistent over multiple hand tests
function encryptText(text, key, IV) {
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

function encryptionProcess(text, key, IV) {
  if (Number(key) >= 128) {
    throw new Error("Encryption key too high! Please keep it lower than 128");
  }

  console.log("\n");

  console.log("Using text: " + text);
  console.log("Using key: " + key);
  console.log("Using IV: " + IV);

  console.log("\n");

  console.log("The encrypted text in binary:");
  console.log(String(encryptText(text, Number(key), IV)).replace(/,/g, ""));
}
