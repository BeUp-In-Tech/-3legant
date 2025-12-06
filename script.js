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

// best seller  
const container = document.getElementById("bestSellerContainer");
function generateStars(count) {
  let stars = "";
  for (let i = 0; i < count; i++) {
    stars += `
      <svg width="14" height="14" viewBox="0 0 14 14" fill="#343839">
        <path d="M6.40919 0....Z"/>
      </svg>`;
  }
  return stars;
}

fetch('/json/best-selling.json')
  .then(response => response.json())
  .then(products => {
    loadProducts(products);
  })
  .catch(error => console.error("Error loading JSON:", error));

function loadProducts(products) {
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


async function loadNewArrivals() {
  const res = await fetch("/json/best-selling.json");
  const data = await res.json();

  const wrapper = document.getElementById("arrival-wrapper");

  data.forEach(product => {
    wrapper.innerHTML += `
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






