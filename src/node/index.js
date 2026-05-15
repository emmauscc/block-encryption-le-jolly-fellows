import readline from "readline";

let initializationVector = randomBinary(8);
let encryptedText;

let rl = readline.createInterface(process.stdin, process.stdout);

rl.question("What text do you want to encrypt? ", (plainText) => {
  console.log("Using text: " + plainText);

  encryptedText = encryptText(plainText, initializationVector);

  console.log("The original text in binary:");
  console.log(ASCIIToBinary(textToASCII(plainText)));

  console.log("Using the initialization vector:");
  console.log(initializationVector);

  console.log("The encrypted text in binary:");
  console.log(encryptedText);

  rl.close();
});

function randomBinary(length) {
  let binaryCode = "";

  for (let i = 0; i < length; i++) {
    binaryCode += Math.floor(Math.random() * 2);
  }

  return binaryCode;
}

function textToASCII(text) {
  let asciiArray = [];

  for (let i = 0; i < text.length; i++) {
    asciiArray[i] = text.charCodeAt(i);
  }

  return asciiArray;
}

function ASCIIToBinary(text) {
  let binaryArray = [];

  for (let i = 0; i < text.length; i++) {
    binaryArray[i] = "0" + text[i].toString(2);
  }

  return binaryArray;
}

function XORgate(text, IV) {
  let XORArray = [];

  for (let i = 0; i < text.length; i++) {
    let binaryString = "";

    for (let j = 0; j < text[i].length; j++) {
      binaryString += text[i][j] ^ IV[j];
    }
    XORArray.push(binaryString);
    IV = binaryString;
  }

  return XORArray;
}

function encryptText(text, IV) {
  return caesarCipher(XORgate(ASCIIToBinary(textToASCII(text)), IV), 5);
}

function numberToBinary(number, length) {
  let binaryCode = (number >>> 0).toString(2);
  for (let i = 0; i < length - (number >>> 0).toString(2).length; i++) {
    binaryCode = "0" + binaryCode;
  }
  return binaryCode;
}

function caesarCipher(text, key) {
  let cipherText = [];
  for (let i = 0; i < text.length; i++) {
    cipherText.push(parseInt(text[i], 2) + parseInt(numberToBinary(key, 8), 2).toString(2));
  }
  return cipherText;
}
