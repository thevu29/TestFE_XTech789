// header when scroll
const header = document.querySelector('.header')

window.onscroll = () => {
    const scrollPosition = window.scrollY
    const triggerPoint = 100

    if (scrollPosition > triggerPoint) {
        header.classList.add('scrolled')
    } else {
        header.classList.remove('scrolled')
    }
}

// slide hero image
const prevHeroButton = document.querySelector('.hero-prev')
const nextHeroButton = document.querySelector('.hero-next')
const heroSection = document.querySelector('.hero-section')
const heroOverlay = document.querySelector('.hero-overlay')
const heroProduct = document.querySelector('.hero-product')
const heroDots = document.querySelectorAll('.hero-section .dot')

let currentHeroIndex = 0

const heroImages = [
    './assets/images/hero-1.png',
    './assets/images/hero-2.png'
]

const changeHeroImage = index => {
    heroDots[currentHeroIndex].classList.remove('active')
    currentHeroIndex = index

    heroSection.style.backgroundImage = `url('${heroImages[currentHeroIndex]}')`
    heroDots[currentHeroIndex].classList.add('active')

    if (heroImages[currentHeroIndex].includes('hero-1')) {
        prevHeroButton.classList.add('disabled')
        nextHeroButton.classList.remove('disabled')
        heroOverlay.classList.remove('fade-out')
        heroOverlay.classList.add('fade-in')
        heroProduct.classList.add('move-to-hero-1')
        heroProduct.classList.remove('move-to-hero-2')
    } else {
        prevHeroButton.classList.remove('disabled')
        nextHeroButton.classList.add('disabled')
        heroOverlay.classList.add('fade-out')
        heroOverlay.classList.remove('fade-in')
        heroProduct.classList.add('move-to-hero-2')
        heroProduct.classList.remove('move-to-hero-1')
    }
}

nextHeroButton.onclick = () => {
    const nextIndex = (currentHeroIndex + 1) % heroImages.length
    changeHeroImage(nextIndex)
}

prevHeroButton.onclick = () => {
    const prevIndex = (currentHeroIndex - 1 + heroImages.length) % heroImages.length
    changeHeroImage(prevIndex)
}

heroDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (index !== currentHeroIndex) {
            changeHeroImage(index)
        }
    })
})

