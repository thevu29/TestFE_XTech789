// show search box
const searchButton = document.querySelector('.nav-icon.search')

if (searchButton) {
    const searchBox = document.querySelector('.search-box__mobile')

    searchButton.onclick = e => {
        e.stopPropagation()
        searchBox.classList.toggle('active')
    }

    document.addEventListener('click', () => {
        if (searchBox.classList.contains('active')) {
            searchBox.classList.remove('active')
        }
    })

    searchBox.addEventListener('click', (e) => {
        e.stopPropagation()
    })
}


//mobile hero swiper
const mobileHeroSwiper = new Swiper('.hero-mobile.swiper', {
    loop: true,
    slidesPerView: 1,
    speed: 800,
    centeredSlides: true,
    pagination: {
        el: '.hero-mobile .swiper-pagination',
        clickable: true,
    },
})

// open menu
const menuButton = document.querySelector('.nav-icon.menu')

if (menuButton) {
    const menu = document.querySelector('.header-menu__mobile')
    const menuOverlay = document.querySelector('.header-menu__mobile-overlay')

    menuButton.onclick = e => {
        e.stopPropagation()
        menu.classList.toggle('active')
        menuOverlay.classList.toggle('active')
    }

    document.addEventListener('click', () => {
        if (menu.classList.contains('active')) {
            menu.classList.remove('active')
            menuOverlay.classList.remove('active')
        }
    })

    menu.addEventListener('click', (e) => {
        e.stopPropagation()
    })
}

const closeMenuButton = document.querySelector('.menu-close')

if (closeMenuButton) {
    const menu = document.querySelector('.header-menu__mobile')
    const menuOverlay = document.querySelector('.header-menu__mobile-overlay')

    closeMenuButton.onclick = () => {
        menu.classList.remove('active')
        menuOverlay.classList.remove('active')
    }
}

// open dropdown menu
const dropdownButtons = document.querySelectorAll('.menu-item')

if (dropdownButtons) {
    dropdownButtons.forEach(button => {
        button.onclick = e => {
            e.preventDefault()
            button.classList.toggle('show')
        }
    })
}