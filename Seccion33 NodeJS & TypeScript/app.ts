const num1Element = document.getElementById("num1") as HTMLInputElement;
const num2Element = document.getElementById("num2") as HTMLInputElement;
const butonElement = document.querySelector("button");

function add(num1: number, num2: number) {
  return num1 + num2;
}

butonElement.addEventListener("click", () => {
  const num1 = num1Element.value;
  const num2 = num2Element.value;
  const result = add(+num1, +num2);
  console.log(result);
});
// console.log(add(1, 6));

// console.log(add("1", "6"));
