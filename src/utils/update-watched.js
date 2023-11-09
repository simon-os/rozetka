const updateWatched = (items, payload, max = 20) => {
  let newItems = [...items];
  const idx = newItems.indexOf(payload);
  
  (idx !== -1) && newItems.splice(idx, 1);
  newItems = [payload, ...newItems];

  (newItems.length > max) && newItems.pop();
  return newItems;
};

export default updateWatched;
