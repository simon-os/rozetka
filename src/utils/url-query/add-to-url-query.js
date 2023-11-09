const addToUrlQuery = (name, items) => {
  const itemsJSON = JSON.stringify(items);
  const url = new URL(window.location.href);
  url.searchParams.set(name, itemsJSON); 

  const state = {
    title: `Add ${name} query`,
    url: url.href
  };
  window.history.replaceState(state, state.title, url);

  return items;
};

export default addToUrlQuery;
