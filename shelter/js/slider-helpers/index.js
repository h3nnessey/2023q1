const getCardsCount = () => {
  const root = document.querySelector(':root');
  const windowWidth = window.innerWidth;
  if (windowWidth > 1279) {
    root.style.setProperty('--slider-left-initial', '-109%');
    root.style.setProperty('--slider-left-end', '-218%');
    return 3;
  }
  if (windowWidth >= 768 && windowWidth <= 1279) {
    root.style.setProperty('--slider-left-initial', '-107%');
    root.style.setProperty('--slider-left-end', '-214%');
    return 2;
  }
  if (windowWidth <= 767) {
    root.style.setProperty('--slider-left-initial', '-102%');
    root.style.setProperty('--slider-left-end', '-206%');
    return 1;
  }
};

export { getCardsCount };
