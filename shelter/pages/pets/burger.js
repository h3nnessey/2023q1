(function () {
  const burgerBtn = document.querySelector('.nav-burger__btn');
  const burgerWrapper = document.querySelector('.nav-burger__wrapper');

  const toggleBurger = () => {
    burgerWrapper.classList.toggle('active');
    burgerBtn.classList.toggle('active');
    document.body.classList.toggle('modal-active');
  };

  burgerBtn.addEventListener('click', toggleBurger);

  burgerWrapper.addEventListener('click', e => {
    const targetClassList = e.target.classList;
    if (
      targetClassList.contains('nav-list__item') ||
      targetClassList.contains('nav-list__link') ||
      targetClassList.contains('nav-burger__wrapper')
    ) {
      toggleBurger();
    }
  });

  window.addEventListener('resize', e => {
    const windowWidth = e.target.innerWidth;
    if (windowWidth >= 768) {
      burgerWrapper.classList.remove('active');
      burgerBtn.classList.remove('active');
      document.body.classList.remove('modal-active');
    }
  });
})();
