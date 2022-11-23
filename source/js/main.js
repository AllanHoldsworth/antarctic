import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------
  const mapNojs = document.querySelector('.contacts__map--nojs');
  mapNojs.classList.remove('contacts__map--nojs');
  const mediaQuery = window.matchMedia('(max-width: 767px)');
  const overlay = document.querySelector('.overlay');

  mediaQuery.addEventListener('change', () => {
    if (!mediaQuery.matches) {
      closeMenu();
    }
  });

  const anchors = document.querySelectorAll('a[href*="#anchor"]');
  if (anchors) {
    for (let anchor of anchors) {
      anchor.addEventListener('click', (evt) => {
        evt.preventDefault();
        if (navMain.classList.contains('header__nav--opened')) {
          closeMenu();
        }
        const blockID = anchor.getAttribute('href');
        document.querySelector('' + blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    }
  }

  // mobile menu

  let navMain = document.querySelector('.header__nav');
  let navToggle = document.querySelector('.header__menu-button');

  function closeMenu() {
    navMain.classList.remove('header__nav--opened');
    navMain.classList.add('header__nav--closed');
    overlay.style.display = 'none';
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
  }

  if (navToggle && navMain) {
    navMain.classList.remove('header__nav--nojs');
    navToggle.addEventListener('click', function () {
      if (navMain.classList.contains('header__nav--closed')) {
        navMain.classList.remove('header__nav--closed');
        navMain.classList.add('header__nav--opened');
        overlay.style.display = 'block';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${window.scrollY}px`;
        overlay.addEventListener('click', closeMenu, {once: true});
      } else {
        closeMenu();
      }
    });
  }

  iosVhFix();

  function initMap() {
    let map = new ymaps.Map('map', {
      center: [59.937635, 30.322618],
      zoom: 17,
    });

    let pin = new ymaps.Placemark([59.937635, 30.322618], {}, {
      iconLayout: 'default#image',
      iconImageHref: './img/sprite/pin.svg',
      iconImageSize: [18, 22],
      iconImageOffset: [0, 0],
    });

    map.geoObjects.add(pin);
  }

  ymaps.ready(initMap);

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
