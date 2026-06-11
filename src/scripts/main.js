/* eslint-disable */

function displayCipherDropdown() {
  if (document.getElementById("text-input").value != "") {
    document.getElementById("cipherDropdown").style.display = "inline-block";
    document.getElementById("key-input").style.display = "inline-block";
  } else {
    document.getElementById("cipherDropdown").style.display = "none";
    document.getElementById("key-input").style.display = "none";
  }
}

function displayModeDropdown() {
  if (document.getElementById("key-input").value != "") {
    document.getElementById("modeDropdown").style.display = "inline-block";
    document.getElementById("runButton").style.display = "inline-block";
  } else {
    document.getElementById("modeDropdown").style.display = "none";
    document.getElementById("runButton").style.display = "none";
  }
}

function displayIVText() {
  if (document.getElementById("modeDropdown").value == "decrypt") {
    document.getElementById("iv-input").style.display = "inline-block";
  } else {
    document.getElementById("iv-input").style.display = "none";
  }
}

function workInput() {
  let initializationVector = randomBinary(8);

  if (document.getElementById("modeDropdown").value == "encrypt") {
    encryptionProcess(
      document.getElementById("text-input").value,
      document.getElementById("key-input").value,
      initializationVector,
      document.getElementById("cipherDropdown").value,
    );
  } else if (document.getElementById("modeDropdown").value == "decrypt") {
    decryptionProcess(
      document.getElementById("text-input").value,
      document.getElementById("key-input").value,
      document.getElementById("iv-input").value,
      document.getElementById("cipherDropdown").value,
    );
  }
}
