// 1. Инициализация слайдера Swiper
const testimonialSwiper = new Swiper('.testimonialSwiper', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  speed: 600,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// 2. Логика Бургер-меню
const burgerBtn = document.querySelector("#burgerBtn");
const openNav = document.querySelector("#nav");

burgerBtn.addEventListener("click", function(){
    burgerBtn.classList.toggle('active');
    openNav.classList.toggle("active");
});

const navLinks = document.querySelectorAll("#nav a");
navLinks.forEach(link => {
    link.addEventListener("click", function() {
        burgerBtn.classList.remove("active");
        openNav.classList.remove("active");
    });
});

// 3. Инициализация анимаций AOS
AOS.init({
  duration: 800,
  once: true,
});

// 4. Инициализация маски телефона (IMask)
const phoneInput = document.getElementById('phone');
const phoneMask = IMask(phoneInput, {
  mask: '+{7} (000) 000-00-00'
});

// ==========================================
// 5. НАСТРОЙКИ И ОТПРАВКА В TELEGRAM
// ==========================================
// ⚠️ Впишите сюда ваши данные из Telegram!
const BOT_TOKEN = '9056970410:AAHEyLSPVBXSdp-7h8SncCBfL6_ERNf6UKo';
const CHAT_ID = '7908608097';

const form = document.getElementById('tgForm');
const statusText = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async function (e) {
  e.preventDefault(); // 🛑 Запрещает перезагрузку и прыжок наверх!

  // Проверка ввода всех цифр
  if (!phoneMask.masked.isComplete) {
    statusText.style.color = '#ff6b6b';
    statusText.innerText = 'Введите номер полностью!';
    return;
  }

  const phone = phoneInput.value;

  const message = `
☕️ <b>Новая заявка с сайта!</b>

📞 <b>Телефон:</b> ${phone}
⏰ <b>Время:</b> ${new Date().toLocaleTimeString('ru-RU')}
  `;

  submitBtn.disabled = true;
  submitBtn.innerText = 'Wait...';
  statusText.innerText = '';

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        parse_mode: 'HTML',
        text: message
      })
    });

    const result = await response.json();

    if (result.ok) {
      statusText.style.color = '#4EFA8A';
      statusText.innerText = 'Успешно отправлено!';
      phoneMask.value = ''; // Сброс поля
    } else {
      statusText.style.color = '#ff6b6b';
      statusText.innerText = 'Ошибка: ' + (result.description || 'Не удалось отправить');
    }
  } catch (error) {
    statusText.style.color = '#ff6b6b';
    statusText.innerText = 'Ошибка сети!';
    console.error(error);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerText = 'Subscribe';
  }
});