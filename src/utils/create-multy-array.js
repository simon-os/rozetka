const createMultyArray = (items, subArrayMaxLength) => {
  const multyArray = [];

  let currentChunk = [];
  for(let i = 1; i <= items.length; i++) {
    currentChunk.push(items[i - 1]);
    
    if (i % subArrayMaxLength === 0 || i === items.length) {
      multyArray.push(currentChunk);
      currentChunk = [];
    }
  }

  return multyArray;
};

export default createMultyArray;
