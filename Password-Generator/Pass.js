
const uppercaseCodes = [
    65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90];
  
const lowercaseCodes = [
    97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122];
  
const numberCodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];

const symbolCodes = [
    33, 34, 35, 36, 37, 38, 39, 40, 41, 42,
    43, 44, 45, 46, 47, 58, 59, 60, 61, 62,
    63, 64, 91, 92, 93, 94, 95, 123, 124, 125,
    126];

// Variables que recogen los IDs de los elementos
// Variables que recogen los checkboxes dentro de los divs con los IDs correspondientes
const passwordLengthCheckbox = document.getElementById("passwordLength").querySelector("input[type='number']");
const includeUppercaseCheckbox = document.getElementById("includeUppercase").querySelector("input[type='checkbox']");
const includeLowercaseCheckbox = document.getElementById("includeLowercase").querySelector("input[type='checkbox']");
const includeNumbersCheckbox = document.getElementById("includeNumbers").querySelector("input[type='checkbox']");
const includeSymbolsCheckbox = document.getElementById("includeSymbols").querySelector("input[type='checkbox']");
const genButton = document.getElementById("gen");
let result = document.getElementById("result");

genButton.addEventListener("click", () => {
    let arrNums = [];
    let arrPassword = "";
    
    if (includeUppercaseCheckbox.checked) arrNums.push(...uppercaseCodes);
    if (includeLowercaseCheckbox.checked) arrNums.push(...lowercaseCodes);
    if (includeNumbersCheckbox.checked) arrNums.push(...numberCodes);
    if (includeSymbolsCheckbox.checked) arrNums.push(...symbolCodes);


    for (let index = 0; index < passwordLengthCheckbox.value; index++) {
        const randomIndex = Math.floor(Math.random() * arrNums.length);
        arrPassword += String.fromCharCode(arrNums[randomIndex]);
    }
    result.value = arrPassword;
    //console.log("Contraseña generada:", arrPassword);
});
