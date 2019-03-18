import moment from 'moment';

class Player {
  constructor(
    id,
    fullName,
    link,
    firstName,
    lastName,
    primaryNumber,
    birthDate,
    currentAge,
    birthCity,
    birthCountry,
    nationality,
    height,
    weight,
    active,
    alternateCaptain,
    captain,
    rookie,
    shootsCatches,
    rosterStatus,
    currentTeam,
    primaryPosition
  ) {
    this.id = id;
    this.fullName = fullName;
    this.link = link;
    this.firstName = firstName;
    this.lastName = lastName;
    this.primaryNumber = primaryNumber;
    this.birthDate = birthDate;
    this.currentAge = currentAge || this.calcCurrentAge();
    this.birthCity = birthCity;
    this.birthCountry = birthCountry;
    this.nationality = nationality;
    this.height = height;
    this.weight = weight;
    this.active = active;
    this.alternateCaptain = alternateCaptain || "N/A";
    this.captain = captain || "N/A";
    this.rookie = rookie;
    this.shootsCatches = shootsCatches;
    this.rosterStatus = rosterStatus;
    this.currentTeam = currentTeam || {id: "N/A", link: "N/A", name: "N/A"};
    this.primaryPosition = primaryPosition;
  }

  calcCurrentAge() {
    const date = moment();
    const birth = moment(this.birthDate, 'YYYY-MM-DD');
    const finalDate = moment.duration(date.diff(birth));
    return finalDate._data.years;
  }  
}

export default Player;
