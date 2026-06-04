export function XORgate(character, IV) {
  let binaryString = "";

  for (let j = 0; j < character.length; j++) {
    binaryString += character[j] ^ IV[j];
  }

  return binaryString;
}

export function caesarCipher(text, key) {
  let cipherText;

  cipherText = (parseInt(text, 2) + key).toString(2);
  while (cipherText.length < 8) {
    cipherText = "0" + cipherText;
  }
  return cipherText;
}

export function vigenereCipher(text, key) {
  let counter = 0;
  let result = "";
  let keyValues = [];

  for (let i = 0; i < key.length; i++) {
    keyValues[i] = key.charCodeAt(i) - 65;
  }
  
  for (let i = 0; i < text.length; i++) {
    let character = text[i];
    if (/[A-Z]/.test(character)) {
      let utf = text.charCodeAt(i) + keyValues[counter % key.length];
      
      while(utf > 90){
        utf -= 26
      } while(utf < 65){
        utf += 26
      }
      character = String.fromCharCode(utf);
      counter++;
    }
    result += character;
  }
  return result;
}