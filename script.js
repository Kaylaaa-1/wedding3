// Ambil parameter nama tamu dari URL
const urlParams = new URLSearchParams(window.location.search);
const guest = urlParams.get('to') || 'Bapak/Ibu/Saudara/i';
document.getElementById('guestName').textContent = guest;


// Elemen
const openBtn = document.getElementById('openBtn');
const cover = document.getElementById('cover');
const main = document.getElementById('main');
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const musicIcon = document.getElementById('musicIcon');

let isPlaying = false;

// Klik tombol "Lihat Undangan"
openBtn.addEventListener('click', () => {
  cover.classList.add('fade-out');
  setTimeout(() => {
    cover.style.display = 'none';
    main.classList.remove('hidden');
    musicBtn.style.display = 'block';
    music.play();
    isPlaying = true;
  }, 800);
});

// Tambahkan efek fade-out cover
const style = document.createElement('style');
style.innerHTML = `
.fade-out {
  animation: fadeOut 1s ease forwards;
}
@keyframes fadeOut {
  to {
    opacity: 0;
    transform: scale(1.05);
  }
}
`;
document.head.appendChild(style);

// Tombol musik play/pause
musicBtn.addEventListener('click', () => {
  if (isPlaying) {
    music.pause();
    musicIcon.src = "./img/music-off.png"; // mute icon
  } else {
    music.play();
    musicIcon.src = "./img/music-on.png"; // music icon
  }
  isPlaying = !isPlaying;
});

(function () {
  const wrap = document.getElementById('countdown');
  // baca target dari atribut data-target (ISO format)
  const targetString = wrap.dataset.target;
  const targetDate = new Date(targetString);

  const elDays = document.getElementById('days');
  const elHours = document.getElementById('hours');
  const elMinutes = document.getElementById('minutes');
  const elSeconds = document.getElementById('seconds');

  function pad(n) { return String(n).padStart(2, '0'); }

  function update() {
    const now = new Date();
    let diff = Math.max(0, Math.floor((targetDate - now) / 1000)); // seconds

    if (diff <= 0) {
      // event tiba
      elDays.textContent = '0';
      elHours.textContent = '00';
      elMinutes.textContent = '00';
      elSeconds.textContent = '00';
      // optionally you can clearInterval if you don't want repeated updates:
      // clearInterval(timer);
      return;
    }

    const days = Math.floor(diff / 86400);
    diff %= 86400;
    const hours = Math.floor(diff / 3600);
    diff %= 3600;
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;

    elDays.textContent = days;
    elHours.textContent = pad(hours);
    elMinutes.textContent = pad(minutes);
    elSeconds.textContent = pad(seconds);
  }

  // first paint
  update();
  // update every second
  const timer = setInterval(update, 1000);
})();


const showGiftBtn = document.getElementById("showGiftBtn");
const giftBox = document.getElementById("giftBox");

// Tombol tampilkan/hidden gift box
showGiftBtn.addEventListener("click", () => {
  giftBox.classList.toggle("hidden");
});

// Ambil semua tombol copy dan rekening
const copyButtons = document.querySelectorAll(".copy-btn");

copyButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const rekening = btn.parentElement.querySelector(".rekeningNumber").innerText;
    navigator.clipboard.writeText(rekening);

    btn.innerHTML = '<i class="fa-solid fa-check"></i> Disalin!';
    setTimeout(() => {
      btn.innerHTML = '<i class="fa-solid fa-copy"></i> Salin Nomor';
    }, 2000);
  });
});



let hadir = 0;
let tidakHadir = 0;
let totalKomentar = 0;

// Ambil parameter nama dari URL (contoh: ?to=Kayla%20Ananda)
const params = new URLSearchParams(window.location.search);
const namaTamu = params.get("to");

// Jika ada nama tamu di URL, tampilkan di input
if (namaTamu) {
  document.getElementById("nama").value = decodeURIComponent(namaTamu);
} else {
  document.getElementById("nama").value = "Tamu Undangan";
}


function kirimKomentar() {
  const nama = document.getElementById("nama").value.trim();
  const ucapan = document.getElementById("ucapan").value.trim();
  const konfirmasi = document.getElementById("konfirmasi").value;

  if (!nama || !ucapan || !konfirmasi) {
    alert("Harap isi semua kolom sebelum mengirim.");
    return;
  }

