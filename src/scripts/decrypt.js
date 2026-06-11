/* eslint-disable */

function decryptText(text, key, IV, cipher) {
  text = text.match(/.{1,8}/g);

  for (let i = text.length - 1; i > -1; i--) {
    if (cipher === "caesar") {
      text[i] = caesarCipher(text[i], -key);
    }

    if (i == 0) {
      text[i] = XORgate(text[i], IV);
    } else {
      text[i] = XORgate(text[i], text[i - 1]);
    }
  }

  for (let i = 0; i < text.length; i++) {
    text[i] = String.fromCharCode(parseInt(text[i], 2));
  }
  if (cipher === "vigenere"){
    text = vigenereCipher(text.join(""), key, 0).split("");
  }
  return text;
}

function decryptionProcess(text, key, IV, cipher) {
  let output = document.getElementById("output");
  output.innerHTML = "Using IV: " + IV;

  if (cipher === "caesar") {
    output.innerHTML += "<br>";

    output.innerHTML += "<br>" + "The decrypted text in plain text:";
    output.innerHTML += "<br>" + decryptText(text, parseInt(key), IV, cipher).join("");
  } else if (cipher === "vigenere") {
    output.innerHTML += "<br>";
    
    output.innerHTML += "<br>" + "The encrypted text in binary:";
    output.innerHTML += "<br>" + decryptText(text, key, IV, cipher).join("");
  }
}
