// Product list
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// -------------------------------
// Load cart from sessionStorage
// -------------------------------
function getCart() {
  return JSON.parse(sessionStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// -------------------------------
// Render product list
// -------------------------------
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  // Add event listeners for Add to Cart
  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", () => {
      addToCart(parseInt(button.dataset.id));
    });
  });
}

// -------------------------------
// Render cart items
// -------------------------------
function renderCart() {
  cartList.innerHTML = ""; // Clear previous display
  const cart = getCart();

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// -------------------------------
// Add item to cart
// -------------------------------
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const cart = getCart();

  cart.push(product); // Add product
  saveCart(cart);     // Save updated cart

  renderCart();       // Update UI
}

// -------------------------------
// Clear cart
// -------------------------------
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// -------------------------------
// Event listener for Clear Cart
// -------------------------------
clearCartBtn.addEventListener("click", clearCart);

// -------------------------------
// Initial page load
// -------------------------------
renderProducts();
renderCart();
