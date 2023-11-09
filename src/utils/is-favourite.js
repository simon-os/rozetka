const isFavourite = (favourites, id) => {
  if (!favourites) return false;
  return favourites.find((f) => f === +id) >= 0;
};

export default isFavourite;
