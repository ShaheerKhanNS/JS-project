const clearField = () => {
  document.getElementById("product").value = "";
  document.getElementById("price").value = "";
};

const addProduct = async function () {
  try {
    const productName = document.getElementById("product").value;
    const productPrice = document.getElementById("price").value;
    const productCategory = document.getElementById("category").value;
    const parentNode = document.getElementById("table");
    const data = await axios({
      method: "POST",
      url: "https://crudcrud.com/api/c22b774f46094a8bb7c9247c96fb8686/product",
      data: {
        productName,
        productPrice,
        productCategory,
      },
    });
    const template = `
      <tr>
      <td>${productName}</td>
      <td>${productPrice}</td>
      <td>${productCategory}</td>
      <td>
      <button type="button" data-set ='${data.data._id}' id="button--dlt" onclick="deleteRow(this)">Delete</button>
      </td>
      </tr>`;
    parentNode.innerHTML = parentNode.innerHTML + template;
    clearField();
  } catch (err) {}
};

document.getElementById("button").addEventListener("click", addProduct);

const deleteRow = async (el) => {
  const id = el.dataset.set;
  const td = el.parentNode.parentNode.parentNode;
  const tr = el.parentNode.parentNode;
  await axios({
    method: "DELETE",
    url: `https://crudcrud.com/api/c22b774f46094a8bb7c9247c96fb8686/product/${id}`,
  });
  td.deleteRow(tr);
};

const retrieveData = async () => {
  const parentNode = document.getElementById("table");
  const data = await axios({
    method: "GET",
    url: "https://crudcrud.com/api/c22b774f46094a8bb7c9247c96fb8686/product",
  });

  data.data.forEach((el) => {
    const { productName, productPrice, productCategory, _id } = el;
    const template = `
      <tr>
      <td>${productName}</td>
      <td>${productPrice}</td>
      <td>${productCategory}</td>
      <td>
      <button type="button" data-set ='${_id}' id="button--dlt" onclick="deleteRow(this)">Delete</button>
      </td>
      </tr>`;
    parentNode.innerHTML = parentNode.innerHTML + template;
  });
};

window.addEventListener("DOMContentLoaded", retrieveData);
