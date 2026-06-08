import readline from "readline";
import { XORgate, caesarCipher } from "./common.js";

if (process.argv.length == 5) {
  decryptionProcess(process.argv[2], process.argv[3], process.argv[4]);
} else {
  let rl = readline.createInterface(process.stdin, process.stdout);
  rl.question("What text do you want to decrypt? ", (textToDecrypt) => {
    rl.question("What is the encryption key? ", (encryptionKey) => {
      rl.question("Finally, what is the initialization vector? ", (initializationVector) => {
          decryptionProcess(textToDecrypt, encryptionKey, initializationVector);
          rl.close();
        },
      );
    });
  });
}

function binaryToASCII(character) {
  return parseInt(character, 2);
}

function ASCIIToText(character) {
  return String.fromCharCode(character);
}

function decryptText(text, key, IV) {
  let encryptedText = text.match(/.{1,8}/g);

  for (let i = encryptedText.length - 1; i > -1; i--) {
    encryptedText.splice(i, 1, caesarCipher(encryptedText[i], -key, 8));

    if (i == 0) {
      encryptedText.splice(i, 1, XORgate(encryptedText[i], IV));
    } else {
      encryptedText.splice(
        i,
        1,
        XORgate(encryptedText[i], encryptedText[i - 1]),
      );
    }
  }
  for (let i = 0; i < encryptedText.length; i++) {
    encryptedText.splice(i, 1, ASCIIToText(binaryToASCII(encryptedText[i])));
  }
  return encryptedText;
}

function decryptionProcess(text, key, IV) {
  console.log("\n");
  
  console.log("Using text: " + text);
  console.log("Using key: " + key);
  console.log("Using IV: " + IV);

  console.log("\n");

  console.log("The decrypted text in plain text:");
  console.log(String(decryptText(text, Number(key), IV)).replace(/,/g, ""));
}
