export function XORgate(character, IV) {
  let binaryString = "";

  for (let j = 0; j < character.length; j++) {
    binaryString += character[j] ^ IV[j];
  }

  return binaryString;
}

export function caesarCipher(text, key) {
  text = (parseInt(text, 2) + key).toString(2);
  
  while (text.length < 8) {
    text = "0" + text;
  }
  return text;
}

export function vigenereCipher(text, key, operation) {
  let counter = 0;
  let result = "";
  let keyValues = [];

  for (let i = 0; i < key.length; i++) {
    keyValues[i] = key.charCodeAt(i) - 65;
  }
  
  for (let i = 0; i < text.length; i++) {
    let character = text[i];
    let utf = text.charCodeAt(i);
    if (/[A-Z]/.test(character)) {
      if (operation == 1) {
        utf += keyValues[counter % key.length];
      } else if (operation == 0){
        utf -= keyValues[counter % key.length];
      }
      
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