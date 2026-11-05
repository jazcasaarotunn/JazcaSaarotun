
// ==========================================
// MY LITTLE GARDEN - JAVASCRIPT
// Cute Soft Cottagecore × Kawaii
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // --------------------------------------
    // 1. TANGGAL DAN JAM
    // --------------------------------------

    const currentDate = document.getElementById("currentDate");
    const currentTime = document.getElementById("currentTime");

    function updateDateTime() {
        const now = new Date();

        if (currentDate) {
            currentDate.textContent = now.toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            });
        }

        if (currentTime) {
            currentTime.textContent = now.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            });
        }
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);


    // --------------------------------------
    // 2. DARK MODE
    // --------------------------------------

    const themeToggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("garden-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    function updateThemeIcon() {
        if (!themeToggle) return;

        const icon = themeToggle.querySelector("i");

        if (icon) {
            icon.className = document.body.classList.contains("dark-mode")
                ? "fa-solid fa-sun"
                : "fa-solid fa-moon";
        }
    }

    updateThemeIcon();

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");

            const isDark = document.body.classList.contains("dark-mode");

            localStorage.setItem(
                "garden-theme",
                isDark ? "dark" : "light"
            );

            updateThemeIcon();
        });
    }


    // --------------------------------------
    // 3. MENU SIDEBAR MOBILE
    // --------------------------------------

    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    function openSidebar() {
        if (!sidebar || !sidebarOverlay) return;

        sidebar.classList.add("active");
        sidebarOverlay.classList.add("show");
        document.body.style.overflow = "hidden";
    }

    function closeSidebar() {
        if (!sidebar || !sidebarOverlay) return;

        sidebar.classList.remove("active");
        sidebarOverlay.classList.remove("show");
        document.body.style.overflow = "";
    }

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            if (sidebar && sidebar.classList.contains("active")) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", closeSidebar);
    }

    // Tutup sidebar ketika menu dipilih
    document.querySelectorAll(".menu-link").forEach(link => {
        link.addEventListener("click", closeSidebar);
    });

    // Tutup sidebar dengan tombol Escape
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeSidebar();
        }
    });


    // --------------------------------------
    // 4. QUOTE HARI INI
    // --------------------------------------

    const dailyQuote = document.getElementById("dailyQuote");
    const newQuote = document.getElementById("newQuote");

    const quotes = [
        "Bloom at your own pace. 🌷",
        "You are growing beautifully, even on quiet days. 🌿",
        "Little steps can lead to lovely places. 🐰",
        "Be gentle with yourself, sweetheart. 🎀",
        "Every day is a new page in your story. 📖",
        "Happiness grows in the little things. 🍓",
        "You deserve a life as lovely as a garden. 🌼",
        "Keep shining, little sunshine! ☀️",
        "Believe in your tiny little dreams. 🦋",
        "Take your time, everything will bloom. 🌸"
    ];

    function showRandomQuote() {
        if (!dailyQuote) return;

        const randomIndex = Math.floor(Math.random() * quotes.length);

        dailyQuote.style.opacity = "0";

        setTimeout(() => {
            dailyQuote.textContent = quotes[randomIndex];
            dailyQuote.style.opacity = "1";
        }, 200);
    }

    if (newQuote) {
        newQuote.addEventListener("click", showRandomQuote);
    }


    // --------------------------------------
    // 5. MENU AKTIF SESUAI HALAMAN
    // --------------------------------------

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".menu-link").forEach(link => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });


    // --------------------------------------
    // 6. ANIMASI SAAT ELEMEN MUNCUL
    // --------------------------------------

    const animatedElements = document.querySelectorAll(
        ".stat-card, .content-card, .hero-card"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        animatedElements.forEach(element => {
            element.classList.add("visible");
        });
    }


    // --------------------------------------
    // 7. UCAPAN BERDASARKAN WAKTU
    // --------------------------------------

    const greeting = document.querySelector(".topbar-greeting");

    if (greeting) {
        const hour = new Date().getHours();

        if (hour >= 4 && hour < 11) {
            greeting.textContent = "Good Morning, Sunshine! ☀️";
        } else if (hour >= 11 && hour < 15) {
            greeting.textContent = "Good Afternoon, Sweetie! 🌼";
        } else if (hour >= 15 && hour < 18) {
            greeting.textContent = "Good Evening, Lovely! 🌷";
        } else {
            greeting.textContent = "Good Night, Dreamer! 🌙";
        }
    }

    console.log("Welcome to My Little Garden! 🌷");
});

