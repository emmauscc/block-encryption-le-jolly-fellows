# Block encryption

A simple project to implement block encryption with JavaScript.

## Project layout

The source code is found in the `src/` folder which is further split into `node/` and `web/` for CLI and web respectively. Currently the `src/web/` folder just holds placeholder code but the `src/node/` folder holds `common.js`, `decrypt.js` and `encrypt.js`.

`common.js` has the functions that are shared for both the encryption process and the decryption process. The exported functions are `XORgate(character, IV)` and `caesarCipher(text, key, length)`.

`decrypt.js` asks for the text that needs to be decrypted, the bit length, encryption key and then the initialization vector. The code will log all the information provided and the steps to decrypt (Split text into array, revert the caesar cipher and put it through the XOR gate). Finally the text is converted from binary to ASCII and then normal text.

`encrypt.js` asks for the text that needs to be encrypted. The code will log all the information provided and the steps to encrypt (Text turned into ASCII, ASCII converted to binary, put it through the XOR gate and then the caesar cipher).
