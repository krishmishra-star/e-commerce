const items = [
  {
    title: "Trendy Shoes",
    subtitle: "Summer Fashion",
    desc: "Big sale up to 30%",
    image: "new/1.jpg",
  },
  {
    title: "Trendy Rings",
    subtitle: "Trending Now",
    desc: "Flat 20% off",
    image: "new/5.jpg",
  },
  {
    title: "Trendy Watches",
    subtitle: "New Arrivals",
    desc: "Exclusive Collection",
    image: "watches/4.jpg",
  },
];

const authBtn = document.getElementById("authBtn");
const authModal = document.getElementById("authModal");
const closeAuth = document.getElementById("closeAuth");

const authTitle = document.getElementById("authTitle");
const authName = document.getElementById("authName");
const authEmail = document.getElementById("authEmail");
const authPass = document.getElementById("authPass");
const authSubmit = document.getElementById("authSubmit");
const toggleAuth = document.getElementById("toggleAuth");

let isLogin = true;

authBtn.addEventListener("click", () => {
  authModal.classList.add("active");
});

closeAuth.addEventListener("click", () => {
  authModal.classList.remove("active");
});

toggleAuth.addEventListener("click", () => {
  isLogin = !isLogin;

  if (isLogin) {
    authTitle.textContent = "Login";
    authName.style.display = "none";
    toggleAuth.innerHTML = `Don't have an account? <span>Sign Up</span>`;
  } else {
    authTitle.textContent = "Sign Up";
    authName.style.display = "block";
    toggleAuth.innerHTML = `Already have an account? <span>Login</span>`;
  }
});

authSubmit.addEventListener("click", () => {
  const name = authName.value;
  const email = authEmail.value;
  const pass = authPass.value;

  if (!email || !pass || (!isLogin && !name)) {
    alert("Fill all fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (isLogin) {
    const user = users.find(u => u.email === email && u.pass === pass);

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert("Login successful");
      authModal.classList.remove("active");
      authBtn.textContent = user.name;
    } else {
      alert("Invalid credentials");
    }

  } else {
    users.push({ name, email, pass });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Account created");
  }
});

//  Search 

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  const products = document.querySelectorAll(".product");
  products.forEach((product) => {
    const name = product.dataset.name.toLowerCase();
     if (name.includes(value)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
  });


const title = document.querySelector(".trend-title");
const sub = document.querySelector(".trend-sub");
const desc = document.querySelector(".trend-desc");
const img = document.querySelector(".trend-image img");
const content = document.querySelector(".trend-content");

let index = 0;

function updateSlider() {
  const current = items[index];

  content.classList.add("fade-out");

  setTimeout(() => {
    title.textContent = current.title;
    sub.textContent = current.subtitle;
    desc.textContent = current.desc;
    img.src = current.image;

    content.classList.remove("fade-out");
  }, 300);
}

updateSlider();

setInterval(() => {
  index++;
  if (index >= items.length) index = 0;
  updateSlider();
}, 3000);


// cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () => {

  let cartcount = document.getElementById("cart-count");
  const toast = document.getElementById("toast");

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 2000);
  }

  const products = document.querySelectorAll(".product");

  products.forEach((product) => {
    const increase = product.querySelector(".increase");
    const decrease = product.querySelector(".decrease");
    const qtyEl = product.querySelector(".qty");

    const name = product.dataset.name;
    const price = parseFloat(product.dataset.price);

    let item = cart.find((p) => p.name === name);
    if (item) {
      qtyEl.textContent = item.quantity;
    }

    increase.addEventListener("click", () => {
      let item = cart.find((p) => p.name === name);

      if (item) {
        item.quantity++;
      } else {
        const imgSrc = product.querySelector("img").src; 
        item = { name, price, quantity: 1, image: imgSrc };
        cart.push(item);
      }

      qtyEl.textContent = item.quantity;
      updateCartCount();
      showToast(`${name} added to cart`);

      product.classList.add("added");
      setTimeout(() => {
        product.classList.remove("added");
      }, 300);
    });

    decrease.addEventListener("click", () => {
      let item = cart.find((p) => p.name === name);

      if (!item) return;

      item.quantity--;

      if (item.quantity <= 0) {
        cart = cart.filter((p) => p.name !== name);
        qtyEl.textContent = 0;
      } else {
        qtyEl.textContent = item.quantity;
      }

      updateCartCount();
    });
  });

  function updateCartCount() {
    let total = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartcount.textContent = total;

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();  
  }

  updateCartCount();
});


// cart sidebar
const cartSidebar = document.getElementById("cartSidebar");
const cartItemsEl = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");

document.getElementById("cartBtn").addEventListener("click", (e) => {
  e.preventDefault();
  cartSidebar.classList.add("active");
  renderCart();
});

document.getElementById("closeCart").addEventListener("click", () => {
  cartSidebar.classList.remove("active");
});

function renderCart() {
  cartItemsEl.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <div style="display:flex; gap:10px; align-items:center;">
        <img src="${item.image}" style="width:45px; height:45px; object-fit:cover; border-radius:6px;">
        
        <div>
          <p style="margin:0; font-size:14px;">${item.name}</p>

          <div class="side-qty">
            <button class="minus" data-index="${index}">-</button>
            <span>${item.quantity}</span>
            <button class="plus" data-index="${index}">+</button>
          </div>
        </div>
      </div>

      <div style="text-align:right;">
        <p style="margin:0;">₹${item.price * item.quantity}</p>
        <button class="remove" data-index="${index}" style="font-size:12px;">Remove</button>
      </div>
    `;

    cartItemsEl.appendChild(div);
  });

  totalPriceEl.textContent = total;
}
cartItemsEl.addEventListener("click", (e) => {
  const index = e.target.dataset.index;
  
  if(!index) return;

  if (e.target.classList.contains("plus")) {
    cart[index].quantity++;
  }

  if (e.target.classList.contains("minus")) {
    cart[index].quantity--;

    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
  }

  if (e.target.classList.contains("remove")) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
});
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const orderItems = document.getElementById("orderItems");
const finalTotal = document.getElementById("finalTotal");

checkoutBtn.addEventListener("click", () => {
  checkoutModal.classList.add("active");
  renderCheckout();
});

document.getElementById("closeCheckout").addEventListener("click", () => {
  checkoutModal.classList.remove("active");
});


function renderCheckout() {
  orderItems.innerHTML = "";

  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.innerHTML = `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`;
    orderItems.appendChild(div);
  });

  finalTotal.textContent = total;
}

document.getElementById("placeOrder").addEventListener("click", () => {
  const name = document.getElementById("userName").value;
  const address = document.getElementById("userAddress").value;

  if (!name || !address) {
    alert("Please fill all details");
    return;
  }

  alert("Order placed successfully!");

  cart = [];
  localStorage.removeItem("cart");

  updateCartCount();
  renderCart();

  checkoutModal.classList.remove("active");
});

// form data
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.querySelector('input[placeholder="Name"]').value;
  const email = document.querySelector('input[placeholder="Email"]').value;
  const subject = document.querySelector('input[placeholder="Subject"]').value;
  const review = document.querySelector("textarea").value;

  const formData = {
    name,
    email,
    subject,
    review,
  };

  let reviews = localStorage.getItem("reviews");
  reviews = reviews ? JSON.parse(reviews) : [];

  reviews.push(formData);

  localStorage.setItem("reviews", JSON.stringify(reviews));

  form.reset();
});