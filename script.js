const addProduct = function () {
  const productName = document.getElementById("product").value;
  const productPrice = document.getElementById("price").value;
  const productCategory = document.getElementById("category").value;
  const parentNode = document.getElementById("table");

  console.log(productName, productPrice, productCategory);

  const template = `
        <tr>
          <td>${productName}</td>
          <td>${productPrice}</td>
          <td>${productCategory}</td>
          <td>
            <button type="button" id="button--dlt" onclick="deleteRow(this)">Delete</button>
          </td>
        </tr>`;
  parentNode.innerHTML = parentNode.innerHTML + template;
};

document.getElementById("button").addEventListener("click", addProduct);

const deleteRow = (el) => {
  console.log(el);
  const td = el.parentNode.parentNode.parentNode;
  const tr = el.parentNode.parentNode;
  td.deleteRow(tr);
};
