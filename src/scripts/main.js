/* eslint-disable */

let initializationVector = randomBinary(8);

function encryptInput() {
  textToEncrypt = document.getElementById("text-input").value;
  encryptionKey = document.getElementById("key-input").value;
 
  if(document.getElementById("dropdown").value == "Caesar"){
    encryptionProcess(textToEncrypt, encryptionKey, initializationVector, "caesar");
  } else{
    encryptionProcess(textToEncrypt, encryptionKey, initializationVector, "vigenere");
  }


}
function decryptInput() {
  textToDecrypt = document.getElementById("text-input").value;
  encryptionKey = document.getElementById("key-input").value;
  decryptionProcess(textToDecrypt, encryptionKey, initializationVector, "caesar");
}