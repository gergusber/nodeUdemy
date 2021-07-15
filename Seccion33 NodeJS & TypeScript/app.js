"use strict";
var num1Element = document.getElementById("num1");
var num2Element = document.getElementById("num2");
var butonElement = document.querySelector("button");
function add(num1, num2) {
    if (typeof num1 === "number" && typeof num2 === "number") {
        return num1 + num2;
    }
    else if (typeof num1 === "string" && typeof num2 === "string") {
        return num1 + " " + num2;
    }
    else {
        return +num1 + +num2;
    }
}
butonElement.addEventListener("click", function () {
    var num1 = num1Element.value;
    var num2 = num2Element.value;
    var result = add(+num1, +num2);
    var stringResult = add(+num1, +num2);
    console.log(result);
    console.log(stringResult);
});
//COMPILE WITH tsc app.ts
//tsc --init  => to create new ts config file
//tsc => compile all files including the typescript file
