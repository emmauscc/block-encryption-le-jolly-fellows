# Block encryption

A simple project to implement block encryption with JavaScript.

## Project layout

The source code for cli can be found in the `cli/` folder with a focus on CLI use. The web version can be found in `src/` and only currently holds basic boiler plate code. For desktop, the relevant code is in `src-tauri/`. The `cli/` folder holds `common.js`, `decrypt.js` and `encrypt.js`.

`common.js` has the functions that are shared for both the encryption process and the decryption process. The exported functions are `XORgate(character, IV)` and `caesarCipher(text, key)`.

`decrypt.js` asks for the text that needs to be decrypted, encryption key and then the initialization vector (you can also pass them in from the command line). The code will log all the information provided and the steps to decrypt (Split text into array, revert the caesar cipher and put it through the XOR gate). Finally the text is converted from binary to ASCII and then normal text.

`encrypt.js` asks for the text that needs to be encrypted and the encryption key (you can also pass them in from the command line). The code will log all the information provided and the steps to encrypt (Text turned into ASCII, ASCII converted to binary, put it through the XOR gate and then the caesar cipher).
