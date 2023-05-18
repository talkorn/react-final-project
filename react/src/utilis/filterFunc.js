const filterFunction = (data, searchParams) => {
  if (!data) {
    return;
  }
  let filter = "";
  if (searchParams.filter) {
    filter = searchParams.filter;
  }
  let searchResult = data.filter(
    (card) =>
      card.title.toLowerCase().startsWith(filter.toLowerCase()) ||
      card.bizNumber.toLowerCase().startsWith(filter.toLowerCase())
  );
  return searchResult;
};
export default filterFunction;
