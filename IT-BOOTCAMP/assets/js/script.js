// Mencegah Inspect Element dan View Source
document.addEventListener("keydown", function (event) {
  if (
    (event.ctrlKey &&
      (event.key === "u" ||
        event.key === "i" ||
        event.key === "j" ||
        event.key === "s")) ||
    (event.ctrlKey &&
      event.shiftKey &&
      (event.key === "I" || event.key === "J" || event.key === "C")) ||
    event.key === "F12"
  ) {
    event.preventDefault();
    console.log("Inspect Element telah dinonaktifkan!"); // Debugging
  }
});
// Mencegah Klik Kanan
document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});
// Mencegah Drag & Drop pada Semua Gambar
document.addEventListener("dragstart", function (event) {
  event.preventDefault();
});
// Mencegah Klik Kanan pada Gambar Secara Spesifik
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("contextmenu", (event) => event.preventDefault());
});

// NAVBAR
const menuIcon = document.getElementById("menu-icon");
const menuList = document.getElementById("menu-list");

menuIcon.addEventListener("click", () => {
  if (menuList.classList.contains("hidden")) {
    menuList.classList.remove("hidden");
    menuList.style.transform = "translateY(-10px)";
    menuList.style.opacity = "0";

    setTimeout(() => {
      menuList.style.transform = "translateY(0)";
      menuList.style.opacity = "1";
    }, 10);
  } else {
    menuList.style.transform = "translateY(-10px)";
    menuList.style.opacity = "0";

    setTimeout(() => {
      menuList.classList.add("hidden");
    }, 300);
  }
});
document.querySelectorAll("#menu-list a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // Mencegah loncatan instan ke bagian yang diklik

    const targetId = link.getAttribute("href").substring(1); // Mengambil ID tujuan
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Sesuaikan offset agar tidak tertutup navbar
        behavior: "smooth", // Efek transisi scroll
      });
    }

    // Tutup menu setelah diklik di tampilan mobile
    if (window.innerWidth <= 768) {
      menuList.style.transform = "translateY(-10px)";
      menuList.style.opacity = "0";
      setTimeout(() => {
        menuList.classList.add("hidden");
      }, 300);
    }
  });
});

// LIVE HERO SECTION
document.addEventListener("DOMContentLoaded", function () {
  const liveHero = document.querySelector(".live-hero");
  const items = Array.from(document.querySelectorAll(".live-hero .live"));

  // Duplikasi elemen agar animasi berjalan tanpa jeda
  items.forEach((item) => {
    const clone = item.cloneNode(true);
    liveHero.appendChild(clone);
  });
});