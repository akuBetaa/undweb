const imgModal = (() => {
  let currentIndex = 0;
  const images = document.querySelectorAll("img");

  function openModal(clickedImage) {
    currentIndex = Array.from(images).indexOf(clickedImage);
    document.getElementById("modalImage").src = clickedImage.src;
    document.getElementById("imageModal").classList.remove("hidden");
  }

  function closeModal() {
    document.getElementById("imageModal").classList.add("hidden");
  }

  function prevImage() {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    document.getElementById("modalImage").src = images[currentIndex].src;
  }

  function nextImage() {
    currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    document.getElementById("modalImage").src = images[currentIndex].src;
  }

  return {
    openModal,
    closeModal,
    prevImage,
    nextImage,
  };
})();

//COUNTDOWN TIMER
function countDown() {
  // Set the date we're counting down to
  const countDownDate = new Date("Juny 27, 2025 08:30:00").getTime();

  // Update the count down every 1 second
  const x = setInterval(function () {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id
    document.getElementById("days").innerText = days
      .toString()
      .padStart(2, "0");
    document.getElementById("hours").innerText = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").innerText = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").innerText = seconds
      .toString()
      .padStart(2, "0");

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("days").innerText = "00";
      document.getElementById("hours").innerText = "00";
      document.getElementById("minutes").innerText = "00";
      document.getElementById("seconds").innerText = "00";
    }
  }, 1000);
}

countDown();

// Set up the "Save to Calendar" link
function saveToCalendar() {
  const title = "Wedding Saleha & Tito | @flexation.id";
  const startDate = new Date("Juny 27, 2025 08:30:00");
  const endDate = new Date(startDate.getTime() + 1 * 60 * 60 * 1000);

  const startDateISO = startDate.toISOString().replace(/-|:|\.\d+/g, "");
  const endDateISO = endDate.toISOString().replace(/-|:|\.\d+/g, "");

  const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${startDateISO}/${endDateISO}&ctz=UTC`;

  window.open(url, "_blank");
}

document
  .getElementById("save-to-calender")
  .addEventListener("click", saveToCalendar);

//Clipboard
function copyToClipboard(button) {
  const textElement = button.previousElementSibling;
  const textToCopy = textElement.textContent;
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      button.innerHTML = "Teks Disalin!";
      setTimeout(() => {
        button.innerHTML =
          '<i class="fi fi-ss-copy-alt"></i> ' + button.dataset.originalText;
      }, 2000);
    })
    .catch((err) => {
      console.error("Gagal menyalin teks: ", err);
    });
}

// Cover
function closeCover() {
  const coverModal = document.getElementById("cover-modal");
  const mainContent = document.getElementById("main-content");

  coverModal.classList.add("animasi");
  coverModal.addEventListener(
    "transitionend",
    () => {
      coverModal.classList.add("hidden");
      mainContent.classList.remove("hidden");
      setTimeout(() => {
        mainContent.classList.add("transisi");
      }, 10); // Small delay to ensure 'hidden' class is applied before fade-in
    },
    { once: true }
  );
  audio.play();
}

// musik 
document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("audio");
  const rotateButton = document.getElementById("rotateButton");

  // Pastikan file audio siap dimainkan
  audio.preload = "auto"; // Pastikan file dimuat
  audio.volume = 1.0; // Sesuaikan volume default

  function toggleAudio() {
    if (audio.paused) {
      audio.play()
        .then(() => rotateButton.classList.add("spin"))
        .catch((err) => console.warn("Autoplay dicegah:", err));
    } else {
      audio.pause();
      rotateButton.classList.remove("spin");
    }
  }

  // Tunggu klik pertama sebelum mengaktifkan playMusic
  function initPlay() {
    toggleAudio(); // Langsung play setelah klik pertama
    rotateButton.removeEventListener("click", initPlay); // Hapus event listener pertama
    rotateButton.addEventListener("click", toggleAudio); // Pasang event toggle biasa
  }

  rotateButton.addEventListener("click", initPlay);

  // Tombol ESC untuk pause musik
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      audio.pause();
      rotateButton.classList.remove("spin");
    }
  });

  // Tambahkan event listener untuk memastikan audio siap dimainkan
  audio.addEventListener("canplaythrough", () => {
    rotateButton.classList.remove("opacity-50"); // Hapus efek loading (kalau ada)
  });
});