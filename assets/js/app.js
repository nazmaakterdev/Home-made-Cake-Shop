
// ===================================
// ROSY - RAZIA'S CAKE ZONE
// Complete Main JavaScript
// ===================================


// ===================================
// 1. CAKE DATA
// ===================================

const cakes = [

    {
        id: 1,
        name: "Chocolate Dream Cake",
        price: 1200,
        category: "Chocolate",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600"
    },

    {
        id: 2,
        name: "Strawberry Delight",
        price: 1400,
        category: "Special",
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600"
    },

    {
        id: 3,
        name: "Classic Vanilla Cake",
        price: 1000,
        category: "Special",
        image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600"
    },

    {
        id: 4,
        name: "Birthday Celebration Cake",
        price: 1800,
        category: "Birthday",
        image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=600"
    },

    {
        id: 5,
        name: "Red Velvet Cake",
        price: 1500,
        category: "Special",
        image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=600"
    },

    {
        id: 6,
        name: "Chocolate Cupcakes",
        price: 450,
        category: "Cupcakes",
        image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600"
    },

    {
        id: 7,
        name: "Vanilla Cupcakes",
        price: 400,
        category: "Cupcakes",
        image: "https://images.unsplash.com/photo-1519869325930-281384150729?w=600"
    },

    {
        id: 8,
        name: "Black Forest Cake",
        price: 1600,
        category: "Chocolate",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600"
    },

    {
        id: 9,
        name: "Strawberry Cake Slice",
        price: 220,
        category: "Slices",
        image: "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600"
    },

    {
        id: 10,
        name: "Chocolate Cake Slice",
        price: 200,
        category: "Slices",
        image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600"
    },

    {
        id: 11,
        name: "Wedding Special Cake",
        price: 3500,
        category: "Special",
        image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600"
    },

    {
        id: 12,
        name: "Mini Birthday Cake",
        price: 850,
        category: "Birthday",
        image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=600"
    }

];


// ===================================
// 2. GET CART FROM LOCAL STORAGE
// ===================================

let cart = [];

try {

    cart = JSON.parse(localStorage.getItem("rosyCart")) || [];

} catch (error) {

    cart = [];

}


// ===================================
// 3. UPDATE CART COUNT
// ===================================

function updateCartCount() {

    const cartCount = document.getElementById("cartCount");

    if (!cartCount) {
        return;
    }

    const totalItems = cart.reduce((total, item) => {

        return total + item.quantity;

    }, 0);

    cartCount.textContent = totalItems;

}


// ===================================
// 4. SAVE CART
// ===================================

function saveCart() {

    localStorage.setItem("rosyCart", JSON.stringify(cart));

    updateCartCount();

}


// ===================================
// 5. ADD TO CART
// ===================================

function addToCart(id) {

    const selectedCake = cakes.find(cake => cake.id === id);

    if (!selectedCake) {
        return;
    }

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            id: selectedCake.id,
            name: selectedCake.name,
            price: selectedCake.price,
            quantity: 1

        });

    }

    saveCart();

    alert(selectedCake.name + " added to cart!");

}


// ===================================
// 6. ADD TO CART BUTTON EVENT
// Works on Homepage and Cakes Page
// ===================================

document.addEventListener("click", function (event) {

    const addButton = event.target.closest(".add-cart");

    if (!addButton) {
        return;
    }

    const cakeId = Number(addButton.dataset.id);

    addToCart(cakeId);

});


// ===================================
// 7. REMOVE FROM CART
// ===================================

function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    saveCart();

    displayCart();

}


// ===================================
// 8. UPDATE CART QUANTITY
// ===================================

function updateQuantity(id, change) {

    const item = cart.find(item => item.id === id);

    if (!item) {
        return;
    }

    item.quantity += change;

    if (item.quantity <= 0) {

        removeFromCart(id);

        return;

    }

    saveCart();

    displayCart();

}


// ===================================
// 9. DISPLAY CART
// ===================================

