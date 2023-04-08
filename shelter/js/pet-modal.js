// import pets from '../data/pets.json' assert { type: 'json' };
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
  const { petId, name, img, type, breed, description, age, inoculations, diseases, parasites } = pets.find(
    item => item.id === id
  );

  const handleCloseBtnClick = () => {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('modal-active');
  };

  modalImage.src = `../../assets/images/modal/${name.toLowerCase()}.png`;
  modalImage.alt = type;
  modalPetName.textContent = name;
  modalPetType.textContent = type;
  modalPetBreed.textContent = breed;
  modalPetDescription.textContent = description;
  modalPetAge.textContent = age;
  modalPetInoculations.textContent = inoculations;
  modalPetDiseases.textContent = diseases;
  modalPetParasites.textContent = parasites;

  closeBtn.addEventListener('click', handleCloseBtnClick);
};

export { petModal };
