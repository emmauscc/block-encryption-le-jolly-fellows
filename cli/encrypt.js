import readline from "node:readline";
import { XORgate, caesarCipher, vigenereCipher } from "./common.js";

let initializationVector = randomBinary(8);

if (process.argv.length == 5) {
  if (process.argv[4].toLowerCase() == "c" || process.argv[4].toLowerCase() == "caesar") {
    encryptionProcess(process.argv[2], process.argv[3], initializationVector, "caesar");
  } else if (process.argv[4].toLowerCase() == "v" || process.argv[4].toLowerCase() == "vigenere") {
    console.log("\n");
    console.warn("Warning! Vigenere cipher only operates on letters!");
    console.warn("Warning! Vigenere cipher will convert lower case to upper case!");
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
            console.warn("Warning! Vigenere cipher only operates on letters!");
            console.warn("Warning! Vigenere cipher will convert lower case to upper case!");
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

function textToASCII(character) {
  return character.charCodeAt(0);
}

function ASCIIToBinary(character) {
  character = character.toString(2);

  while (character.length < 8) {
    character = "0" + character; 
  }
  return character;
}

// TODO: Research if code is consistent over multiple hand tests
function encryptText(text, key, IV, cipher) {
  if (cipher == "caesar") {
    text = text.split("");
  } else if (cipher == "vigenere"){
    text = vigenereCipher(text.toUpperCase(), key, 1).split("");
  }

  for (let i = 0; i < text.length; i++) {
    text.splice(i, 1, ASCIIToBinary(textToASCII(text[i])));

    if (i == 0) {
      text.splice(i, 1, XORgate(text[i], IV));
    } else {
      text.splice(i, 1, XORgate(text[i], text[i - 1]));
    }

    if (cipher == "caesar") {
      text.splice(i, 1, caesarCipher(text[i], key));
    }
  }
  return text;
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
    console.log(encryptText(text, parseInt(key), IV, cipher).join(""));
  } else if (cipher == "vigenere") {
    console.log("\n");
    console.log("The encrypted text in binary:");
    console.log(encryptText(text, key, IV, cipher).join(""));
  }
  console.log("\n");
}