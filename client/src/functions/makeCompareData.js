export const makeCompareData = regularSeasonStats => {
  if (regularSeasonStats.saves) {
    return {
      general: [
        ["GP", regularSeasonStats.games],
        ["W", regularSeasonStats.wins],
        ["L", regularSeasonStats.losses],
        ["GAA", regularSeasonStats.goalAgainstAverage.toFixed(2)]
      ],
      saves: [
        ["SA", regularSeasonStats.shotsAgainst],
        ["Saves", regularSeasonStats.saves],
        ["SV%", regularSeasonStats.savePercentage.toFixed(2)]
      ],
      evenStrength: [
        ["Saves", regularSeasonStats.evenSaves],
        ["Shots", regularSeasonStats.evenShots],
        ["SV%", regularSeasonStats.evenStrengthSavePercentage.toFixed(2)]
      ],
      powerPlay: [
        ["Saves", regularSeasonStats.powerPlaySaves],
        ["Shots", regularSeasonStats.powerPlayShots],
        ["SV%", regularSeasonStats.powerPlaySavePercentage.toFixed(2)]
      ],
      shortHanded: [
        ["Saves", regularSeasonStats.shortHandedSaves],
        ["Shots", regularSeasonStats.shortHandedShots],
        ["SV%", regularSeasonStats.shortHandedSavePercentage.toFixed(2)]
      ],
      other: [
        ["SO", regularSeasonStats.shutouts],
        ["OT", regularSeasonStats.ot],
        ["TOI", regularSeasonStats.timeOnIce],
        ["TOI/GP", regularSeasonStats.timeOnIcePerGame]
      ]
    };
  } else {
    return {
      general: [
        ["GP", regularSeasonStats.games],
        ["P", regularSeasonStats.points],
        ["G", regularSeasonStats.goals],
        ["A", regularSeasonStats.assists]
      ],
      shooting: [
        ["Shots", regularSeasonStats.shots],
        ["Shot%", regularSeasonStats.shotPct],
        ["Blocks", regularSeasonStats.blocked]
      ],
      evenStrength: [
        [
          "G",
          regularSeasonStats.goals -
            regularSeasonStats.powerPlayGoals -
            regularSeasonStats.shortHandedGoals
        ],
        [
          "P",
          regularSeasonStats.points -
            regularSeasonStats.powerPlayPoints -
            regularSeasonStats.shortHandedPoints
        ],
        ["TOI", regularSeasonStats.evenTimeOnIce],
        ["TOI/GP", regularSeasonStats.evenTimeOnIcePerGame]
      ],
      powerPlay: [
        ["G", regularSeasonStats.powerPlayGoals],
        ["P", regularSeasonStats.powerPlayPoints],
        ["TOI", regularSeasonStats.powerPlayTimeOnIce],
        ["TOI/GP", regularSeasonStats.powerPlayTimeOnIcePerGame]
      ],
      shortHanded: [
        ["G", regularSeasonStats.shortHandedGoals],
        ["P", regularSeasonStats.shortHandedPoints],
        ["TOI", regularSeasonStats.shortHandedTimeOnIce],
        ["TOI/GP", regularSeasonStats.shortHandedTimeOnIcePerGame]
      ],
      other: [
        ["PIM", regularSeasonStats.pim],
        ["Hits", regularSeasonStats.hits],
        ["+/-", regularSeasonStats.plusMinus],
        ["FO%", regularSeasonStats.faceOffPct]
      ]
    };
  }
};
