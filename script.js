const newArrivalsData=[
  {
    "id": 1,
    "title": "Skullcandy – Crusher ANC 2 Wireless Headphones",
    "price": 299.99,
    "badge": "NEW",
    "rating": 5,
    "image": "./assets/products-img.png",
    "wishlistIcon": "./assets/wishlist-icon.svg"

  },
  {
    "id": 2,
    "title": "Sony WH-1000XM5 Noise Cancelling Headphones",
    "price": 349.99,
    "badge": "HOT",
    "rating": 4,
    "image": "./assets/products-img2.png",
    "wishlistIcon": "./assets/wishlist-icon.svg"

  },
  {
    "id": 3,
    "title": "JBL Tune 720BT Wireless Over-Ear",
    "price": 129.99,
    "badge": "NEW",
    "rating": 4,
    "image": "./assets/products-img3.png",
    "wishlistIcon": "./assets/wishlist-icon.svg"

  },
  {
    "id": 4,
    "title": "Beats Studio Wireless 3",
    "price": 249.99,
    "badge": "SALE",
    "rating": 5,
    "image": "./assets/products-img4.png",
    "wishlistIcon": "./assets/wishlist-icon.svg"

  },
  {
    "id": 5,
    "title": "Apple AirPods Max",
    "price": 499.99,
    "badge": "SALE",
    "rating": 5,
    "image": "./assets/products-img5.png",
    "wishlistIcon": "./assets/wishlist-icon.svg"

  }
]


const bestSellingData=[
  {
    "id": 1,
    "title": "Skullcandy – Crusher anc 2 wireless headphones",
    "price": 299.99,
    "badge": "NEW",
    "wishlistIcon": "./assets/wishlist-icon.svg",
    "image": "./assets/best-product1.jpg",
    "rating": 5
  },
  {
    "id": 2,
    "title": "Sony WH-1000XM5 Noise Cancelling Headphones",
    "price": 349.99,
    "badge": "HOT",
    "wishlistIcon": "./assets/wishlist-icon.svg",
    "image": "./assets/products-img2.png",
    "rating": 4
  },
  {
    "id": 3,
    "title": "JBL Tune 720BT Wireless Over-Ear",
    "price": 129.99,
    "badge": "BEST",
    "wishlistIcon": "./assets/wishlist-icon.svg",
    "image": "./assets/products-img3.png",
    "rating": 4
  },
  {
    "id": 4,
    "title": "JBL Tune 720BT Wireless Over-Ear",
    "price": 129.99,
    "badge": "BEST",
    "wishlistIcon": "./assets/wishlist-icon.svg",
    "image": "./assets/products-img4.png",
    "rating": 4
  },
  {
    "id": 5,
    "title": "JBL Tune 720BT Wireless Over-Ear",
    "price": 129.99,
    "badge": "BEST",
    "wishlistIcon": "./assets/wishlist-icon.svg",
    "image": "./assets/products-img5.png",
    "rating": 4
  }
]



/*DROPDOWN MENU */
document.querySelectorAll(".dropdown").forEach(drop => {
    drop.addEventListener("click", function () {

        document.querySelectorAll(".dropdown").forEach(d => {
            if (d !== drop) {
                d.classList.remove("active");
                d.querySelector(".dropdown-menu").style.display = "none";
            }
        });

        drop.classList.toggle("active");
        drop.querySelector(".dropdown-menu").style.display =
            drop.classList.contains("active") ? "block" : "none";
    });
});

/* SLIDER VARIABLES */
let track = document.querySelector(".product-track");
let dots = document.querySelectorAll(".slider-dot");
let cards = [];
let currentIndex = 0;


// Card width + gap
function cardWidth() {
    if (cards.length === 0) return 0;
    return cards[0].offsetWidth + 20; 
}

// dotted SVG
const activeSVG = `
<svg height="24" width="24"><circle cx="12" cy="12" r="10" fill="none" stroke="black" stroke-width="2"></circle><circle cx="12" cy="12" r="7" fill="black"></circle></svg>
`;

