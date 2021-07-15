var num1Element = document.getElementById("num1");
var num2Element = document.getElementById("num2");
var butonElement = document.querySelector("button");
function add(num1, num2) {
    return num1 + num2;
}
butonElement.addEventListener("click", function () {
    var num1 = num1Element.value;
    var num2 = num2Element.value;
    var result = add(+num1, +num2);
    console.log(result);
});
// console.log(add(1, 6));
// console.log(add("1", "6"));
