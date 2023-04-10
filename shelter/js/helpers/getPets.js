const getPets = async url => {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    console.log(err.message);
  }
};

export { getPets };
