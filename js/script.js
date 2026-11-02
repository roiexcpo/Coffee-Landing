// 🛑 [НЕ ТРОГАТЬ] Инициализация слайдера по классу .testimonialSwiper
const testimonialSwiper = new Swiper('.testimonialSwiper', {
  
  slidesPerView: 1,  // 🛠 [МОЖНО МЕНЯТЬ] Показывать ровно 1 карточку за раз
  spaceBetween: 30,  // 🛠 [МОЖНО МЕНЯТЬ] Расстояние между слайдами
  loop: true,        // 🛠 [МОЖНО МЕНЯТЬ] true = бесконечный круг, false = останавливается на конце
  speed: 600,        // 🛠 [МОЖНО МЕНЯТЬ] Скорость анимации смены слайда в миллисекундах (600 = 0.6 сек)

  // 🛑 [НЕ ТРОГАТЬ] Подключение стрелочек навигации
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  
});

const burgerBtn = document.querySelector("#burgerBtn");
const openNav = document.querySelector("#nav");

burgerBtn.addEventListener("click", function(){
    burgerBtn.classList.toggle('active');
    openNav.classList.toggle("active");
});

const navLinks = document.querySelectorAll("#nav a");

// Вешаем клик на каждую ссылку
navLinks.forEach(link => {
    link.addEventListener("click", function() {
        // Убираем класс active у меню и бургера, чтобы меню закрылось
        burgerBtn.classList.remove("active");
        openNav.classList.remove("active");
    });
});

AOS.init({
  duration: 800, // Длительность анимации в миллисекундах (0.8 сек)
  once: true,    // true = анимация срабатывает 1 раз при скролле (не повторится при скролле вверх)
});