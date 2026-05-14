let plainText = 'ROSEBUD'
let temp = ''
let asciiArray = []
let binaryArray = []

function TAB(){
    for(let i=0; i<plainText.length; i++){
        asciiArray[i] = plainText.charCodeAt(i)
    } 
    console.log(asciiArray)
    for(let i=0;i<plainText.length;i++){
        temp = asciiArray[i].toString()
        binaryArray[i] = Number(temp).toString(2)
    }
    console.log(binaryArray)
} TAB();