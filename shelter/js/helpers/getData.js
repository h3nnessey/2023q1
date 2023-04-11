const getData = async url => {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    console.log(err.message);
  }
};

export { getData };
