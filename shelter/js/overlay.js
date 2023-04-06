(function () {
  const overlay = document.querySelector('.overlay');
  const modal = document.querySelector('.pet-modal');
  const burger = document.querySelector('.nav-burger');
  const burgerBtn = document.querySelector('.nav-burger__btn');

  const handleOverlayClick = () => {
    overlay.classList.remove('active');
    document.body.classList.remove('modal-active');
    burger.classList.contains('active') && burger.classList.remove('active');
    burgerBtn.classList.contains('active') && burgerBtn.classList.remove('active');
    modal.classList.contains('active') && modal.classList.remove('active');
  };

  overlay.addEventListener('click', handleOverlayClick);
})();
