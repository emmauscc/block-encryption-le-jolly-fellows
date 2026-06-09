/* eslint-disable */
let textToEncrypt = ''
let encryptionKey = ''

console.log("test");

window.getInfo = function(){
textToEncrypt = document.getElementById("text-input").value
encryptionKey = document.getElementById("iv-input").value
console.log(textToEncrypt)
console.log(encryptionKey)
encryptionProcess(textToEncrypt, encryptionKey, randomBinary(8));


}




function randomBinary(length) {
  let binaryCode = "0";

  for (let i = 0; i < length - 1; i++) {
    binaryCode += Math.floor(Math.random() * 2);
  }

  return binaryCode;
}

// TODO: Research if code is consistent over multiple hand tests
function encryptText(text, key, IV) {
  let encryptedText = text.split("");

  for (let i = 0; i < encryptedText.length; i++) {
    encryptedText.splice(i, 1, "0" + encryptedText[i].charCodeAt(0).toString(2));

  while (encryptedText[i].length < 8) {
    encryptedText[i] = "0" + encryptedText[i];
  }

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
