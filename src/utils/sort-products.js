export const sortProducts = (sorting, items) => {
  switch (sorting) {
    case 'price-ascending':
      return [...items].sort((a, b) => a.price - b.price);

    case 'price-descending':
      return [...items].sort((a, b) => b.price - a.price);
  
    default:
      return items;
  }
};
