// Shopping Cart System
let cart = [];

const defaultConfig = {
    restaurant_name: "GW BURGUER",
    slogan: "Sabor que conquista",
    hero_title: "NOSSO CARDÁPIO",
    hero_subtitle: "Conheça nossos deliciosos hambúrgueres e acompanhamentos",
    menu_title: "NOSSOS HAMBÚRGUERES",
    sides_title: "NOSSAS PORÇÕES",
    footer_text:
        "© 2026 GW Burguer. Criado por Marcos Pipper - Programador de Sistemas.",
    burger_1_image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&q=80",
    burger_2_image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop&q=80",
    burger_3_image:
        "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop&q=80",
    burger_4_image:
        "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=300&fit=crop&q=80",
    burger_5_image:
        "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop&q=80",
    burger_6_image:
        "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop&q=80",
    burger_7_image:
        "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop&q=80",
    side_1_image:
        "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop&q=80",
    side_2_image:
        "https://images.unsplash.com/photo-1630431341973-02e1a67e9250?w=400&h=300&fit=crop&q=80",
    side_3_image:
        "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&h=300&fit=crop&q=80",
    drink_1_image: "",
    drink_2_image: "",
    drink_3_image: "",
    drink_4_image: "",
    drink_5_image: "",
    background_color: "#FFF8E7",
    text_color: "#1F2937",
    primary_color: "#EA580C",
    button_color: "#EA580C",
    accent_color: "#DC2626",
};

function addToCart(name, price) {
    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    updateCartDisplay();
    showToast(`${name} adicionado ao carrinho! 🛒`);
}

function removeFromCart(name) {
    const itemIndex = cart.findIndex((item) => item.name === name);

    if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
    }

    updateCartDisplay();
}

function clearCart() {
    cart = [];
    updateCartDisplay();
}

function calculateTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function updateCartDisplay() {
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartEmpty = document.getElementById("cart-empty");
    const cartContent = document.getElementById("cart-content");

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? "flex" : "none";
    }

    if (cart.length === 0) {
        if (cartEmpty) cartEmpty.style.display = "block";
        if (cartContent) cartContent.style.display = "none";
    } else {
        if (cartEmpty) cartEmpty.style.display = "none";
        if (cartContent) cartContent.style.display = "block";

        if (cartItems) {
            cartItems.innerHTML = cart
                .map(
                    (item) => `
<div class="flex items-center justify-between py-3 border-b border-gray-200">
<div class="flex-1">
<p class="font-semibold text-gray-800">${item.name}</p>
<p class="text-sm text-gray-600">R$ ${item.price.toFixed(2)}</p>
</div>
<div class="flex items-center gap-3">
<button onclick="removeFromCart('${item.name}')" class="w-7 h-7 bg-red-100 text-red-600 rounded-full font-bold hover:bg-red-200 transition-colors">-</button>
<span class="font-bold text-gray-800 min-w-[20px] text-center">${item.quantity}</span>
<button onclick="addToCart('${item.name}', ${item.price})" class="w-7 h-7 bg-green-100 text-green-600 rounded-full font-bold hover:bg-green-200 transition-colors">+</button>
</div>
</div>
`,
                )
                .join("");
        }

        if (cartTotal) {
            cartTotal.textContent = `R$ ${calculateTotal().toFixed(2)}`;
        }
    }
}

function toggleCart() {
    const cartModal = document.getElementById("cart-modal");
    if (cartModal) {
        cartModal.classList.toggle("hidden");
    }
}

function sendWhatsAppOrder() {
    if (cart.length === 0) {
        showToast("Adicione itens ao carrinho primeiro! 🛒");
        return;
    }

    let message = "🍔 *PEDIDO GW BURGUER* 🍔%0A%0A";

    cart.forEach((item) => {
        message += `${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}%0A`;
    });

    message += `%0A*TOTAL: R$ ${calculateTotal().toFixed(2)}*`;

    const whatsappUrl = `https://wa.me/5541995656839?text=${message}`;
    window.open(whatsappUrl, "_blank", "noopener noreferrer");

    clearCart();
    toggleCart();
    showToast("Redirecionando para WhatsApp... 📱");
}

