const fetchPets = async () => {
  try {
    const res = await fetch('../../data/pets.json');
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export { fetchPets };
