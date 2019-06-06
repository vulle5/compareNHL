export const parseSearchResult = arrayOfPlayers => {
  try {
    // Matches the state the player is from
    const getState = /\b[A-Z]{2}\b/;
    const getInfo = /[^|"\\]+/g;

    function replacer(player) {
      return player.replace(getState, "").match(getInfo);
    }

    return arrayOfPlayers.map(player => replacer(player));
  } catch (error) {
    return [];
  }
};
