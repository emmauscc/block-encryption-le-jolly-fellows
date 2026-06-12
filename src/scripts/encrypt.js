/* eslint-disable */

function randomBinary(length) {
  let binaryCode = "01";

  for (let i = 0; i < length - 2; i++) {
    binaryCode += Math.floor(Math.random() * 2);
  }

  return binaryCode;
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

// TODO: Research if code is consistent over multiple hand tests
function encryptText(text, key, IV, cipher) {
  if (cipher == "caesar") {
    text = text.split("");
  } else if (cipher == "vigenere"){
    text = vigenereCipher(text.toUpperCase(), key.toUpperCase(), 1).split("");
  }

  for (let i = 0; i < text.length; i++) {
    text.splice(i, 1, ASCIIToBinary(textToASCII(text[i])));

    if (i == 0) {
      text.splice(i, 1, XORgate(text[i], IV));
    } else {
      text.splice(i, 1, XORgate(text[i], text[i - 1]));
    }

    if (cipher == "caesar") {
      text.splice(i, 1, caesarCipher(text[i], key));
    }
  }
  return text;
}

function encryptionProcess(text, key, IV, cipher) {
  document.getElementById("output").innerHTML = "Using IV: " + IV;

  if (cipher == "caesar") {
    if (key > 64 || key <= 0) {
      document.getElementById("output").innerHTML = "<br>" + "Encryption key too high or negative! Please keep it lower than or equal to 64";
      return;
    }
    document.getElementById("output").innerHTML += "<br>";

    document.getElementById("output").innerHTML += "<br>" + "The encrypted text in binary:";
    document.getElementById("output").innerHTML += "<br>" + encryptText(text, parseInt(key), IV, cipher).join("");
  } else if (cipher == "vigenere") {
    document.getElementById("output").innerHTML += "<br>";
    
    document.getElementById("output").innerHTML += "<br>" + "The encrypted text in binary:";
    document.getElementById("output").innerHTML += "<br>" + encryptText(text, key, IV, cipher).join("");
  }
}
