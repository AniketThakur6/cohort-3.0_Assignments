
const createBtn = document.querySelector("#create");
const closeBtn = document.querySelector("#close");
const overlay = document.querySelector(".overlay");
const form = document.querySelector("form");
const ProductBox = document.querySelector(".product-box");

const Products = JSON.parse(localStorage.getItem("Products")) || [];

let updateIndex = null;

createBtn.addEventListener("click", () => {
  overlay.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  overlay.style.display = "none";
});

const ui = () => {
  ProductBox.innerHTML = Products.map(
    (obj, idx) => `
  <div class="card">
          <div>
            <img
              src="${obj.image}"
              alt=""
            />
          </div>
          <div class="details">
            <p>${obj.name}</p>
            <p>${obj.description}</p>
            <p>$${obj.price}</p>
          </div>
          <div class="action">
            <button onclick="updateCard(${idx})" class="edit">Edit</button>
            <button onclick="deleteCard(${idx})" class="del">Delete</button>
          </div>
        </div>`,
  ).join("");
};

ui();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let name = form[0].value;
  let description = form[1].value;
  let price = form[2].value;
  let image = form[3].value;

  if (
    name.trim() === "" ||
    description.trim() === "" ||
    price.trim() === "" ||
    image.trim() === ""
  ) {
    alert("create valid product");
    return;
  }

  let obj = {
    name,
    description,
    price,
    image,
  };

  if (updateIndex !== null) {
    Products[updateIndex] = obj;
    updateIndex = null;
  } else {
    Products.push(obj);
  }

  localStorage.setItem("Products",JSON.stringify(Products))

  ui();

  overlay.style.display = "none";
  form[0].value = "";
  form[1].value = "";
  form[2].value = "";
  form[3].value = "";
});

const deleteCard = (idx) => {
  Products.splice(idx, 1);
  localStorage.setItem("Products",JSON.stringify(Products))
  ui();
};

const updateCard = (idx) => {
  overlay.style.display = "flex";
  updateIndex = Products.findIndex((elem, index) => index === idx);
  const { name, description, price, image } = Products.find(
    (elem, index) => index === idx,
  );

  form[0].value = name;
  form[1].value = description;
  form[2].value = price;
  form[3].value = image;
};
