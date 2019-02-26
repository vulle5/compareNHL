export const parseSearchResult = arrayOfPlayers => {
  let newArray = [];
  let newItem;
  const getState = /\b[A-Z]{2}\b/;
  const getInfo = /[^|"\\]+/g;

  arrayOfPlayers.forEach(item => {
    newItem = item.replace(getState, "");
    newItem = newItem.match(getInfo);
    newArray.push(newItem);
  });

  return newArray;
};
