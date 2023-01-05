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
      url: "https://crudcrud.com/api/2e0ca4e1d2d649fba87d3dedbf4e25fc/product",
      data: {
        productName,
        productPrice,
        productCategory,
      },
    });
    const template = `
      <tr id='row_${data.data._id}'>
      <td id='name_${data.data._id}'>${productName}</td>
      <td id='price_${data.data._id}'>${productPrice}</td>
      <td id='category_${data.data._id}'>${productCategory}</td>
      <td>
      <button type="button" data-set ='${data.data._id}' id="button--dlt" onclick="deleteRow(this)">Delete</button>
      <button type="button" data-set ='${data.data._id}' id="button--edt" onclick="edit(this)">Edit</button>
      </td>
      </tr>`;
    parentNode.innerHTML = parentNode.innerHTML + template;
    clearField();
  } catch (err) {
    console.log(err.message);
  }
};

document.getElementById("button").addEventListener("click", addProduct);

const deleteRow = async (el) => {
  const id = el.dataset.set;
  const td = el.parentNode.parentNode.parentNode;
  const tr = el.parentNode.parentNode;
  await axios({
    method: "DELETE",
    url: `https://crudcrud.com/api/2e0ca4e1d2d649fba87d3dedbf4e25fc/product/${id}`,
  });
  td.deleteRow(tr);
};

const edit = async function (el) {
  try {
    console.log(`I have edited this😎`);
    const id = el.dataset.set;
    const name = document.getElementById(`name_${id}`).textContent;
    const price = document.getElementById(`price_${id}`).textContent;
    const category = document.getElementById(`category_${id}`).textContent;
    const row = document.getElementById(`row_${id}`);
    row.remove();

    document.getElementById("product").value = name;
    document.getElementById("price").value = price;
    document.getElementById("category").value = category;
    await axios({
      method: "DELETE",
      url: `https://crudcrud.com/api/2e0ca4e1d2d649fba87d3dedbf4e25fc/product/${id}`,
    });
  } catch (err) {
    err.message;
  }
};

const retrieveData = async () => {
  const parentNode = document.getElementById("table");
  const data = await axios({
    method: "GET",
    url: "https://crudcrud.com/api/2e0ca4e1d2d649fba87d3dedbf4e25fc/product",
  });

  data.data.forEach((el) => {
    const { productName, productPrice, productCategory, _id } = el;
    const template = `
      <tr id='row_${_id}'>
      <td id='name_${_id}'>${productName}</td>
      <td id='price_${_id}'>${productPrice}</td>
      <td id='category_${_id}'>${productCategory}</td>
      <td>
      <button type="button" data-set ='${_id}' id="button--dlt" onclick="deleteRow(this)">Delete</button>
      <button type="button" data-set ='${_id}' id="button--edt" onclick="edit(this)">Edit</button>
      </td>
      </tr>`;
    parentNode.innerHTML = parentNode.innerHTML + template;
  });
};

window.addEventListener("DOMContentLoaded", retrieveData);
