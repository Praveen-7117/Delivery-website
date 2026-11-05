var swiper = new Swiper(".mySwiper", {
    loop: true,
    navigation: {
        nextEl: "#next",
        prevEl: "#prev",
    },
});

const cartIcon = document.querySelector('.cart-icon');
const cartTab = document.querySelector('.cart-tab');
const closeBtn = document.querySelector('.close-btn');
const cartOverlay = document.getElementById('cart-overlay');
const cardList = document.getElementById('menu-grid');
const cartList = document.querySelector('.cart-list');
const cartTotal = document.querySelector('.cart-total');
const cartValue = document.querySelector('.cart-value');
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const bars = document.querySelector('.fa-bars');

// Cart Open
cartIcon.addEventListener('click', (e) => {
    e.preventDefault();
    cartTab.classList.add('active');
    cartOverlay.classList.add('active');
});

// Cart Close
closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cartTab.classList.remove('active');
    cartOverlay.classList.remove('active');
});

cartOverlay.addEventListener('click', () => {
    cartTab.classList.remove('active');
    cartOverlay.classList.remove('active');
});

// Mobile Menu
hamburger.addEventListener('click', (e) => {
    e.preventDefault();
    mobileMenu.classList.toggle('active');
    bars.classList.toggle('fa-xmark');
});

let cartProduct = [];

let productList = [
    {
        "id": 1,
        "name": "Double Chicken Burger",
        "price": "$200",
        "image": "images/image2.jpg"
    },
    {
        "id": 2,
        "name": "Veggie Pizza",
        "price": "$180",
        "image": "images/image11.jpg"
    },
    {
        "id": 3,
        "name": "Fried Chicken",
        "price": "$220",
        "image": "images/image8.jpg"
    },
    {
        "id": 4,
        "name": "Chicken Lasanga",
        "price": "$160",
        "image": "images/image9.jpg"
    },
    {
        "id": 5,
        "name": "Chicken Roll",
        "price": "$130",
        "image": "images/image3.jpg"
    },
    {
        "id": 6,
        "name": "Sandwich",
        "price": "$80",
        "image": "images/image15.jpg"
    },
    {
        "id": 7,
        "name": "Itallian Spaghetti",
        "price": "$70",
        "image": "images/image16.jpg"
    },
    {
        "id": 8,
        "name": "Spring Roll",
        "price": "$60",
        "image": "images/image17.jpg"
    }
];

const updateTotals = () => {
    let totalPrice = 0;
    let totalQuantity = 0;

    document.querySelectorAll('.cart-list .item').forEach(item => {
        const quantity = parseInt(item.querySelector('.quantity-value').textContent);
        const price = parseFloat(item.querySelector('.item-total').textContent.replace('$', ''));
        totalPrice += price;
        totalQuantity += quantity;
    });

    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    cartValue.textContent = totalQuantity;
};

const showCards = () => {
    cardList.innerHTML = '';

    productList.forEach(product => {
        const orderCard = document.createElement('div');
        orderCard.classList.add('order-card');

        orderCard.innerHTML = `
            <div class="card-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="card-content">
                <h4>${product.name}</h4>
                <h4 class="price">${product.price}</h4>
                <a href="#" class="btn card-btn">Add to cart</a>
            </div>
        `;

        cardList.appendChild(orderCard);

        const cardBtn = orderCard.querySelector('.card-btn');
        cardBtn.addEventListener('click', (e) => {
            e.preventDefault();
            addToCart(product);
        });
    });
};

const addToCart = (product) => {
    const existingProduct = cartProduct.find(item => item.id === product.id);

    if (existingProduct) {
        alert('Item already in your cart!');
        return;
    }

    cartProduct.push(product);

    let quantity = 1;
    let price = parseFloat(product.price.replace('$', ''));

    const cartItem = document.createElement('div');
    cartItem.classList.add('item');

    cartItem.innerHTML = `
        <div class="item-image">
            <img src="${product.image}">
        </div>
        <div class="detail">
            <h4>${product.name}</h4>
            <h4 class="item-total">${product.price}</h4>
        </div>
        <div class="flex">
            <a href="#" class="quantity-btn minus">
                <i class="fa-solid fa-minus"></i>
            </a>
            <h4 class="quantity-value">${quantity}</h4>
            <a href="#" class="quantity-btn plus">
                <i class="fa-solid fa-plus"></i>
            </a>
        </div>
    `;

    const empty = cartList.querySelector('.empty-msg');
    if (empty) empty.remove();

    cartList.appendChild(cartItem);
    updateTotals();

    const plusBtn = cartItem.querySelector('.plus');
    const minusBtn = cartItem.querySelector('.minus');
    const quantityValue = cartItem.querySelector('.quantity-value');
    const itemTotal = cartItem.querySelector('.item-total');

    plusBtn.addEventListener('click', (e) => {
        e.preventDefault();
        quantity++;
        quantityValue.textContent = quantity;
        itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;
        updateTotals();
    });

    minusBtn.addEventListener('click', (e) => {
        e.preventDefault();

        if (quantity > 1) {
            quantity--;
            quantityValue.textContent = quantity;
            itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;
            updateTotals();
        } else {
            cartItem.classList.add('slide-out');
            setTimeout(() => {
                cartItem.remove();
                cartProduct = cartProduct.filter(item => item.id !== product.id);

                if (cartProduct.length === 0) {
                    cartList.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
                }

                updateTotals();
            }, 300);
        }
    });
};

showCards();