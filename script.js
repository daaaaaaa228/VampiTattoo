// Галерея
const pictures = document.querySelector("#pictures");
const toRight = pictures.querySelector(".toRight");
const toLeft = pictures.querySelector(".toLeft");
let imageIndex = 0;

function loadGalleryPhotos() {
    const photos = JSON.parse(localStorage.getItem('vampiTattooPhotos')) || [
        {src: 'pictures/пример1.jpg', alt: 'Тату пример 1'},
        {src: 'pictures/пример2.jpg', alt: 'Тату пример 2'},
        {src: 'pictures/пример3.jpg', alt: 'Тату пример 3'},
        {src: 'pictures/пример4.jpg', alt: 'Тату пример 4'},
        {src: 'pictures/пример5.jpg', alt: 'Тату пример 5'},
        {src: 'pictures/пример6.jpg', alt: 'Тату пример 6'}
    ];

    pictures.querySelectorAll('.picture').forEach(img => img.remove());
    
    photos.forEach((photo, index) => {
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.alt;
        img.className = 'picture';
        img.id = `i${index + 1}`;
        if (index === 0) img.classList.add('center');
        pictures.insertBefore(img, toRight);
    });
}

loadGalleryPhotos();
const images = pictures.querySelectorAll('.picture');

function show(index) {
    images[imageIndex].classList.remove('center');
    images[index].classList.add("center");
    imageIndex = index;
}

toRight.addEventListener('click', () => {
    let index = imageIndex + 1;
    if (index >= images.length) index = 0;
    show(index);
});

toLeft.addEventListener('click', () => {
    let index = imageIndex - 1;
    if (index < 0) index = images.length - 1;
    show(index);
});

// Админ-панель
const adminLoginBtn = document.getElementById('adminLoginBtn');
const adminPasswordInput = document.getElementById('adminPasswordInput');
const adminError = document.getElementById('adminError');

adminLoginBtn.addEventListener('click', () => {
  if (adminPasswordInput.style.display === 'none') {
    adminPasswordInput.style.display = 'inline-block';
    adminPasswordInput.focus();
    adminError.style.display = 'none';
  } else {
    checkAdminPassword();
  }
});

adminPasswordInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') checkAdminPassword();
});

function checkAdminPassword() {
  const password = '6130';
  if (adminPasswordInput.value === password) {
    localStorage.setItem('adminAuth', 'true');
    window.location.href = 'admin.html';
  } else {
    adminError.textContent = 'Неверный пароль';
    adminError.style.display = 'block';
    adminPasswordInput.value = '';
  }
}