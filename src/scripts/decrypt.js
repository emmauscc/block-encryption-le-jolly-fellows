/* eslint-disable */

function decryptText(text, key, IV, cipher) {
  text = text.match(/.{1,8}/g);

  for (let i = text.length - 1; i > -1; i--) {
    if (cipher == "caesar") {
      text.splice(i, 1, caesarCipher(text[i], -key, 8));
    }

    if (i == 0) {
      text.splice(i, 1, XORgate(text[i], IV));
    } else {
      text.splice(i, 1, XORgate(text[i], text[i - 1]));
    }
  }

  for (let i = 0; i < text.length; i++) {
    text.splice(i, 1, String.fromCharCode(parseInt(text[i], 2)));
  }
  if (cipher == "vigenere"){
    text = vigenereCipher(text.join(""), key, 0).split("");
  }
  return text;
}

function decryptionProcess(text, key, IV, cipher) {
  document.getElementById("output").innerHTML = "Using IV: " + IV;

  if (cipher == "caesar") {
    document.getElementById("output").innerHTML += "<br>";

    document.getElementById("output").innerHTML += "<br>" + "The decrypted text in plain text:";
    document.getElementById("output").innerHTML += "<br>" + String(decryptText(text, parseInt(key), IV, cipher)).replace(/,/g, "");
  } else if (cipher == "vigenere") {
    document.getElementById("output").innerHTML += "<br>";
    
    document.getElementById("output").innerHTML += "<br>" + "The encrypted text in binary:";
    document.getElementById("output").innerHTML += "<br>" + String(decryptText(text, key, IV, cipher)).replace(/,/g, "");
  }
}
