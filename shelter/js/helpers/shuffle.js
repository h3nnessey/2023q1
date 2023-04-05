const shuffle = iterable => {
  const iterableCopy = [...iterable];
  return iterableCopy.sort((a, b) => 0.5 - Math.random());
};

export { shuffle };
