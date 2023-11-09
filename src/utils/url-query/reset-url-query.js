const resetUrlQuery = () => {
  const url = new URL(window.location.href);
  url.searchParams.delete('activeFilters'); 
  url.searchParams.delete('priceRange'); 

  const state = {
    title: `Reset query`,
    url: url.href
  };
  window.history.replaceState(state, state.title, url);
};

export default resetUrlQuery;