function showToast(message) {
    const existingToast = document.getElementById("toast");
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement("div");
    toast.id = "toast";
    toast.className =
        "fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg z-50 font-semibold";
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transition = "opacity 0.3s ease";
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

async function onConfigChange(config) {
    // Update text content
    document.getElementById("nav-title").textContent =
        config.restaurant_name || defaultConfig.restaurant_name;
    document.getElementById("nav-slogan").textContent =
        config.slogan || defaultConfig.slogan;
    document.getElementById("hero-title").innerHTML =
        `NOSSO<br/><span class="gradient-text">${config.hero_title || defaultConfig.hero_title}</span>`;
    document.getElementById("hero-subtitle").textContent =
        config.hero_subtitle || defaultConfig.hero_subtitle;
    document.getElementById("menu-title").textContent =
        config.menu_title || defaultConfig.menu_title;
    document.getElementById("sides-title").textContent =
        config.sides_title || defaultConfig.sides_title;
    document.getElementById("footer-text").textContent =
        config.footer_text || defaultConfig.footer_text;
    document.getElementById("footer-name").textContent =
        config.restaurant_name || defaultConfig.restaurant_name;

    // Update burger images
    for (let i = 1; i <= 7; i++) {
        const img = document.getElementById(`burger-${i}-img`);
        const url =
            config[`burger_${i}_image`] || defaultConfig[`burger_${i}_image`];
        if (img && url) img.src = url;
    }

    // Update side images
    for (let i = 1; i <= 3; i++) {
        const img = document.getElementById(`side-${i}-img`);
        const url =
            config[`side_${i}_image`] || defaultConfig[`side_${i}_image`];
        if (img && url) img.src = url;
    }

    // Update drink images
    for (let i = 1; i <= 5; i++) {
        const img = document.getElementById(`drink-${i}-img`);
        const emoji = img.nextElementSibling;
        const url =
            config[`drink_${i}_image`] || defaultConfig[`drink_${i}_image`];

        if (url && url.trim() !== "") {
            img.src = url;
            img.classList.remove("hidden");
            if (emoji) emoji.style.display = "none";
        } else {
            img.classList.add("hidden");
            if (emoji) emoji.style.display = "block";
        }
    }

    // Apply colors
    const bgColor = config.background_color || defaultConfig.background_color;
    const textColor = config.text_color || defaultConfig.text_color;
    const primaryColor = config.primary_color || defaultConfig.primary_color;

    document.getElementById("app-wrapper").style.background =
        `linear-gradient(135deg, ${bgColor} 0%, #FFE5B4 50%, ${bgColor} 100%)`;

    // Update gradient text colors
    const gradientTexts = document.querySelectorAll(".gradient-text");
    gradientTexts.forEach((el) => {
        el.style.background = `linear-gradient(135deg, ${primaryColor} 0%, #DC2626 100%)`;
        el.style.webkitBackgroundClip = "text";
        el.style.webkitTextFillColor = "transparent";
        el.style.backgroundClip = "text";
    });
}

function mapToCapabilities(config) {
    return {
        recolorables: [
            {
                get: () =>
                    config.background_color || defaultConfig.background_color,
                set: (value) => {
                    config.background_color = value;
                    if (window.elementSdk)
                        window.elementSdk.setConfig({
                            background_color: value,
                        });
                },
            },
            {
                get: () => config.text_color || defaultConfig.text_color,
                set: (value) => {
                    config.text_color = value;
                    if (window.elementSdk)
                        window.elementSdk.setConfig({
                            text_color: value,
                        });
                },
            },
            {
                get: () => config.primary_color || defaultConfig.primary_color,
                set: (value) => {
                    config.primary_color = value;
                    if (window.elementSdk)
                        window.elementSdk.setConfig({
                            primary_color: value,
                        });
                },
            },
        ],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined,
    };
}

function mapToEditPanelValues(config) {
    return new Map([
        [
            "restaurant_name",
            config.restaurant_name || defaultConfig.restaurant_name,
        ],
        ["slogan", config.slogan || defaultConfig.slogan],
        ["hero_title", config.hero_title || defaultConfig.hero_title],
        ["hero_subtitle", config.hero_subtitle || defaultConfig.hero_subtitle],
        ["menu_title", config.menu_title || defaultConfig.menu_title],
        ["sides_title", config.sides_title || defaultConfig.sides_title],
        ["footer_text", config.footer_text || defaultConfig.footer_text],
        [
            "burger_1_image",
            config.burger_1_image || defaultConfig.burger_1_image,
        ],
        [
            "burger_2_image",
            config.burger_2_image || defaultConfig.burger_2_image,
        ],
        [
            "burger_3_image",
            config.burger_3_image || defaultConfig.burger_3_image,
        ],
        [
            "burger_4_image",
            config.burger_4_image || defaultConfig.burger_4_image,
        ],
        [
            "burger_5_image",
            config.burger_5_image || defaultConfig.burger_5_image,
        ],
        [
            "burger_6_image",
            config.burger_6_image || defaultConfig.burger_6_image,
        ],
        [
            "burger_7_image",
            config.burger_7_image || defaultConfig.burger_7_image,
        ],
        ["side_1_image", config.side_1_image || defaultConfig.side_1_image],
        ["side_2_image", config.side_2_image || defaultConfig.side_2_image],
        ["side_3_image", config.side_3_image || defaultConfig.side_3_image],
        ["drink_1_image", config.drink_1_image || defaultConfig.drink_1_image],
        ["drink_2_image", config.drink_2_image || defaultConfig.drink_2_image],
        ["drink_3_image", config.drink_3_image || defaultConfig.drink_3_image],
        ["drink_4_image", config.drink_4_image || defaultConfig.drink_4_image],
        ["drink_5_image", config.drink_5_image || defaultConfig.drink_5_image],
    ]);
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

// Initialize SDK
if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues,
    });
}

(function () {
    function c() {
        var b = a.contentDocument || a.contentWindow.document;
        if (b) {
            var d = b.createElement("script");
            d.innerHTML =
                "window.__CF$cv$params={r:'9bf7cdafb0b00227',t:'MTc2ODY3MzM2NC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
            b.getElementsByTagName("head")[0].appendChild(d);
        }
    }
    if (document.body) {
        var a = document.createElement("iframe");
        a.height = 1;
        a.width = 1;
        a.style.position = "absolute";
        a.style.top = 0;
        a.style.left = 0;
        a.style.border = "none";
        a.style.visibility = "hidden";
        document.body.appendChild(a);
        if ("loading" !== document.readyState) c();
        else if (window.addEventListener)
            document.addEventListener("DOMContentLoaded", c);
        else {
            var e = document.onreadystatechange || function () {};
            document.onreadystatechange = function (b) {
                e(b);
                "loading" !== document.readyState &&
                    ((document.onreadystatechange = e), c());
            };
        }
    }
})();
