const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
}

export default getFromLocalStorage;
