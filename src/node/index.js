import readline from "readline";

let initializationVector = randomBinary(8);
let encryptedText;

let rl = readline.createInterface(process.stdin, process.stdout);

rl.question("What text do you want to encrypt? ", (plainText) => {
  console.log("Using text: " + plainText);

  encryptedText = encryptText(plainText, initializationVector);

  console.log("The original text in binary:");
  console.log(String(ASCIIToBinary(textToASCII(plainText))));

  console.log("The encrypted text in binary:");
  console.log(String(encryptedText));

  console.log("Using the initialization vector:");
  console.log(initializationVector);

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

// TODO: Implement cipher such as the caesar cipher
function encryptText(text, IV) {
  return XORgate(ASCIIToBinary(textToASCII(text)), IV);
}