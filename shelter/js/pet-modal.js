const modal = document.querySelector('.pet-modal');
const overlay = document.querySelector('.overlay');

const petModal = pet => {
  const button = document.createElement('button');
  button.classList.add('pet-modal__btn');
  button.insertAdjacentHTML('afterbegin', '<span class="pet-modal__btn_icon"></span>');

  const insertMultiplySpans = array => {
    return array.map((item, i) => `<span>${i !== array.length - 1 ? `${item},` : item}</span>`).join('');
  };

  const handleCloseBtnClick = () => {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('modal-active');
  };

  modal.innerHTML = '';
  const modalContent = `
    <div class="pet-modal__image-wrapper">
      <img class="pet-modal__image" src="../../assets/images/modal/${pet.name.toLowerCase()}.png" alt="${pet.type}" />
    </div>
    <div class="pet-modal__text">
      <div class="pet-modal__name-type-breed">
        <h3 class="pet-modal__name">${pet.name}</h3>
        <h4 class="pet-modal__type-breed">
          <span class="pet-modal__type">${pet.type}</span><span>-</span><span class="pet-modal__breed">${
    pet.breed
  }</span>
        </h4>
      </div>
      <p class="pet-modal__description">${pet.description}</p>
      <ul class="pet-modal__about">
        <li class="pet-modal__about-item">
          <span class="pet-modal__about-item_dot"></span>
          <span class="pet-modal__bold-text">Age: </span><span class="pet-modal__age">${pet.age}</span>
        </li>
        <li class="pet-modal__about-item">
          <span class="pet-modal__about-item_dot"></span>
          <span class="pet-modal__bold-text">Inoculations: </span><span class="pet-modal__inoculations">${
            pet.inoculations.length > 1 ? insertMultiplySpans(pet.inoculations) : pet.inoculations
          }</span>
        </li>
        <li class="pet-modal__about-item">
          <span class="pet-modal__about-item_dot"></span>
          <span class="pet-modal__bold-text">Diseases: </span><span class="pet-modal__diseases">${
            pet.diseases.length > 1 ? insertMultiplySpans(pet.diseases) : pet.diseases
          }</span>
        </li>
        <li class="pet-modal__about-item">
          <span class="pet-modal__about-item_dot"></span>
          <span class="pet-modal__bold-text">Parasites: </span><span class="pet-modal__parasites">${
            pet.parasites.length > 1 ? insertMultiplySpans(pet.parasites) : pet.parasites
          }</span>
        </li>
      </ul>
    </div>`;

  button.addEventListener('click', handleCloseBtnClick);
  modal.insertAdjacentElement('afterbegin', button);
  modal.insertAdjacentHTML('beforeend', modalContent);
};

export { petModal };
