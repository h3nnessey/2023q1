const sliceArrayBySize = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    const arr = array.slice(i, i + size);
    result.push(arr);
  }
  return result;
};

export default sliceArrayBySize;
