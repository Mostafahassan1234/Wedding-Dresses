let menuToggle = document.querySelector('.menu-toggle');
let navbar = document.querySelector('.navbar');
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navbar.classList.toggle('active');
});

cartIcon.addEventListener('click', () => {
    cart.classList.add('active');
});
closeCart.addEventListener('click', () => {
    cart.classList.remove('active');
});

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', start);
} else {
    start();
}

function start() {
    addEvents();
}

function update() {
    addEvents();
    updateTotal();
}

function addEvents() {
    let removeCartItemButtons = document.getElementsByClassName('fa-cart-remove');
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i];
        button.addEventListener('click', handle_removeCartItem);
    }

    let quantityInputs = document.getElementsByClassName('cart-quantity');
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener('change', update);
    }

    let addCart_btns = document.querySelectorAll('.add-cart');
    addCart_btns.forEach((btn) => {
        btn.addEventListener('click', handle_addCartItem);
        
    });

    const buy_btn = document.querySelector('.btn-buy');
    buy_btn.addEventListener('click' ,handle_buyOrder);
}

let itemsAdded = [];
function handle_addCartItem() {
    let product = {
        title: this.parentElement.querySelector('.product-title').innerHTML,
        price: this.parentElement.querySelector('.prodect-price').innerHTML,
        imgSrc: this.parentElement.querySelector('.product-img').src
    }
    itemsAdded.push(product);
    let cartBoxElement = CartBoxComponent(product.title, product.price, product.imgSrc);
    let cartBox = document.createElement('div');
    cartBox.innerHTML = cartBoxElement;
    let cartBoxes = document.querySelector('.cart-content').children;
    if (cartBoxes.length > 0) {
        cartBoxes[cartBoxes.length - 1].after(cartBox);
    } else {
        document.querySelector('.cart-content').appendChild(cartBox);
    }
    update();
}

function handle_removeCartItem() {
    this.parentElement.remove();

    itemsAdded = itemsAdded.filter(el => el.title != this.parentElement.querySelector('.cart-product-title').innerHTML);

    update();
}

function handle_changeCartItemQuantity() {
    if (isNaN(this.value) || this.value <= 1) {
        this.value = 1;
        
    }
    this.value = Math.floor(this.value);


    update();
}

function handle_buyOrder() {
    if(itemsAdded.length > 0) {
        alert('there is no order to place yet! Please add some items to your cart first.');
        return;
    }
    const cartContent = document.querySelector('.cart-content');
    cartContent.innerHTML = '';
    alert('You order is placed successfully :');
    itemsAdded = [];

    update();
}
function updateTotal() {
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = document.querySelector(".total-price");
    let total = 0;
    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.querySelector(".cart-price");
        let quantityElement = cartBox.querySelector(".cart-quantity");
        let price = parseFloat(priceElement.textContent.replace("$", ""));
        let quantity = quantityElement.value;
        total += price * quantity;
    }
    totalElement.textContent = "$" + total.toFixed(2);
}

function CartBoxComponent(title, price, imgSrc) {
    return `
        <div class="cart-box">
            <img src="${imgSrc}" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <i class="fa fa-trash fa-cart-remove"></i>
        </div>
    `;
}