import moment from "moment";

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
    this.fullName = fullName || "N/A";
    this.link = link || "N/A";
    this.firstName = firstName || "N/A";
    this.lastName = lastName || "N/A";
    this.primaryNumber = primaryNumber || "N/A";
    this.birthDate = birthDate || "N/A";
    this.currentAge = currentAge || this.calcCurrentAge();
    this.birthCity = birthCity || "N/A";
    this.birthCountry = birthCountry || "N/A";
    this.nationality = nationality || "";
    this.height = height || 0;
    this.metricHeight = this.heightToMetric();
    this.weight = weight || 0;
    this.metricWeight = this.weightToMetric();
    this.active = active || false;
    this.alternateCaptain = alternateCaptain || "N/A";
    this.captain = captain || "N/A";
    this.rookie = rookie || false;
    this.shootsCatches = shootsCatches || "N/A";
    this.rosterStatus = rosterStatus || "N/A";
    this.currentTeam = currentTeam || { id: "N/A", link: "N/A", name: "N/A" };
    this.primaryPosition = primaryPosition || "N/A";
    this.stats = stats || {};
  }

  calcCurrentAge() {
    const date = moment();
    const birth = moment(this.birthDate, "YYYY-MM-DD");
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
