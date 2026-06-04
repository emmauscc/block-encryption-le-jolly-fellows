import readline from "readline";
import { XORgate, caesarCipher } from "./common.js";

let knownInformation = [];

let rl = readline.createInterface(process.stdin, process.stdout);

rl.question("What text do you want to decrypt? ", (textToDecrypt) => {
  knownInformation.push(textToDecrypt);

  rl.question("What is the bit length? ", (bitLength) => {
    knownInformation.push(bitLength);

    rl.question("What is the encryption key? ", (encryptionKey) => {
      knownInformation.push(encryptionKey);

      rl.question(
        "Finally, what is the initialization vector? ",
        (initializationVector) => {
          knownInformation.push(initializationVector);
          console.log("Decrypting with known provided information:");
          console.log(knownInformation);

          console.log("\n");

          console.log("The decrypted text in plain text:");
          console.log(
            String(
              decryptText(
                knownInformation[0],
                knownInformation[1],
                knownInformation[2],
                knownInformation[3],
              ),
            ).replace(/,/g, ""),
          );
          rl.close();
        },
      );
    });
  });
});

function binaryToASCII(character) {
  return parseInt(character, 2);
}

function ASCIIToText(character) {
  return String.fromCharCode(character);
}

function decryptText(text, length, key, IV) {
  let regex = new RegExp(`.{1,${length}}`, "g");
  let encryptedText = text.match(regex);

  for (let i = encryptedText.length - 1; i > -1; i--) {
    encryptedText.splice(i, 1, caesarCipher(encryptedText[i], -key, length));

    if (i == 0) {
      encryptedText.splice(i, 1, XORgate(encryptedText[i], IV));
    } else {
      encryptedText.splice(i, 1, XORgate(encryptedText[i], encryptedText[i - 1]));
    }
  }
  for (let i = 0; i < encryptedText.length; i++) {
    encryptedText.splice(i, 1, ASCIIToText(binaryToASCII(encryptedText[i])));
  }
  return encryptedText;
}
