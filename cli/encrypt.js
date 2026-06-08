import readline from "readline";
import { XORgate, textToASCII, ASCIIToBinary, binaryToASCII, ASCIIToText, caesarCipher, vigenereCipher } from "./common.js";

let initializationVector = randomBinary(8);

if (process.argv.length == 5) {
  if (process.argv[4].toLowerCase() == "c" || process.argv[4].toLowerCase() == "caesar") {
    encryptionProcess(process.argv[2], process.argv[3], initializationVector, "caesar");
  } else if (process.argv[4].toLowerCase() == "v" || process.argv[4].toLowerCase() == "vigenere") {
    encryptionProcess(process.argv[2], process.argv[3], initializationVector, "vigenere");
  } else {
    throw new Error("Unknown cipher method: " + process.argv[4]);
  }
} else {
  let rl = readline.createInterface(process.stdin, process.stdout);
  rl.question("What text do you want to encrypt? ", (textToEncrypt) => {
    rl.question("What is your encryption key? ", (encryptionKey) => {
      rl.question("What cipher do you want to use? (C)aesar/(V)igenere ", (cipherMethod) => {
          console.log("\n");
          if (cipherMethod.toLowerCase() == "c" || cipherMethod.toLowerCase() == "caesar") {
            encryptionProcess(textToEncrypt, encryptionKey, initializationVector, "caesar");
          } else if (cipherMethod.toLowerCase() == "v" || cipherMethod.toLowerCase() == "vigenere") {
            encryptionProcess(textToEncrypt, encryptionKey, initializationVector, "vigenere",);
          } else {
            throw new Error("Unknown cipher method: " + cipherMethod);
          }
          rl.close();
        },
      );
    });
  });
}

function randomBinary(length) {
  let binaryCode = "01";

  for (let i = 0; i < length - 2; i++) {
    binaryCode += Math.floor(Math.random() * 2);
  }

  return binaryCode;
}

// TODO: Research if code is consistent over multiple hand tests
function encryptText(text, key, IV, cipher) {
  let encryptedText = text.split("");

  for (let i = 0; i < encryptedText.length; i++) {
    encryptedText.splice(i, 1, ASCIIToBinary(textToASCII(encryptedText[i])));

    if (i == 0) {
      encryptedText.splice(i, 1, XORgate(encryptedText[i], IV));
    } else {
      encryptedText.splice(i, 1, XORgate(encryptedText[i], encryptedText[i - 1]));
    }

    if (cipher == "caesar") {
      encryptedText.splice(i, 1, caesarCipher(encryptedText[i], key, 8));
    }
  }

  if (cipher == "vigenere") {
   for (let i = 0; i < encryptedText.length; i++) { 
    encryptedText.splice(i, 1, ASCIIToText(binaryToASCII(encryptedText[i]))); 
   }
   encryptedText = vigenereCipher(encryptedText.join(""), key, 1).split("");
   for (let i = 0; i < encryptedText.length; i++) {
    encryptedText.splice(i, 1, ASCIIToBinary(textToASCII(encryptedText[i])));
   }
  }
  return encryptedText;
}

function encryptionProcess(text, key, IV, cipher) {
  console.log("\n" + "Using cipher: " + cipher);
  console.log("Using text: " + text);
  console.log("Using key: " + key);
  console.log("Using IV: " + IV);

  if (cipher == "caesar") {
    if (key > 64 || key <= 0) {
      throw new Error("Encryption key too high or negative! Please keep it lower than or equal to 64");
    }
    console.log("\n");
    console.log("The encrypted text in binary:");
    console.log(String(encryptText(text, parseInt(key), IV, cipher)).replace(/,/g, ""));
  } else if (cipher == "vigenere") {
    console.log("\n");
    console.log("The encrypted text in binary:");
    console.log(String(encryptText(text, key, IV, cipher)).replace(/,/g, ""));
  }
  console.log("\n");
}
