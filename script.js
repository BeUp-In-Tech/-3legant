// dropdown start 
document.querySelectorAll(".dropdown").forEach(drop => {
    drop.addEventListener("click", function () {
        document.querySelectorAll(".dropdown").forEach(d => {
            if (d !== drop) {
                d.classList.remove("active");
                d.querySelector(".dropdown-menu").style.display = "none";
            }
        });
        drop.classList.toggle("active");

        let menu = drop.querySelector(".dropdown-menu");

        if (drop.classList.contains("active")) {
            menu.style.display = "block";
        } else {
            menu.style.display = "none";
        }
    });
});


// slider js start
const track = document.querySelector(".product-track");
const dots = document.querySelectorAll(".slider-dot");
const cards = document.querySelectorAll(".single-product-card");

let currentIndex = 0;

function cardWidth() {
  const card = cards[0];
  const gap = 20;  
  return card.offsetWidth + gap;
}

const activeSVG = `
<svg height="24" width="24" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="10" fill="none" stroke="black" stroke-width="2"></circle>
  <circle cx="12" cy="12" r="7" fill="black"></circle>
</svg>
`;

const inactiveSVG = `
<svg height="18" width="18" xmlns="http://www.w3.org/2000/svg">
  <circle cx="8" cy="8" r="8" fill="#6C7275"></circle>
</svg>
`;


function updateSlider() {
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



const products = [
  {
    id: 1,
    title: "Skullcandy – Crusher anc 2 wireless headphones",
    price: 299.99,
    badge: "NEW",
    wishlistIcon: "./assets/wishlist-icon.svg",
    image: "./assets/best-product1.jpg",
    rating: 5
  },
  {
    id: 2,
    title: "Sony WH-1000XM5 Noise Cancelling Headphones",
    price: 349.99,
    badge: "HOT",
    wishlistIcon: "./assets/wishlist-icon.svg",
    image: "./assets/products-img2.png",
    rating: 4
  },
  {
    id: 3,
    title: "JBL Tune 720BT Wireless Over-Ear",
    price: 129.99,
    badge: "BEST",
    wishlistIcon: "./assets/wishlist-icon.svg",
    image: "./assets/products-img3.png",
    rating: 4
  },
  {
    id: 4,
    title: "JBL Tune 720BT Wireless Over-Ear",
    price: 129.99,
    badge: "BEST",
    wishlistIcon: "./assets/wishlist-icon.svg",
    image: "./assets/products-img4.png",
    rating: 4
  },
  {
    id: 4,
    title: "JBL Tune 720BT Wireless Over-Ear",
    price: 129.99,
    badge: "BEST",
    wishlistIcon: "./assets/wishlist-icon.svg",
    image: "./assets/products-img5.png",
    rating: 4
  },
];

const container = document.getElementById("bestSellerContainer");

function generateStars(count) {
  let stars = "";
  for (let i = 0; i < count; i++) {
    stars += `
      <svg width="14" height="14" viewBox="0 0 14 14" fill="#343839" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.40919 0.307964C6.57999 -0.102683 7.16171 -0.102684 7.33251 0.307962L8.86959 4.00356C8.9416 4.17667 9.1044 4.29496 9.2913 4.30994L13.281 4.62979C13.7243 4.66534 13.9041 5.21859 13.5663 5.50792L10.5266 8.11178C10.3842 8.23376 10.322 8.42515 10.3655 8.60752L11.2942 12.5008C11.3974 12.9334 10.9268 13.2753 10.5472 13.0435L7.13148 10.9572C6.97147 10.8595 6.77023 10.8595 6.61022 10.9572L3.19448 13.0435C2.81493 13.2753 2.3443 12.9334 2.4475 12.5008L3.37619 8.60752C3.41969 8.42515 3.3575 8.23376 3.21511 8.11178L0.175376 5.50793C-0.162392 5.21859 0.0173699 4.66534 0.460697 4.6298L4.4504 4.30994C4.6373 4.29496 4.8001 4.17667 4.87211 4.00356L6.40919 0.307964Z"/>
      </svg>`;
  }
  return stars;
}

function loadProducts() {
  products.forEach(product => {
    const card = `
      <div class="single-best-card">
        <div class="img-wrapper-section">
          <div class="product-badge-wishlist-wrapper">
            <span class="product-badge">${product.badge}</span>
            <button class="wishlist-icon">
              <img src="${product.wishlistIcon}" alt="wishlist">
            </button>
          </div>

          <div class="product-image-wrapper">
            <img src="${product.image}" alt="${product.title}" class="product-img" />
          </div>

          <button class="add-to-cart">Add to cart</button>
        </div>

        <div class="rating">
          ${generateStars(product.rating)}
        </div>

        <h3 class="product-title">${product.title}</h3>
        <p class="price">$${product.price}</p>
      </div>
    `;

    container.innerHTML += card;
  });
}

loadProducts();


// slider js end

async function loadNewArrivals() {
  const res = await fetch("/json/new-arrivals.json");
  const data = await res.json();

  const wrapper = document.getElementById("arrival-wrapper");

  data.forEach(product => {
    wrapper.innerHTML += `
      <div class="swiper-slide">
        <div class="single-product-card">
          <div class="img-wrapper-section">
            <div class="product-badge-wishlist-wrapper">
              ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
              <button class="wishlist-icon">
                <img src="./assets/wishlist-icon.svg" />
              </button>
            </div>

            <div class="product-image-wrapper">
              <img src="${product.image}" class="product-img" />
            </div>

            <button class="add-to-cart">Add to cart</button>
          </div>

          <div class="rating">
            ${"<svg width='14' height='14'><path fill='#343839' d='M6.40919 0.307964C6.57999 -0.102683..."}</svg>".repeat(product.rating)}
          </div>

          <h3 class="product-title">${product.title}</h3>
          <p class="price">$${product.price}</p>
        </div>
      </div>
    `;
  });

  new Swiper(".newArrivalSwiper", {
    slidesPerView: "auto",
    spaceBetween: 40,
    rtl: true,
    centeredSlides: true,
    grabCursor: true,
  });
}

loadNewArrivals();




const sideMenu = document.getElementById("sideMenu");
const openBtn = document.querySelector(".open-menu-btn");
const closeBtn = document.getElementById("closeBtn");

openBtn.addEventListener("click", () => {
  sideMenu.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  sideMenu.classList.remove("active");
});




function sidebar_close() {
  document.querySelector('.mobile-menu-container').classList.remove('open');
  document.querySelector('.mobile-menu-container').classList.add('closed');
}

function sidebar_open() {
  document.querySelector('.mobile-menu-container').classList.remove('closed');
  document.querySelector('.mobile-menu-container').classList.add('open');
}

document.querySelector('.open-menu-btn').addEventListener('click', sidebar_open);






