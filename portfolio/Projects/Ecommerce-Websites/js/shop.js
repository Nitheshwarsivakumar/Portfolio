const apiUrl = "https://fakestoreapi.com/products";
const shopContainer = document.getElementById("shop");
const categoryFilter = document.getElementById("category");
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const cartItemsList = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");
const closeCartBtn = document.getElementById("close-cart");

document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();

    document.getElementById("category").addEventListener("change", filterProducts);
});

let allProducts = [];
let cart = [];

// Fetch and Display Products
async function fetchProducts() {
    try {
        const menResponse = await fetch("https://fakestoreapi.com/products/category/men's clothing");
        const womenResponse = await fetch("https://fakestoreapi.com/products/category/women's clothing");

        if (!menResponse.ok || !womenResponse.ok) {
            throw new Error(`HTTP Error! Status: ${menResponse.status} ${womenResponse.status}`);
        }

        const menProducts = await menResponse.json();
        const womenProducts = await womenResponse.json();

        const products = [...menProducts, ...womenProducts];
        displayProducts(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        document.getElementById("product-container").innerHTML = "<p>Failed to load products. Please try again later.</p>";
    }
}

// Render Products in HTML
function displayProducts(products) {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = ""; // Clear previous content

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p><strong>Price:</strong> $${product.price}</p>
            <button onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')">Add to Cart</button>
        `;

        productContainer.appendChild(productCard);
    });
}

function filterProducts() {
    const category = document.getElementById("category").value;
    let filteredProducts = allProducts;

    if (category === "men") {
        filteredProducts = allProducts.filter(product => product.category === "men's clothing");
    } else if (category === "women") {
        filteredProducts = allProducts.filter(product => product.category === "women's clothing");
    }

    displayProducts(filteredProducts);
}


// Add to Cart Functionality

function addToCart(id, name, price, image) {
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    cartCount.innerText = cart.length;
    cartItemsList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const listItem = document.createElement("li");
        listItem.innerHTML = `${item.name} - $${item.price} <button onclick="removeFromCart(${index})">❌</button>`;
        cartItemsList.appendChild(listItem);
    });

    totalPriceEl.innerText = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

cartCount.addEventListener("click", () => {
    cartModal.classList.add("open");
});

closeCartBtn.addEventListener("click", () => {
    cartModal.classList.remove("open");
});

categoryFilter.addEventListener("change", () => {
    fetchShoes();
});

fetchShoes();
