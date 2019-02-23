export const parseSearchResult = arrayOfPlayers => {
  let newArray = [];
  let newItem;

  arrayOfPlayers.forEach(item => {
    newItem = item.replace(/[|]/g, ", ");
    newArray.push(newItem);
  });

  console.log(newArray, "PARSE");

  return newArray;
};
