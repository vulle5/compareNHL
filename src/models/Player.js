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
    primaryPosition,
    stats
  ) {
    this.id = id;
    this.fullName = fullName;
    this.link = link;
    this.firstName = firstName;
    this.lastName = lastName;
    this.primaryNumber = primaryNumber || "N/A";
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
    this.stats = stats || {};
  }

  get metricHight() {
    return this.heightToMetric();
  }

  get metricWeight() {
    return this.weightToMetric();
  }

  calcCurrentAge() {
    const date = moment();
    const birth = moment(this.birthDate, 'YYYY-MM-DD');
    const finalDate = moment.duration(date.diff(birth));
    return finalDate._data.years;
  }

  heightToMetric() {
    const parseEngArray = this.height.match(/\d+/g);
    return Math.round(parseEngArray[0] * 30.48 + parseEngArray[1] * 2.54);
  }

  weightToMetric() {
    return Math.round(this.weight * 0.45359237);
  }
}

export default Player;
