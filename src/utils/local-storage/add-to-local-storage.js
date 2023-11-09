const addToLocalStorage = (key, items) => {
  localStorage.setItem(key, JSON.stringify(items));
  return items;
}

export default addToLocalStorage;
