document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.slider');
  const track = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  let currentIndex = 0;
  const slideCount = slides.length;
  
  // Создаем индикаторы
  const indicatorsContainer = document.createElement('div');
  indicatorsContainer.className = 'slider-indicators';
  slider.appendChild(indicatorsContainer);
  
  for (let i = 0; i < slideCount; i++) {
      const indicator = document.createElement('div');
      indicator.className = 'slider-indicator';
      if (i === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => goToSlide(i));
      indicatorsContainer.appendChild(indicator);
  }
  
  // Функция обновления слайдера
  function updateSlider() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Обновляем индикаторы
      document.querySelectorAll('.slider-indicator').forEach((indicator, index) => {
          if (index === currentIndex) {
              indicator.classList.add('active');
          } else {
              indicator.classList.remove('active');
          }
      });
  }
  
  // Переход к конкретному слайду
  function goToSlide(index) {
      currentIndex = index;
      if (currentIndex >= slideCount) currentIndex = 0;
      if (currentIndex < 0) currentIndex = slideCount - 1;
      updateSlider();
  }
  
  // Кнопка "назад"
  prevBtn.addEventListener('click', () => {
      currentIndex--;
      if (currentIndex < 0) currentIndex = slideCount - 1;
      updateSlider();
  });
  
  // Кнопка "вперед"
  nextBtn.addEventListener('click', () => {
      currentIndex++;
      if (currentIndex >= slideCount) currentIndex = 0;
      updateSlider();
  });
  
  // Автоматическое перелистывание
  let slideInterval = setInterval(() => {
      currentIndex++;
      if (currentIndex >= slideCount) currentIndex = 0;
      updateSlider();
  }, 5000);
  
  // Остановка при наведении
  slider.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
  });
  
  slider.addEventListener('mouseleave', () => {
      slideInterval = setInterval(() => {
          currentIndex++;
          if (currentIndex >= slideCount) currentIndex = 0;
          updateSlider();
      }, 5000);
  });
  
  // Свайп для мобильных устройств
  let touchStartX = 0;
  let touchEndX = 0;
  
  track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
  }, {passive: true});
  
  track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
  }, {passive: true});
  
  function handleSwipe() {
      if (touchEndX < touchStartX - 50) {
          // Свайп влево - следующий слайд
          currentIndex++;
          if (currentIndex >= slideCount) currentIndex = 0;
      } else if (touchEndX > touchStartX + 50) {
          // Свайп вправо - предыдущий слайд
          currentIndex--;
          if (currentIndex < 0) currentIndex = slideCount - 1;
      }
      updateSlider();
  }
});