// tip swiper slide
const tipSwiper = new Swiper('.tip-swiper', {
    loop: true,
    slidesPerView: 1,
    speed: 800,
    centeredSlides: true,
    breakpoints: {
        1024: {
            slidesPerView: 3,
            spaceBetween: 32,
        }
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})

// gallery
window.addEventListener('load', function () {
    baguetteBox.run('.gallery')
})

const galleryContainer = document.querySelector('.gallery')
const scrollSpeed = 0.5
let isDown = false
let startX
let scrollLeft

galleryContainer.addEventListener('mousemove', (e) => {
    const containerWidth = galleryContainer.offsetWidth
    const contentWidth = galleryContainer.scrollWidth
    const mouseX = e.clientX - galleryContainer.getBoundingClientRect().left
    const scrollPercentage = mouseX / containerWidth
    const scrollPosition = (contentWidth - containerWidth) * scrollPercentage * scrollSpeed
    galleryContainer.scrollLeft = scrollPosition
})

// render products
const productsContainer = document.querySelector('.product-list .row')

const products = [
    { id: '1', name: 'Syltherine', description: 'Stylish cafe chair', price: 2500000, image: './assets/images/products/product-1.png', discount: 30, status: '' },
    { id: '2', name: 'Leviosa', description: 'Stylish cafe chair', price: 2500000, image: './assets/images/products/product-2.png', discount: 0, status: '' },
    { id: '3', name: 'Lolito', description: 'Luxury big sofa', price: 7000000, image: './assets/images/products/product-3.png', discount: 50, status: '' },
    { id: '4', name: 'Respira', description: 'Minimalist fan', price: 500000, image: './assets/images/products/product-4.png', discount: 0, status: 'New' },
    { id: '5', name: 'Grifo', description: 'Night lamp', price: 1500000, image: './assets/images/products/product-5.png', discount: 0, status: '' },
    { id: '6', name: 'Muggo', description: 'Small mug', price: 150000, image: './assets/images/products/product-6.png', discount: 0, status: 'New' },
    { id: '7', name: 'Pingky', description: 'Cute bed set', price: 7000000, image: './assets/images/products/product-7.png', discount: 50, status: '' },
    { id: '8', name: 'Potty', description: 'Minimalist flower pot', price: 500000, image: './assets/images/products/product-8.png', discount: 30, status: '' }
]

function formatCurrency(amount) {
    return amount.toLocaleString('id-ID')
}

let visibleProducts = 4
let currentIndex = 0

const renderProduct = (start, count) => {
    for (let i = start; i < start + count; i++) {
        if (products[i]) {
            const isNew = products[i].status === 'New'
                ? '<div class="product-status new">New</div>'
                : ''

            const isDiscount = products[i].discount > 0
                ? `<div class="product-status discount">-${products[i].discount}%</div>`
                : ''

            const priceDiscount = isDiscount
                ? `
                    <span class="product-price">Rp ${formatCurrency(products[i].price * (100 - products[i].discount) / 100)}</span>
                    <span class="product-origin-price">Rp ${formatCurrency(products[i].price)}</span>
                `
                : `<span class="product-price">Rp ${formatCurrency(products[i].price)}</span>`

            const productCard = `
                <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 mb-5">
                    <div class="product-card" data-id=${products[i].id}>
                        ${isNew}
                        ${isDiscount}
                        <img src=${products[i].image} class="product-img">
                        <div class="product-information">
                            <h3 class="product-name">${products[i].name}</h3>
                            <p class="product-description">${products[i].description}</p>
                            <div class="d-flex align-items-center flex-wrap">
                                ${priceDiscount}
                            </div>
                            <button class="add-cart-btn__mobile">Add to cart</button>
                        </div>
                        <div class="product-overlay">
                            <div class="product-action">
                                <button class="add-cart-btn" onClick="addToCart()">Add to cart</button>
                                <div
                                    class="d-flex align-content-center justify-content-between px-3 mt-3 w-100 like-share__box">
                                    <span class="share-btn">
                                        <i class="fa-solid fa-share-nodes"></i>
                                        Share
                                    </span>
                                    <span class="like-btn">
                                        <i class="fa-regular fa-heart"></i>
                                        Like
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="like-share__mobile">
                            <span class="like-btn">
                                <i class="fa-regular fa-heart"></i>
                            </span>
                            <span class="share-btn">
                                <i class="fa-solid fa-share-nodes"></i>
                            </span>
                        </div>
                    </div>
                </div>
            `
            productsContainer.insertAdjacentHTML('beforeend', productCard)
        }
    }
}

renderProduct(currentIndex, visibleProducts)

// show cart
const cart = document.querySelector('.nav-icon.cart')
const cartDropdown = document.querySelector('.cart-dropdown')
const cartButton = document.querySelector('.nav-icon.cart')

const initCart = () => {
    const carts = localStorage.getItem('carts') ? JSON.parse(localStorage.getItem('carts')) : []

    if (carts.length > 0) {
        const cartItems = carts.map(cart => {
            return `
                <li class="cart-dropdown__item">
                    <img src=${cart.image} class="cart-dropdown__img" />
                    <div class="cart-dropdown__description">
                        <h6 class="cart-dropdown__name">${cart.name}</h6>
                        <div class="d-flex align-items-center justify-content-between">
                            <p class="cart-dropdown__price me-2">Rp ${formatCurrency(cart.price * (100 - cart.discount) / 100)}</p>
                            <p class="cart-dropdown__quantity">x${cart.quantity}</p>
                        </div>
                        <button class="delete-product-btn">Delete</button>
                    </div>
                </li>
            `
        }).join('')

        const totalPrice = carts.reduce((acc, cart) => acc + cart.price * cart.quantity * (100 - cart.discount) / 100, 0)

        const cartDropdownContent = `
            <ul class="cart-dropdown__list">
                ${cartItems}
            </ul>
            <div class="cart-dropdown__footer">
                <div class="d-flex justify-content-between align-items-center">
                    <p class="cart-dropdown__total">Total</p>
                    <p class="cart-dropdown__total-price">Rp ${formatCurrency(totalPrice)}</p>
                </div>
            </div>
        `

        cartDropdown.innerHTML = cartDropdownContent
    } else {
        cartDropdown.innerHTML = `
            <div class="empty-cart">
                <img src="./assets/images/cart-empty.png" />
            </div>
        `
    }
}

if (cartButton) {
    cartButton.onclick = e => {
        e.stopPropagation()
        initCart()
        cartDropdown.classList.toggle('active')
    }

    document.addEventListener('click', () => {
        if (cartDropdown.classList.contains('active')) {
            cartDropdown.classList.remove('active')
        }
    })
}

// show cart quantity
const showCartQuantity = () => {
    const carts = localStorage.getItem('carts') ? JSON.parse(localStorage.getItem('carts')) : []
    const quantity = carts.reduce((acc, cart) => acc + cart.quantity, 0)
    const cartQuantity = document.querySelector('.cart-quantity')
    cartButton.setAttribute('data-quantity', quantity)
    
    if (quantity > 0) {
        cart.classList.add('has-quantity')
        cartQuantity.innerHTML = quantity
    } else {
        cart.classList.remove('has-quantity')
        cartQuantity.innerHTML = ''
    }
}
showCartQuantity()

// add to cart
const addCartButtons = document.querySelectorAll('.add-cart-btn')

function attachAddToCartListeners() {
    const addCartButtons = document.querySelectorAll('.add-cart-btn')
    const cart = document.querySelector('.nav-icon.cart')

    addCartButtons.forEach(addCartButton => {
        addCartButton.onclick = e => {
            e.stopPropagation()

            const target_parent = e.target.closest('.product-card')
            target_parent.style.zIndex = '999999'

            const img = target_parent.querySelector('.product-img')
            const flying_img = img.cloneNode()
            flying_img.classList.add('flying-img')

            target_parent.appendChild(flying_img)

            const flying_img_pos = flying_img.getBoundingClientRect()
            const shopping_cart_pos = cart.getBoundingClientRect()

            const data = {
                left: shopping_cart_pos.left - (shopping_cart_pos.width / 2 + flying_img_pos.left + flying_img_pos.width / 2),
                top: shopping_cart_pos.bottom - flying_img_pos.bottom + 30
            }

            flying_img.style.cssText = `
                --left: ${data.left.toFixed(2)}px;
                --top: ${data.top.toFixed(2)}px;
            `

            setTimeout(() => {
                target_parent.style.zIndex = ''
                target_parent.removeChild(flying_img)
            }, 1000)

            const product = products.find(product => product.id === target_parent.getAttribute('data-id'))
            product.quantity = 1
            const carts = localStorage.getItem('carts') ? JSON.parse(localStorage.getItem('carts')) : []

            const existingProduct = carts.find(cart => cart.id === product.id)
            if (existingProduct) {
                existingProduct.quantity += 1
            } else {
                carts.push(product)
            }

            localStorage.setItem('carts', JSON.stringify(carts))
            showCartQuantity()
            initCart()
        }
    })
}

attachAddToCartListeners()

// delete cart item
cartDropdown.onclick = e => {
    e.stopPropagation()

    if (e.target.classList.contains('delete-product-btn')) {
        e.stopPropagation()
        const carts = JSON.parse(localStorage.getItem('carts'))
        const parent = e.target.closest('.cart-dropdown__item')
        const index = Array.from(parent.parentNode.children).indexOf(parent)
        carts.splice(index, 1)

        localStorage.setItem('carts', JSON.stringify(carts))
        initCart()
        showCartQuantity()
    }
}

// load more products
const loadMoreButton = document.querySelector('.load-more-btn')

loadMoreButton.onclick = e => {
    e.stopPropagation()

    currentIndex += visibleProducts
    renderProduct(currentIndex, visibleProducts)
    attachAddToCartListeners()

    if (currentIndex + visibleProducts >= products.length) {
        loadMoreButton.style.display = 'none'
    }
}