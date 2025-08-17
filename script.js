// Галерея работ
document.addEventListener('DOMContentLoaded', function() {
  const pictures = document.querySelector("#pictures");
  const toRight = pictures.querySelector(".toRight");
  const toLeft = pictures.querySelector(".toLeft");
  const images = pictures.querySelectorAll('.picture');
  let currentIndex = 0;

  // Функция показа текущего изображения
  function showImage(index) {
      images.forEach(img => {
          img.classList.remove('center');
          img.style.opacity = '0';
          img.style.transform = 'scale(0.9)';
      });
      
      images[index].classList.add('center');
      images[index].style.opacity = '1';
      images[index].style.transform = 'scale(1.05)';
      currentIndex = index;
  }

  // Обработчики кнопок навигации
  toRight.addEventListener('click', () => {
      let newIndex = currentIndex + 1;
      if (newIndex >= images.length) newIndex = 0;
      showImage(newIndex);
  });

  toLeft.addEventListener('click', () => {
      let newIndex = currentIndex - 1;
      if (newIndex < 0) newIndex = images.length - 1;
      showImage(newIndex);
  });

  // Инициализация - показываем первое изображение
  showImage(0);

  // Анимация появления секций при скролле
  const sections = document.querySelectorAll('.content-section');
  
  function checkScroll() {
      sections.forEach(section => {
          const sectionTop = section.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if (sectionTop < windowHeight - 100) {
              section.classList.add('visible');
          }
      });
  }
  
  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Проверить при загрузке

  // Создаем чернильные капли
  function createInkDrops() {
      const inkContainer = document.querySelector('.ink-drops');
      
      for (let i = 0; i < 5; i++) {
          const drop = document.createElement('div');
          drop.style.position = 'absolute';
          drop.style.width = `${Math.random() * 100 + 50}px`;
          drop.style.height = drop.style.width;
          drop.style.left = `${Math.random() * 100}%`;
          drop.style.background = 'radial-gradient(circle, rgba(255,0,0,0.3) 0%, transparent 70%)';
          drop.style.borderRadius = '50%';
          drop.style.animation = `inkDrop ${Math.random() * 5 + 5}s linear infinite`;
          drop.style.animationDelay = `${Math.random() * 5}s`;
          drop.style.opacity = '0';
          
          inkContainer.appendChild(drop);
      }
  }
  
  createInkDrops();
});