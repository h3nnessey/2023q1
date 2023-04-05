const createCardTemplate = obj => {
  const div = document.createElement('div');
  div.classList.add('pets-cards__item', 'pet-card');
  div.dataset.id = obj.id;
  const cardContent = `
    <div class="pet-card__image-wrapper">
      <img src="${obj.img}" alt="${obj.type}" class="pet-card__image" />
    </div>
    <h3 class="pet-card__title">${obj.name}</h3>
    <button class="pet-card__action">Learn more</button>
  `;
  div.insertAdjacentHTML('afterbegin', cardContent);
  return div;
};

export { createCardTemplate };
