import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { get } from 'lodash';

const calcTimeOnIcePerGame = (gamesPlayed, TOI) => {
  if (!TOI) {
    return 'N/A';
  }

  momentDurationFormatSetup(moment);
  const parseMinutesAndSecondsFromTOI = TOI.match(/\d+/g);
  const TOI_GPasSeconds =
    (parseInt(parseMinutesAndSecondsFromTOI[0]) * 60 +
      parseInt(parseMinutesAndSecondsFromTOI[1])) /
    gamesPlayed;
  const duration = moment.duration({ seconds: TOI_GPasSeconds });
  return duration.format('mm:ss', {
    trim: false
  });
};

export const makeCompareData = regularSeasonStats => {
  if (!regularSeasonStats) {
    return null;
  }

  if (regularSeasonStats.goalsAgainst) {
    return {
      general: [
        ['GP', regularSeasonStats.games],
        ['W', regularSeasonStats.wins],
        ['L', regularSeasonStats.losses],
        ['GAA', get(regularSeasonStats, 'goalAgainstAverage', 0).toFixed(2)]
      ],
      saves: [
        ['SA', regularSeasonStats.shotsAgainst || 'N/A'],
        ['Saves', regularSeasonStats.saves || 'N/A'],
        ['SV%', get(regularSeasonStats, 'savePercentage', 0).toFixed(2)]
      ],
      evenStrength: [
        ['Saves', regularSeasonStats.evenSaves || 'N/A'],
        ['Shots', regularSeasonStats.evenShots || 'N/A'],
        [
          'SV%',
          get(regularSeasonStats, 'evenStrengthSavePercentage', 0).toFixed(2)
        ]
      ],
      powerPlay: [
        ['Saves', regularSeasonStats.powerPlaySaves || 'N/A'],
        ['Shots', regularSeasonStats.powerPlayShots || 'N/A'],
        [
          'SV%',
          get(regularSeasonStats, 'powerPlaySavePercentage', 0).toFixed(2)
        ]
      ],
      shortHanded: [
        ['Saves', regularSeasonStats.shortHandedSaves || 'N/A'],
        ['Shots', regularSeasonStats.shortHandedShots || 'N/A'],
        [
          'SV%',
          get(regularSeasonStats, 'shortHandedSavePercentage', 0).toFixed(2)
        ]
      ],
      other: [
        ['SO', regularSeasonStats.shutouts],
        ['OT', regularSeasonStats.ot || 'N/A'],
        ['TOI', regularSeasonStats.timeOnIce],
        [
          'TOI/GP',
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
        ['GP', regularSeasonStats.games],
        ['P', regularSeasonStats.points],
        ['G', regularSeasonStats.goals],
        ['A', regularSeasonStats.assists]
      ],
      shooting: [
        ['Shots', regularSeasonStats.shots || 'N/A'],
        ['Shot%', regularSeasonStats.shotPct || 'N/A'],
        ['Blocks', regularSeasonStats.blocked || 'N/A']
      ],
      evenStrength: [
        [
          'G',
          regularSeasonStats.goals -
            regularSeasonStats.powerPlayGoals -
            regularSeasonStats.shortHandedGoals || '0'
        ],
        [
          'P',
          regularSeasonStats.points -
            regularSeasonStats.powerPlayPoints -
            regularSeasonStats.shortHandedPoints || '0'
        ],
        ['TOI', regularSeasonStats.evenTimeOnIce || 'N/A'],
        [
          'TOI/GP',
          regularSeasonStats.evenTimeOnIcePerGame ||
            calcTimeOnIcePerGame(
              regularSeasonStats.games,
              regularSeasonStats.timeOnIce
            )
        ]
      ],
      powerPlay: [
        ['G', regularSeasonStats.powerPlayGoals || '0'],
        ['P', regularSeasonStats.powerPlayPoints || '0'],
        ['TOI', regularSeasonStats.powerPlayTimeOnIce || 'N/A'],
        [
          'TOI/GP',
          regularSeasonStats.powerPlayTimeOnIcePerGame ||
            calcTimeOnIcePerGame(
              regularSeasonStats.games,
              regularSeasonStats.powerPlayTimeOnIce
            )
        ]
      ],
      shortHanded: [
        ['G', regularSeasonStats.shortHandedGoals || '0'],
        ['P', regularSeasonStats.shortHandedPoints || '0'],
        ['TOI', regularSeasonStats.shortHandedTimeOnIce || 'N/A'],
        [
          'TOI/GP',
          regularSeasonStats.shortHandedTimeOnIcePerGame ||
            calcTimeOnIcePerGame(
              regularSeasonStats.games,
              regularSeasonStats.shortHandedTimeOnIce
            )
        ]
      ],
      other: [
        ['PIM', regularSeasonStats.pim],
        ['Hits', regularSeasonStats.hits || 'N/A'],
        ['+/-', `(${regularSeasonStats.plusMinus})` || 'N/A'],
        ['FO%', regularSeasonStats.faceOffPct || 'N/A']
      ]
    };
  }
};
