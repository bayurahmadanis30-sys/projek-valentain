document.addEventListener("DOMContentLoaded", function () {
  // Background Love yang terus muncul
  createFloatingLoves();

  // Music Player
  const music = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");
  const musicIcon = document.querySelector(".music-icon");
  let isPlaying = false;

  // Tombol NO yang interaktif
  const noBtn = document.getElementById("noBtn");
  const noMessage = document.getElementById("noMessage");
  let noClickCount = 0;

  // Coba autoplay musik
  music.play().catch((e) => {
    console.log("Autoplay dicegah browser. Klik tombol musik untuk memutar.");
  });

  // Toggle musik
  musicToggle.addEventListener("click", function () {
    if (isPlaying) {
      music.pause();
      musicIcon.textContent = "🔈";
    } else {
      music.play();
      musicIcon.textContent = "🔊";
    }
    isPlaying = !isPlaying;
  });

  music
    .play()
    .then(() => {
      console.log("Musik berjalan otomatis");
      if (muteBtn) muteBtn.innerHTML = "🔊";
    })
    .catch((error) => {
      console.log("Autoplay dicegah browser");
      if (muteBtn) muteBtn.innerHTML = "🔈";

      // Fallback: play setelah user klik
      document.body.addEventListener(
        "click",
        function playOnClick() {
          music.play();
          if (muteBtn) muteBtn.innerHTML = "🔊";
          document.body.removeEventListener("click", playOnClick);
        },
        { once: true },
      );
    });

  // Tombol NO interaktif
  if (noBtn) {
    noBtn.addEventListener("click", function () {
      noClickCount++;

      if (noClickCount === 1) {
        noMessage.textContent = "Please say YES! 🥺";
        noBtn.style.transform =
          "translateX(" + (Math.random() * 50 - 25) + "px)";
      } else if (noClickCount === 2) {
        noMessage.textContent = "Yaaa please say YES! 😢";
        noBtn.style.transform =
          "translateX(" +
          (Math.random() * 100 - 50) +
          "px) translateY(" +
          Math.random() * 50 +
          "px)";
      } else if (noClickCount >= 3) {
        noMessage.textContent = "OK OK! ILL SAY YES! ❤️";
        noBtn.style.display = "none";
        setTimeout(() => {
          nextPage(2);
        }, 1000);
      }
    });
  }

  if (berhenti) {
    berhenti.addEventListener("click", function () {
      noClickCount++;

      if (noClickCount === 1) {
        noMessage.textContent = "Please say YES! 🥺";
        berhenti.style.transform =
          "translateX(" + (Math.random() * 50 - 25) + "px)";
      } else if (noClickCount === 2) {
        noMessage.textContent = "Yaaa please say YES! 😢";
        berhenti.style.transform =
          "translateX(" +
          (Math.random() * 100 - 50) +
          "px) translateY(" +
          Math.random() * 50 +
          "px)";
      } else if (noClickCount >= 3) {
        noMessage.textContent = "OK OK! ILL SAY YES! ❤️";
        berhenti.style.display = "none";
        setTimeout(() => {
          nextPage(2);
        }, 1000);
      }
    });
  }

  // Fungsi untuk membuat love background
  function createFloatingLoves() {
    const bg = document.getElementById("loveBackground");
    const loveSymbols = ["❤️", "💕", "💖", "💗", "💓", "💘", "💝"];

    setInterval(() => {
      const love = document.createElement("span");
      love.innerHTML =
        loveSymbols[Math.floor(Math.random() * loveSymbols.length)];
      love.style.left = Math.random() * 100 + "%";
      love.style.fontSize = Math.random() * 30 + 20 + "px";
      love.style.animationDuration = Math.random() * 5 + 5 + "s";
      love.style.opacity = Math.random() * 0.5 + 0.2;
      bg.appendChild(love);

      // Hapus setelah animasi selesai
      setTimeout(() => {
        love.remove();
      }, 10000);
    }, 300);
  }
});

// Fungsi untuk pindah halaman
function nextPage(pageNumber) {
  // Sembunyikan semua halaman
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  // Tampilkan halaman yang dituju
  document.getElementById("page" + pageNumber).classList.add("active");

  // Efek confetti saat pindah ke halaman tertentu
  if (pageNumber === 2) {
    createConfetti();
  } else if (pageNumber === 5) {
    createConfetti();
    createConfetti();
  }
}

// Fungsi restart
function restart() {
  // Reset ke halaman 1
  nextPage(1);

  // Reset tombol NO
  const noBtn = document.getElementById("noBtn");
  const noMessage = document.getElementById("noMessage");
  if (noBtn) {
    noBtn.style.display = "inline-block";
    noBtn.style.transform = "none";
    noMessage.textContent = "";
  }
}

// Fungsi confetti
function createConfetti() {
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.style.position = "fixed";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = -10 + "px";
    confetti.style.width = "10px";
    confetti.style.height = "10px";
    confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.borderRadius = "50%";
    confetti.style.pointerEvents = "none";
    confetti.style.zIndex = "9999";
    confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}

// Tambahkan animasi fall
const style = document.createElement("style");
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);
