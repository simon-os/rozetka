const getFromUrlQuery = (name) => {
  const url = new URL(window.location.href);

  let res;
  try {
    res = JSON.parse(url.searchParams.get(name));
  }
  catch (e) {
    console.error(e);
  }
  return res || null;
};

export default getFromUrlQuery;
