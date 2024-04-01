const container = document.getElementById("product-container");
const cart = document.getElementById("cart");

const products = [
  {
    name: "Scooter",
    price: 199.99,
    imageUrl: "https://api.dicebear.com/8.x/icons/svg?seed=Scooter",
  },
  {
    name: "Headphones",
    price: 99.99,
    imageUrl: "https://api.dicebear.com/8.x/icons/svg?seed=Headphones",
  },
  {
    name: "Smartphone",
    price: 599.99,
    imageUrl: "https://api.dicebear.com/8.x/icons/svg?seed=Smartphone",
  },
  {
    name: "Laptop",
    price: 999.99,
    imageUrl: "https://api.dicebear.com/8.x/icons/svg?seed=Laptop",
  },
  {
    name: "Watch",
    price: 149.99,
    imageUrl: "https://api.dicebear.com/8.x/icons/svg?seed=Watch",
  },
  {
    name: "Sunglasses",
    price: 49.99,
    imageUrl: "https://api.dicebear.com/8.x/icons/svg?seed=Sunglasses",
  },
  {
    name: "Backpack",
    price: 79.99,
    imageUrl: "https://api.dicebear.com/8.x/icons/svg?seed=Backpack",
  },
  {
    name: "Gaming Console",
    price: 399.99,
    imageUrl: "https://api.dicebear.com/8.x/icons/svg?seed=Gaming%20Console",
  },
];


let cartItems = [];

function renderProducts() {
  container.innerHTML = ""; 

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");

    const image = document.createElement("img");
    image.src = product.imageUrl;
    image.alt = product.name;
    image.classList.add("product-image");

    imageContainer.appendChild(image);

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("info");

    const name = document.createElement("h2");
    name.textContent = product.name;

    const price = document.createElement("p");
    price.textContent = "$" + product.price.toFixed(2);

    const button = document.createElement("button");
    button.textContent = "Add to Cart";
    button.classList.add("add-to-cart-btn");

    button.addEventListener("click", () => addToCart(product));

    infoDiv.appendChild(name);
    infoDiv.appendChild(price);
    infoDiv.appendChild(button);

    productDiv.appendChild(imageContainer);
    productDiv.appendChild(infoDiv);

    container.appendChild(productDiv);
  });
}

function addToCart(product) {
  const existingItemIndex = cartItems.findIndex((item) => item.product === product);
  if (existingItemIndex !== -1) {
    cartItems[existingItemIndex].quantity++;
  } else {
    cartItems.push({ product, quantity: 1 });
  }
  renderCart();
}

function removeFromCart(index) {
  cartItems.splice(index, 1);
  renderCart();
}

function updateQuantity(index, newQuantity) {
  cartItems[index].quantity = newQuantity;
  renderCart();
}

function renderCart() {
  cart.innerHTML = ""; 

  cartItems.forEach((cartItem, index) => {
    const cartItemDiv = document.createElement("div");
    cartItemDiv.classList.add("cart-item");

    const itemName = document.createElement("span");
    itemName.textContent = cartItem.product.name;

    const itemPrice = document.createElement("span");
    itemPrice.textContent = " $  " + (cartItem.product.price * cartItem.quantity).toFixed(2);

    const quantityControl = document.createElement("div");
    quantityControl.classList.add("quantity-control");

    const decreaseButton = document.createElement("button");
    decreaseButton.textContent = "-";
    decreaseButton.addEventListener("click", () => {
      if (cartItem.quantity > 1) {
        updateQuantity(index, cartItem.quantity - 1);
      }
    });

    const quantityDisplay = document.createElement("span");
    quantityDisplay.textContent = cartItem.quantity;

    const increaseButton = document.createElement("button");
    increaseButton.textContent = "+";
    increaseButton.addEventListener("click", () => updateQuantity(index, cartItem.quantity + 1));

    quantityControl.appendChild(decreaseButton);
    quantityControl.appendChild(quantityDisplay);
    quantityControl.appendChild(increaseButton);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeFromCart(index));

    cartItemDiv.appendChild(itemName);
    cartItemDiv.appendChild(itemPrice);
    cartItemDiv.appendChild(quantityControl);
    cartItemDiv.appendChild(removeButton);

    cart.appendChild(cartItemDiv);
  });

  const totalPrice = cartItems.reduce((total, cartItem) => {
    return total + cartItem.product.price * cartItem.quantity;
  }, 0);
  const totalPriceDisplay = document.createElement("div");
  totalPriceDisplay.textContent = "Total Price: $" + totalPrice.toFixed(2);
  cart.appendChild(totalPriceDisplay);
}


renderProducts();