const inactiveSVG = `
<svg height="18" width="18"><circle cx="8" cy="8" r="8" fill="#6C7275"></circle></svg>
`;

// slider + dots
function updateSlider() {
    if (cards.length === 0) return;

    track.style.transform = `translateX(-${currentIndex * cardWidth()}px)`;

    dots.forEach((d, i) => {
        d.classList.remove("active");
        d.innerHTML = inactiveSVG;
        if (i === currentIndex) {
            d.classList.add("active");
            d.innerHTML = activeSVG;
        }
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        currentIndex = index;
        updateSlider();
    });
});



/* SLIDER SWIPE / POINTER DRAG*/
let startX = 0;

track.addEventListener("pointerdown", e => {
    startX = e.clientX;
    track.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
});

track.addEventListener("pointerup", e => {
    const diff = e.clientX - startX;

    if (diff > 50 && currentIndex > 0) currentIndex--;
    if (diff < -50 && currentIndex < cards.length - 1) currentIndex++;

    updateSlider();

    track.style.cursor = "grab";
    document.body.style.userSelect = "auto";
});

/* NEW ARRIVALS (LOAD JSON) */
function loadNewArrivals() {
    track.innerHTML = "";

    newArrivalsData.forEach(product => {
        track.innerHTML += `
            <div class="single-product-card">
                <div class="img-wrapper-section">
                    <div class="product-badge-wishlist-wrapper">
                        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
                        <button class="wishlist-icon"><img src="${product.wishlistIcon}"></button>
                    </div>

                    <div class="product-image-wrapper">
                        <img src="${product.image}" class="product-img">
                    </div>

                    <button class="add-to-cart">Add to cart</button>
                </div>

                <div class="rating">${generateStars(product.rating)}</div>
                <h3 class="product-title">${product.title}</h3>
                <p class="price">$${product.price}</p>
            </div>
        `;
    });

    cards = document.querySelectorAll(".single-product-card");
    currentIndex = 0;
    updateSlider();
}
loadNewArrivals();


/*  BEST SELLERS (LOAD JSON) */
const container = document.getElementById("bestSellerContainer");

function generateStars(count) {
    let stars = "";
    for (let i = 0; i < count; i++) {
        stars += `
        <svg width="14" height="14" fill="#343839">
            <path d="M6.40919 0....Z"/>
        </svg>`;
    }
    return stars;
}


bestSellingData.forEach(product => {
    container.innerHTML += `
        <div class="single-best-card">
            <div class="img-wrapper-section">
                <div class="product-badge-wishlist-wrapper">
                    <span class="product-badge">${product.badge}</span>
                    <button class="wishlist-icon">
                        <img src="${product.wishlistIcon}">
                    </button>
                </div>

                <div class="product-image-wrapper">
                    <img src="${product.image}" class="product-img">
                </div>

                <button class="add-to-cart">Add to cart</button>
            </div>

            <div class="rating">${generateStars(product.rating)}</div>
            <h3 class="product-title">${product.title}</h3>
            <p class="price">$${product.price}</p>
        </div>
    `;
});



/* SIDEBAR (MOBILE MENU)*/
const sideMenu = document.getElementById("sideMenu");
const openBtn = document.querySelector(".open-menu-btn");
const closeBtn = document.getElementById("closeBtn");

openBtn.addEventListener("click", () => sideMenu.classList.add("active"));
closeBtn.addEventListener("click", () => sideMenu.classList.remove("active"));

function sidebar_open() {
    document.querySelector('.mobile-menu-container').classList.add('open');
    document.querySelector('.mobile-menu-container').classList.remove('closed');
}

function sidebar_close() {
    document.querySelector('.mobile-menu-container').classList.add('closed');
    document.querySelector('.mobile-menu-container').classList.remove('open');
}

document.querySelector('.open-menu-btn').addEventListener('click', sidebar_open);

// fade up effect 
const fadeElements = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

fadeElements.forEach(el => observer.observe(el));