function displayCart() {

    const cartContainer = document.getElementById("cartItems");

    const cartTotal = document.getElementById("cartTotal");

    if (!cartContainer) {
        return;
    }

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <p class="empty-cart">
                Your cart is empty!
            </p>
        `;

        if (cartTotal) {
            cartTotal.textContent = "৳ 0";
        }

        return;

    }

    let total = 0;

    cartContainer.innerHTML = cart.map(item => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        return `
            <div class="cart-item">

                <div>
                    <h3>${item.name}</h3>
                    <p>৳ ${item.price}</p>
                </div>

                <div class="cart-quantity">

                    <button onclick="updateQuantity(${item.id}, -1)">
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="updateQuantity(${item.id}, 1)">
                        +
                    </button>

                </div>

                <div>
                    <strong>৳ ${itemTotal}</strong>

                    <button onclick="removeFromCart(${item.id})">
                        Remove
                    </button>
                </div>

            </div>
        `;

    }).join("");

    if (cartTotal) {

        cartTotal.textContent = "৳ " + total.toLocaleString("en-BD");

    }

}


// ===================================
// 10. CONTACT FORM - WHATSAPP
// ===================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("customerName").value.trim();

        const phone = document.getElementById("customerPhone").value.trim();

        const email = document.getElementById("customerEmail").value.trim();

        const subject = document.getElementById("customerSubject").value;

        const message = document.getElementById("customerMessage").value.trim();

        const whatsappNumber = "8801813182874";

        const whatsappMessage =
`Hello Razia's Cake Zone!

Customer Name: ${name}
Phone: ${phone}
Email: ${email || "Not provided"}
Subject: ${subject}

Message:
${message}

Thank you!`;

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(whatsappURL, "_blank");

    });

}


// ===================================
// 11. PROCEED TO ORDER - WHATSAPP
// ===================================

const proceedBtn = document.getElementById("proceedToOrder");

if (proceedBtn) {

    proceedBtn.addEventListener("click", function () {

        if (cart.length === 0) {

            alert("Your cart is empty! Please add a cake first.");

            return;

        }

        const whatsappNumber = "8801813182874";

        let total = 0;

        const orderDetails = cart.map(item => {

            const itemTotal = item.price * item.quantity;

            total += itemTotal;

            return `${item.name}
Quantity: ${item.quantity}
Price: ৳ ${item.price}
Subtotal: ৳ ${itemTotal}`;

        }).join("\n\n");

        const whatsappMessage =
`Hello Razia's Cake Zone!

I would like to place an order.

${orderDetails}

-------------------------
Total Amount: ৳ ${total}

Please confirm my order.
Thank you!`;

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(whatsappURL, "_blank");

    });

}


// ===================================
// 12. DYNAMIC CAKE COLLECTION
// ===================================

const cakeGrid = document.getElementById("cakeGrid");

let revealObserver = null;


// ===== DISPLAY CAKES =====

function displayCakes(category = "all") {

    if (!cakeGrid) {
        return;
    }

    const filteredCakes = category === "all"
        ? cakes
        : cakes.filter(cake => cake.category === category);

    if (filteredCakes.length === 0) {

        cakeGrid.innerHTML = `
            <p class="empty-cart">
                No cakes found in this category.
            </p>
        `;

        return;

    }

    cakeGrid.innerHTML = filteredCakes.map(cake => {

        return `
            <div class="cake-card">

                <img
                    src="${cake.image}"
                    alt="${cake.name}"
                    loading="lazy"
                >

                <div class="cake-info">

                    <span class="cake-category">
                        ${cake.category}
                    </span>

                    <h3>${cake.name}</h3>

                    <p>৳ ${cake.price.toLocaleString("en-BD")}</p>

                    <button
                        class="btn btn-primary add-cart"
                        data-id="${cake.id}"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>
        `;

    }).join("");


    // Observe newly generated cake cards

    if (revealObserver) {

        const newCakeCards = cakeGrid.querySelectorAll(".cake-card");

        newCakeCards.forEach(element => {

            element.classList.add("scroll-reveal", "reveal-up");

            revealObserver.observe(element);

        });

    }

}


// ===================================
// 13. CATEGORY FILTER
// ===================================

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        this.classList.add("active");

        const selectedCategory = this.dataset.filter;

        displayCakes(selectedCategory);

    });

});


// Display all cakes when Homepage loads

displayCakes();


// ===================================
// 14. INTERACTIVE CAKE CUTTING
// ===================================

const showcaseCake = document.getElementById("showcaseCake");

const cutCakeBtn = document.getElementById("cutCakeBtn");

const cutMessage = document.getElementById("cutMessage");


if (showcaseCake && cutCakeBtn) {

    cutCakeBtn.addEventListener("click", function () {

        showcaseCake.classList.toggle("cut");

        if (showcaseCake.classList.contains("cut")) {

            cutCakeBtn.innerHTML =
                '<i class="bi bi-arrow-counterclockwise"></i> Reset Cake';

            if (cutMessage) {

                cutMessage.textContent =
                    "Yummy! Your delicious cake slice is ready! 🍰";

            }

        } else {

            cutCakeBtn.innerHTML =
                '<i class="bi bi-scissors"></i> Cut the Cake';

            if (cutMessage) {

                cutMessage.textContent =
                    "Ready for a sweet surprise?";

            }

        }

    });

}


// ===================================
// 15. REPEATABLE SCROLL REVEAL
// ===================================

const revealElements = [

    {
        selector: ".about-section .about-image",
        animation: "reveal-right"
    },

    {
        selector: ".about-section .about-text",
        animation: "reveal-left"
    },

    {
        selector: ".features .section-heading",
        animation: "reveal-up"
    },

    {
        selector: ".features .feature-card",
        animation: "reveal-up"
    },

    {
        selector: ".cta-content",
        animation: "reveal-up"
    },

    {
        selector: ".cake-card",
        animation: "reveal-up"
    },

    // Custom Cake Design

    {
        selector: ".custom-cake-image",
        animation: "reveal-right"
    },

    {
        selector: ".custom-cake-text",
        animation: "reveal-left"
    },

    // How To Order

    {
        selector: ".order-step",
        animation: "reveal-up"
    },

    // Interactive Cake Showcase

    {
        selector: ".cake-showcase-info",
        animation: "reveal-left"
    },

    // Gallery

    {
        selector: ".gallery-card",
        animation: "reveal-up"
    }

];


// ===== OBSERVE REVEAL ELEMENT =====

function observeRevealElement(element, animation) {

    element.classList.add("scroll-reveal", animation);

    if (revealObserver) {

        revealObserver.observe(element);

    }

}


// ===== CREATE INTERSECTION OBSERVER =====

if ("IntersectionObserver" in window) {

    revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("is-visible");

            } else {

                entry.target.classList.remove("is-visible");

            }

        });

    }, {

        threshold: 0.15

    });


    // Apply animation to all selected elements

    revealElements.forEach(item => {

        const elements = document.querySelectorAll(item.selector);

        elements.forEach(element => {

            observeRevealElement(element, item.animation);

        });

    });

} else {

    // Fallback for browsers without IntersectionObserver

    revealElements.forEach(item => {

        document.querySelectorAll(item.selector).forEach(element => {

            element.classList.add("is-visible");

        });

    });

}


// ===================================
// 16. INITIALIZE
// ===================================

updateCartCount();

displayCart();
