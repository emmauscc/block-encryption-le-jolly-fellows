/* eslint-disable */

let initializationVector = randomBinary(8);

function encryptInput() {
  textToEncrypt = document.getElementById("text-input").value;
  encryptionKey = document.getElementById("key-input").value;
  encryptionProcess(textToEncrypt, encryptionKey, initializationVector, "caesar");
}
function decryptInput() {
  textToDecrypt = document.getElementById("text-input").value;
  encryptionKey = document.getElementById("key-input").value;
  decryptionProcess(textToDecrypt, encryptionKey, initializationVector, "caesar");
}