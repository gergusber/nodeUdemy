const num1Element = document.getElementById("num1") as HTMLInputElement;
const num2Element = document.getElementById("num2") as HTMLInputElement;
const butonElement = document.querySelector("button")!;

const rusticnumResults: Array<number> = [];
const numResults: number[] = [];
const textResults: string[] = [];

type NumOrString = number | string;
type Result = { val: number; timestamp: Date };

interface ResultOb {
  val: number;
  timestamp: Date;
}

function add(num1: NumOrString, num2: NumOrString) {
  if (typeof num1 === "number" && typeof num2 === "number") {
    return num1 + num2;
  } else if (typeof num1 === "string" && typeof num2 === "string") {
    return num1 + " " + num2;
  } else {
    return +num1 + +num2;
  }
}
function printResult(resultObj: ResultOb) {
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
const myPromise = new Promise<string>((resolve, reject) => {
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
