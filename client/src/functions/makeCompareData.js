import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

export const calcTimeOnIcePerGame = (gamesPlayed, TOI) => {
  if (gamesPlayed || TOI === typeof undefined) {
    return "N/A";
  }

  momentDurationFormatSetup(moment);
  const parseMinutesAndSecondsFromTOI = TOI.match(/\d+/g);
  const TOI_GPasSeconds =
    (parseInt(parseMinutesAndSecondsFromTOI[0]) * 60 +
      parseInt(parseMinutesAndSecondsFromTOI[1])) /
    gamesPlayed;
  const duration = moment.duration({ seconds: TOI_GPasSeconds });
  return duration.format("mm:ss");
};

export const makeCompareData = regularSeasonStats => {
  if (!regularSeasonStats) {
    return null;
  }

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
        [
          "TOI/GP",
          regularSeasonStats.timeOnIcePerGame ||
            calcTimeOnIcePerGame(
              regularSeasonStats.games,
              regularSeasonStats.timeOnIce
            )
        ]
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
        ["Shots", regularSeasonStats.shots || "N/A"],
        ["Shot%", regularSeasonStats.shotPct || "N/A"],
        ["Blocks", regularSeasonStats.blocked || "N/A"]
      ],
      evenStrength: [
        [
          "G",
          regularSeasonStats.goals -
            regularSeasonStats.powerPlayGoals -
            regularSeasonStats.shortHandedGoals || "N/A"
        ],
        [
          "P",
          regularSeasonStats.points -
            regularSeasonStats.powerPlayPoints -
            regularSeasonStats.shortHandedPoints || "N/A"
        ],
        ["TOI", regularSeasonStats.evenTimeOnIce || "N/A"],
        [
          "TOI/GP",
          regularSeasonStats.evenTimeOnIcePerGame ||
            calcTimeOnIcePerGame(
              regularSeasonStats.games,
              regularSeasonStats.timeOnIce
            )
        ]
      ],
      powerPlay: [
        ["G", regularSeasonStats.powerPlayGoals || "N/A"],
        ["P", regularSeasonStats.powerPlayPoints || "N/A"],
        ["TOI", regularSeasonStats.powerPlayTimeOnIce || "N/A"],
        [
          "TOI/GP",
          regularSeasonStats.powerPlayTimeOnIcePerGame ||
            calcTimeOnIcePerGame(
              regularSeasonStats.games,
              regularSeasonStats.timeOnIce
            )
        ]
      ],
      shortHanded: [
        ["G", regularSeasonStats.shortHandedGoals || "N/A"],
        ["P", regularSeasonStats.shortHandedPoints || "N/A"],
        ["TOI", regularSeasonStats.shortHandedTimeOnIce || "N/A"],
        [
          "TOI/GP",
          regularSeasonStats.shortHandedTimeOnIcePerGame ||
            calcTimeOnIcePerGame(
              regularSeasonStats.games,
              regularSeasonStats.timeOnIce
            )
        ]
      ],
      other: [
        ["PIM", regularSeasonStats.pim],
        ["Hits", regularSeasonStats.hits || "N/A"],
        ["+/-", regularSeasonStats.plusMinus || "N/A"],
        ["FO%", regularSeasonStats.faceOffPct || "N/A"]
      ]
    };
  }
};
