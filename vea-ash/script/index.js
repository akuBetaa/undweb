tailwind.config = {
  theme: {
    extend: {
      colors: {
        background50: "#A1A1A1",
        background100: "#575757",
        background150: "#757575",
        background200: "#4D4D4D",
        background300: "#303030",
        background400: "#2A2A2A",
        background500: "#111111",
        text50: "#FFFFF",
        text100: "#FDE047",
      },
      fontFamily: {
        archivo: ["Archivo Narrow", "sans-serif"],
        berkshire: ["Berkshire Swash", "cursive"],
        bodoni: ["Bodoni Moda", "serif"],
        hanuman: ["Hanuman", "serif"],
        julius: ["Julius Sans One", "sans-serif"],
        lobster: ["Lobster", "cursive"],
        lobsterTwo: ["Lobster Two", "cursive"],
        montserrat: ["Montserrat", "sans-serif"],
        paprika: ["Paprika", "cursive"],
        philosopher: ["Philosopher", "sans-serif"],
        publicSans: ["Public Sans", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
        qwitcher: ["Qwitcher Grypen", "cursive"],
        roboto: ["Roboto", "sans-serif"],
        sono: ["Sono", "sans-serif"],
        tangerine: ["Tangerine", "cursive"],
        workSans: ["Work Sans", "sans-serif"],
      },
    },
  },
};

document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll("img"); // Seleksi semua elemen img

  if ("IntersectionObserver" in window) {
    // Jika browser mendukung IntersectionObserver
    let lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let img = entry.target;
          // Memeriksa jika gambar belum dimuat dan memiliki data-src
          if (img.dataset.src && !img.classList.contains("loaded")) {
            img.src = img.dataset.src; // Ganti src dengan data-src
            img.removeAttribute("data-src"); // Hapus data-src
            img.classList.add("loaded"); // Tandai gambar telah dimuat
            lazyImageObserver.unobserve(img); // Hentikan observasi gambar
          }
        }
      });
    });

    lazyImages.forEach((img) => {
      // Jika gambar tidak memiliki data-src, tetapkan data-src dan kosongkan src-nya
      if (!img.src) {
        img.dataset.src = img.getAttribute("src"); // Simpan src pada data-src
        img.src = ""; // Kosongkan src untuk menunda pemuatan
      }
      lazyImageObserver.observe(img); // Mulai observasi gambar
    });
  } else {
    // Fallback untuk browser yang tidak mendukung IntersectionObserver
    lazyImages.forEach((img) => {
      img.src = img.dataset.src;
    });
  }
});