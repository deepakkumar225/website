const products = [
 { id: 2, name: "Burger", price: 150, img: "5b408431-9957-46ad-bffa-ea2c60b6e684.jpg" },
  { id: 3, name: "Biriyani", price: 250, img: "15029d11-07d2-4950-9e41-7e55f5f3d7a6.jpg" },
   { id: 1, name: "Pizza", price: 250, img: "pizza-pizza-filled-with-tomatoes-salami-olives.jpg" },
  { id: 4, name: "Parotta", price: 20, img: "ce38479c-d708-4f69-aa20-163049802b1e.jpg" },
  { id: 5, name: "Pasta", price: 200, img: "50e5260b-64d2-4137-8364-f485b4d983f7.jpg" },
  { id: 6, name: "Noodles", price: 100, img: "ee60fe9d-258d-4185-a10c-4c5fc9125512.jpg" },
  { id: 7, name: "Ice Cream", price: 80, img: "bcf56724-91a3-4c39-a5c8-a24dd9e07e35.jpg" },
  { id: 8, name: "Soup", price: 100, img: "9f0ff3f5-5d3b-4d55-a211-5c0528b907de.jpg" },
  { id: 9, name: "Chilli 65", price: 100, img: "8875923e-cc6e-4087-95a2-5c12128e53fb.jpg" },
  { id: 10, name: "Veg Noodles", price: 90, img: "ee60fe9d-258d-4185-a10c-4c5fc9125512.jpg" },
  { id: 11, name: "Chickennoodles", price: 110, img: "ee60fe9d-258d-4185-a10c-4c5fc9125512.jpg" },
  { id: 12, name: "Coke", price: 50, img: "02e1e8e8-099e-435f-acd6-5e379b5620ba.jpg" },
  { id: 13, name: "Water", price: 20, img: "38639e26-54d4-4595-8e46-7a3be0175a0a.jpg" },
  { id: 14, name: "Egg Noodles", price: 110, img: "ee60fe9d-258d-4185-a10c-4c5fc9125512.jpg" },
  { id: 15, name: "Fruit Salid", price: 50, img: "74b8de48-5efb-43a3-b7c4-4c118852e8f7.jpg" },
];

const cart = {};

function displayProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <div class="product-name">${product.name}</div>
      <div class="product-price">₹ ${product.price}</div>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(id) {
  if (cart[id]) {
    cart[id].qty += 1;
  } else {
    const product = products.find(p => p.id === id);
    cart[id] = { ...product, qty: 1 };
  }
  renderCart();
}

function removeFromCart(id) {
  delete cart[id];
  renderCart();
}

function updateQty(id, qty) {
  if (qty <= 0) {
    removeFromCart(id);
  } else {
    cart[id].qty = qty;
  }
  renderCart();
}

function renderCart() {
  const cartEl = document.getElementById("cart");
  cartEl.innerHTML = "";
  let total = 0;
  Object.values(cart).forEach(item => {
    total += item.price * item.qty;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span><strong>${item.name}</strong></span>
      <input type="number" value="${item.qty}" onchange="updateQty(${item.id}, this.value)">
      <span>₹ ${item.price * item.qty}</span>
      <button onclick="removeFromCart(${item.id})">🗑️</button>
    `;
    cartEl.appendChild(div);
  });

  if (total > 0) {
    const totalDiv = document.createElement("div");
    totalDiv.id = "total";
    totalDiv.innerHTML = `Grand Total: ₹ ${total}`;
    cartEl.appendChild(totalDiv);
  } else {
    cartEl.innerHTML = "<p>Your cart is empty.</p>";
  }

}

displayProducts();