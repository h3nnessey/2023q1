const getPagesAndCardsCount = () => {
  let cardsCount;
  let pagesCount;
  window.addEventListener('resize', e => {
    const petsCards = Array.from(document.querySelectorAll('.pet-card'));
    cardsCount = petsCards.reduce((acc, curr) => {
      const computedStyle = window.getComputedStyle(curr);
      return computedStyle.display !== 'none' ? acc + 1 : acc;
    }, 0);
    switch (cardsCount) {
      case 8: {
        pagesCount = 6;
        break;
      }
      case 6: {
        pagesCount = 8;
        break;
      }
      case 3: {
        pagesCount = 16;
        break;
      }
    }
    console.log(cardsCount, pagesCount);
  });
};

export { getPagesAndCardsCount };
