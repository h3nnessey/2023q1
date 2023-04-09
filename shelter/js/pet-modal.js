import pets from '../data/pets.js';
// refactor this shit

const modal = document.querySelector('.pet-modal');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.pet-modal__btn');
const modalImage = document.querySelector('.pet-modal__image');
const modalPetName = document.querySelector('.pet-modal__name');
const modalPetType = document.querySelector('.pet-modal__type');
const modalPetBreed = document.querySelector('.pet-modal__breed');
const modalPetDescription = document.querySelector('.pet-modal__description');
const modalPetAge = document.querySelector('.pet-modal__age');
const modalPetInoculations = document.querySelector('.pet-modal__inoculations');
const modalPetDiseases = document.querySelector('.pet-modal__diseases');
const modalPetParasites = document.querySelector('.pet-modal__parasites');

const petModal = id => {
  const pet = pets.find(item => item.id === id);

  const handleCloseBtnClick = () => {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('modal-active');
  };

  const insertMultiplySpans = array => {
    return array.map((item, i) => `<span>${i !== array.length - 1 ? `${item},` : item}</span>`).join('');
  };

  modalImage.src = `../../assets/images/modal/${pet.name.toLowerCase()}.png`;
  modalImage.alt = pet.type;
  modalPetName.textContent = pet.name;
  modalPetType.textContent = pet.type;
  modalPetBreed.textContent = pet.breed;
  modalPetDescription.textContent = pet.description;
  modalPetAge.textContent = pet.age;
  modalPetInoculations.innerHTML =
    pet.inoculations.length > 1 ? insertMultiplySpans(pet.inoculations) : pet.inoculations;
  modalPetDiseases.innerHTML = pet.diseases.length > 1 ? insertMultiplySpans(pet.diseases) : pet.diseases;
  modalPetParasites.innerHTML = pet.parasites.length > 1 ? insertMultiplySpans(pet.parasites) : pet.parasites;

  closeBtn.addEventListener('click', handleCloseBtnClick);
};

export { petModal };
