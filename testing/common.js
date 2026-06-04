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