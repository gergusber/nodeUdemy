"use strict";
const num1Element = document.getElementById("num1");
const num2Element = document.getElementById("num2");
const butonElement = document.querySelector("button");
const rusticnumResults = [];
const numResults = [];
const textResults = [];
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
function printResult(resultObj) {
    console.log(resultObj.val);
}
butonElement.addEventListener("click", () => {
    const num1 = num1Element.value;
    const num2 = num2Element.value;
    const result = add(+num1, +num2);
    const stringResult = add(+num1, +num2);
    console.log(result);
    console.log(stringResult);
});
// my promise / We need to update the config to use ES6
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("it wORKS");
    }, 1000);
});
myPromise.then((res) => {
    console.log(res.split("w"));
});
//COMPILE WITH tsc app.ts
//tsc --init  => to create new ts config file
//tsc => compile all files including the typescript file
