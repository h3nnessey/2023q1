(function () {
  const burger = document.querySelector('.nav-burger');
  const burgerBtn = document.querySelector('.nav-burger__btn');
  const overlay = document.querySelector('.overlay');

  const toggleBurger = () => {
    overlay.classList.toggle('active');
    burger.classList.toggle('active');
    burgerBtn.classList.toggle('active');
    document.body.classList.toggle('modal-active');
  };
  const handleBurgerClick = e => {
    const targetClassList = e.target.classList;
    if (targetClassList.contains('nav-list__item') || targetClassList.contains('nav-list__link')) {
      toggleBurger();
    }
  };

  const handleWindowResize = e => {
    const windowWidth = e.target.innerWidth;
    if (windowWidth >= 768) {
      overlay.classList.remove('active');
      burger.classList.remove('active');
      burgerBtn.classList.remove('active');
      document.body.classList.remove('modal-active');
    }
  };

  burgerBtn.addEventListener('click', toggleBurger);
  burger.addEventListener('click', handleBurgerClick);
  overlay.addEventListener('click', toggleBurger);
  window.addEventListener('resize', handleWindowResize);
})();
