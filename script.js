// script.js

document.getElementById("addToCartButton").addEventListener("click", addToCart);

function addToCart() {
  const quantity = parseInt(document.getElementById("quantity").value);
  const productName = "Product Name";
  const productPrice = 99.99;
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  // Check if item is already in the cart
  let cartItem = document.querySelector(.cart-item[data-product="${productName}"]);
  if (cartItem) {
    // Update existing item quantity and total
    const currentQuantity = parseInt(cartItem.querySelector(".item-quantity").textContent);
    cartItem.querySelector(".item-quantity").textContent = currentQuantity + quantity;
  } else {
    // Create new item
    cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.setAttribute("data-product", productName);
    cartItem.innerHTML = `
      <p>${productName} - $${productPrice} x <span class="item-quantity">${quantity}</span></p>
    `;
    cartItems.appendChild(cartItem);
  }

  // Calculate total cost
  const total = Array.from(document.querySelectorAll(".cart-item")).reduce((sum, item) => {
    const itemQuantity = parseInt(item.querySelector(".item-quantity").textContent);
    return sum + itemQuantity * productPrice;
  }, 0);

  cartTotal.textContent = total.toFixed(2);
}