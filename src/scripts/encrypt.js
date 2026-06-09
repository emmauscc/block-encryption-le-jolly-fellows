/* eslint-disable */
let textToEncrypt = "";
let encryptionKey = "";
// document.getElementById("iv-input").style.display = "none";
console.log("test");
window.getInfo = function () {
  textToEncrypt = document.getElementById("text-input").value;
  encryptionKey = document.getElementById("iv-input").value;
  console.log(textToEncrypt);
  console.log(encryptionKey);
if(){
 encryptionProcess(textToEncrypt, encryptionKey, randomBinary(8), "caesar");
}else{
   encryptionProcess(textToEncrypt, encryptionKey, randomBinary(8), "vigenere");
}
  
};
function randomBinary(length) {
  let binaryCode = "0";

  for (let i = 0; i < length - 1; i++) {
    binaryCode += Math.floor(Math.random() * 2);
  }

  return binaryCode;
}
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
      text.splice(i, 1, caesarCipher(text[i], key, 8));
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
    console.log(String(encryptText(text, parseInt(key), IV, cipher)).replace(/,/g, ""));
  } else if (cipher == "vigenere") {
    console.log("\n");
    console.log("The encrypted text in binary:");
    console.log(String(encryptText(text, key, IV, cipher)).replace(/,/g, ""));
  }
  console.log("\n");
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