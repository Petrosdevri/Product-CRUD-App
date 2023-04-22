const main = require('../main');
const productForm = document.getElementById('productForm');
const productName = document.getElementById('name');
const productPrice = document.getElementById('price');
const productDescription = document.getElementById('description');
const productsList = document.getElementById('products');

let products = [];
let editingStatus = false;
let editProductId;

const deleteProduct = async (id) => {
  const response = confirm('Are you sure you want to delete it?');
  if(response) {
    await main.deleteProduct(id);
    await getProducts();
  }
  return;
};

const editProduct = async (id) => {
  const product = await main.getProductById(id);
  productName.value = product.name;
  productPrice.value = product.price;
  productDescription.value = product.description;
  editingStatus = true;
  editProductId = id;
};

productForm.addEventListener('submit', async (e) => {
  try {
    e.preventDefault();

    const product = {
      name: productName.value,
      price: productPrice.value,
      description: productDescription.value,
    };

    if(!editingStatus) {
      const savedProduct = await main.createProduct(product);
      console.log(savedProduct);
    } else {
      const productUpdated = await main.updateProduct(editProductId, product);
      console.log(productUpdated);
      editingStatus = false;
      editProductId = '';
    }

    productForm.reset();
    productName.focus();
    getProducts();
  } catch(error) {
    console.log(error);
  }
});

function renderProducts(tasks) {
  productsList.innerHTML = '';
  tasks.forEach((t) => {
    const card = document.createElement('div');
    card.classList.add('card', 'card-body', 'my-2', 'animated', 'fadeInLeft', 'gap-2');

    const name = document.createElement('h4');
    name.innerText = t.name;

    const description = document.createElement('p');
    description.innerText = t.description;

    const price = document.createElement('h3');
    price.innerText = `${t.price}$`;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
    deleteButton.innerText = 'DELETE';
    deleteButton.addEventListener('click', () => {
      deleteProduct(t.id);
    });

    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'btn-secondary', 'btn-sm');
    editButton.innerText = 'EDIT';
    editButton.addEventListener('click', () => {
      editProduct(t.id);
    });

    const p = document.createElement('p');
    p.appendChild(deleteButton);
    p.appendChild(editButton);

    card.appendChild(name);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(p);

    productsList.appendChild(card);
  });
}

const getProducts = async () => {
  products = await main.getProducts();
  renderProducts(products);
};

async function init() {
  getProducts();
}

init();
