const deleteProduct = (btn) => {
  //   console.log("Clicked");
  let productId = btn.parentNode.querySelector("[name=productId]").value;
  let crsf = btn.parentNode.querySelector("[name=_csrf]").value;
  const productElement = btn.closest("article");
  fetch("/admin/product/" + productId, {
    method: "DELETE",
    headers: {
      "csrf-token": crsf,
    },
  })
    .then((result) => {
      result.json();
    })
    .then((data) => {
      console.log(data);
      productElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
};
