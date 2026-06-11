import readline from "node:readline";
import { XORgate, caesarCipher, vigenereCipher } from "./common.js";

if (process.argv.length == 6) {
  if (process.argv[5].toLowerCase() == "c" || process.argv[5].toLowerCase() == "caesar") {
    decryptionProcess(process.argv[2], process.argv[3], process.argv[4], "caesar");
  } else if (process.argv[5].toLowerCase() == "v" || process.argv[5].toLowerCase() == "vigenere") {
    console.log("\n");
    console.warn("Warning! Vigenere cipher only operates on letters!");
    console.warn("Warning! Vigenere cipher will convert lower case to upper case!");
    decryptionProcess(process.argv[2], process.argv[3], process.argv[4], "vigenere");
  } else {
    throw new Error("Unknown cipher method: " + process.argv[4]);
  }
} else {
  let rl = readline.createInterface(process.stdin, process.stdout);
  rl.question("What text do you want to decrypt? ", (textToDecrypt) => {
    rl.question("What is the encryption key? ", (encryptionKey) => {
      rl.question("What was the initialization vector used? ", (initializationVector) => {
        rl.question("Finally, what cipher? (C)aesar/(V)igenere ", (cipherMethod) => {
          console.log("\n");
          if (cipherMethod.toLowerCase() == "c" || cipherMethod.toLowerCase() == "caesar") {
            decryptionProcess(textToDecrypt, encryptionKey, initializationVector, "caesar");
          } else if (cipherMethod.toLowerCase() == "v" || cipherMethod.toLowerCase() == "vigenere") {
            console.log("\n");
            console.warn("Warning! Vigenere cipher only operates on letters!");
            console.warn("Warning! Vigenere cipher will convert lower case to upper case!");
            decryptionProcess(textToDecrypt, encryptionKey, initializationVector, "vigenere");
          } else {
            throw new Error("Unknown cipher method: " + cipherMethod);
          }
          rl.close();
        });
      });
    });
  });
}

function decryptText(text, key, IV, cipher) {
  text = text.match(/.{1,8}/g);

  for (let i = text.length - 1; i > -1; i--) {
    if (cipher == "caesar") {
      text.splice(i, 1, caesarCipher(text[i], -key, 8));
    }

    if (i == 0) {
      text.splice(i, 1, XORgate(text[i], IV));
    } else {
      text.splice(i, 1, XORgate(text[i], text[i - 1]));
    }
  }

  for (let i = 0; i < text.length; i++) {
    text.splice(i, 1, String.fromCharCode(parseInt(text[i], 2)));
  }
  if (cipher == "vigenere"){
    text = vigenereCipher(text.join(""), key, 0).split("");
  }
  return text;
}

function decryptionProcess(text, key, IV, cipher) {
  console.log("\n" + "Using cipher: " + cipher);
  console.log("Using text: " + text);
  console.log("Using key: " + key);
  console.log("Using IV: " + IV);

  if (cipher == "caesar") {
    console.log("\n");
    console.log("The decrypted text in plain text:");
    console.log(String(decryptText(text, parseInt(key), IV, cipher)).replace(/,/g, ""));
  } else if (cipher == "vigenere") {
    console.log("\n");
    console.log("The decrypted text in plain text:");
    console.log(String(decryptText(text, key, IV, cipher)).replace(/,/g, ""));
  }

  console.log("\n");
}
