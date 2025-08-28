// script.js

// Функция для создания чернильных капель
function createInkDrops() {
    const inkDropsContainer = document.querySelector('.ink-drops');
    if (!inkDropsContainer) return;
    
    // Очищаем существующие капли
    inkDropsContainer.innerHTML = '';
    
    // Создаем 15 капель
    for (let i = 0; i < 15; i++) {
        const drop = document.createElement('div');
        
        // Случайные параметры для капель
        const size = Math.random() * 100 + 50; // 50-150px
        const left = Math.random() * 100; // 0-100%
        const delay = Math.random() * 8; // 0-8s задержка
        const duration = Math.random() * 5 + 8; // 8-13s длительность
        
        // Применяем стили
        drop.style.width = `${size}px`;
        drop.style.height = `${size}px`;
        drop.style.left = `${left}%`;
        drop.style.animationDelay = `${delay}s`;
        drop.style.animationDuration = `${duration}s`;
        
        inkDropsContainer.appendChild(drop);
    }
}

// Функция для инициализации слайдера
function initSlider() {
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!sliderTrack || slides.length === 0) return;
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // Функция для перехода к конкретному слайду
    function goToSlide(index) {
        // Обеспечиваем цикличность слайдера
        if (index >= slideCount) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slideCount - 1;
        } else {
            currentSlide = index;
        }
        
        // Перемещаем слайдер
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    // Обработчики для кнопок
    if (prevBtn) {
        prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    }
    
    // Автопрокрутка слайдера
    let autoSlideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
    
    // Останавливаем автопрокрутку при наведении на слайдер
    const slider = document.querySelector('.slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
        });
    }
    
    // Добавляем обработчики свайпа для мобильных устройств
    let startX = 0;
    let endX = 0;
    
    if (slider) {
        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            clearInterval(autoSlideInterval); // Останавливаем автоскролл при касании
        }, { passive: true });
        
        slider.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        }, { passive: true });
        
        slider.addEventListener('touchend', () => {
            handleSwipe();
            // Перезапускаем автоскролл
            autoSlideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
        }, { passive: true });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50; // Минимальная дистанция свайпа
        
        if (startX - endX > swipeThreshold) {
            // Свайп влево - следующий слайд
            goToSlide(currentSlide + 1);
        } else if (endX - startX > swipeThreshold) {
            // Свайп вправо - предыдущий слайд
            goToSlide(currentSlide - 1);
        }
    }
}

// Функция для инициализации бургер-меню
function initBurgerMenu() {
    const burgerIcons = document.querySelectorAll('.burger-icon');
    const burgerNavs = document.querySelectorAll('.burger-nav');
    
    if (burgerIcons.length === 0 || burgerNavs.length === 0) return;
    
    // Обработчик для каждого бургер-меню на странице
    burgerIcons.forEach((burgerIcon, index) => {
        const burgerNav = burgerNavs[index];
        
        if (!burgerIcon || !burgerNav) return;
        
        // Обработчик клика по иконке бургера
        burgerIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            // Переключаем видимость меню
            const isShowing = burgerNav.classList.contains('show');
            
            // Закрываем все меню
            burgerNavs.forEach(nav => nav.classList.remove('show'));
            
            // Если меню было скрыто - показываем его
            if (!isShowing) {
                burgerNav.classList.add('show');
                document.body.style.overflow = 'hidden'; // Блокируем скролл
            } else {
                document.body.style.overflow = ''; // Разблокируем скролл
            }
        });
        
        // Закрытие меню при клике вне его
        document.addEventListener('click', function(e) {
            if (burgerNav.classList.contains('show') && 
                !burgerNav.contains(e.target) && 
                !burgerIcon.contains(e.target)) {
                burgerNav.classList.remove('show');
                document.body.style.overflow = ''; // Разблокируем скролл
            }
        });
        
        // Предотвращаем закрытие при клике внутри меню
        burgerNav.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Закрытие меню при клике на ссылку
        const navLinks = burgerNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Если ссылка ведет на внешний ресурс, не закрываем меню сразу
                if (link.target === '_blank' || link.href.includes('//')) {
                    return;
                }
                
                burgerNav.classList.remove('show');
                document.body.style.overflow = ''; // Разблокируем скролл
                
                // Для якорных ссылок даем время на скролл перед закрытием
                if (link.href.includes('#')) {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        setTimeout(() => {
                            window.location.href = targetId;
                        }, 300);
                    }
                }
            });
        });
        
        // Закрытие меню при изменении ориентации или размера экрана
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && burgerNav.classList.contains('show')) {
                burgerNav.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    });
}

// Функция для анимации появления секций при скролле
function initScrollAnimations() {
    const sections = document.querySelectorAll('.content-section');
    
    if (sections.length === 0) return;
    
    function checkVisibility() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.85 && !section.classList.contains('visible')) {
                section.classList.add('visible');
            }
        });
    }
    
    // Проверяем видимость при загрузке и скролле
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
    
    // Также проверяем при ресайзе
    window.addEventListener('resize', checkVisibility);
}

// Функция для обработки touch-событий на мобильных устройствах
function initTouchEvents() {
    // Предотвращаем масштабирование при двойном тапе
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

// Основная функция инициализации
document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем все компоненты
    createInkDrops();
    initSlider();
    initBurgerMenu();
    initScrollAnimations();
    initTouchEvents();
    
    // Пересоздаем капли при изменении размера окна
    window.addEventListener('resize', function() {
        createInkDrops();
        
        // Закрываем меню при ресайзе на мобильных
        if (window.innerWidth > 768) {
            const burgerNavs = document.querySelectorAll('.burger-nav');
            burgerNavs.forEach(nav => {
                if (nav.classList.contains('show')) {
                    nav.classList.remove('show');
                    document.body.style.overflow = '';
                }
            });
        }
    });
    
    console.log('Vampi Tattoo - сайт успешно загружен!');
});

// Добавляем поддержку FastClick для устранения задержек на мобильных
document.addEventListener('DOMContentLoaded', function() {
    // Убираем задержку 300ms на мобильных устройствах
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            FastClick.attach(document.body);
        }, false);
    }
});

// Простой полифилл для FastClick
if (!window.FastClick) {
    window.FastClick = {
        attach: function(element) {
            element.addEventListener('touchstart', function(e) {
                // Простая имитация fast click
                if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
                    e.preventDefault();
                    e.target.click();
                }
            });
        }
    };
}