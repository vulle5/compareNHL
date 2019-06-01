import Player from "../models/Player";

export const genPlayer = ( playerStats ) => {

  const player = new Player(
    playerStats.id,
    playerStats.fullName || "",
    playerStats.link,
    playerStats.firstName,
    playerStats.lastName,
    playerStats.primaryNumber,
    playerStats.birthDate,
    playerStats.currentAge,
    playerStats.birthCity,
    playerStats.birthCountry,
    playerStats.nationality,
    playerStats.height,
    playerStats.weight,
    playerStats.active,
    playerStats.alternateCaptain,
    playerStats.captain,
    playerStats.rookie,
    playerStats.shootsCatches,
    playerStats.rosterStatus,
    playerStats.currentTeam,
    playerStats.primaryPosition,
    playerStats.stats || ""
  );

  return player

}