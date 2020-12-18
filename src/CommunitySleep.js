const chai = require('chai');
const expect = chai.expect;

const Sleep = require('../src/Sleep')

class CommunitySleep {
  constructor(data = []) {
    this.sleeps = data.map(sleep => new Sleep(sleep))
  }

  convertDateString(date) {
    return parseInt(date.split('/').join(''));
  }

  findUserSleepData(userID) {
    const userSleep = this.sleeps.filter(sleeper => sleeper.userID === userID);
    return userSleep;
  }

  calculateAvgSleepHrsPerDay(userID) {
    const userSleep = this.sleeps.filter(sleeper => (sleeper.userID === userID));
    const amountSlept = userSleep.map(sleeper => sleeper.hoursSlept);
    const avgHoursSlept = (amountSlept.reduce((a, b) => a + b, 0)) / amountSlept.length;
    return Math.round(avgHoursSlept * 10) / 10;
  }

  calculateAvgSleepQualPerDay(userID) {
    const userSleep = this.sleeps.filter(sleeper => (sleeper.userID === userID));
    const sleepQuality = userSleep.map(sleeper => sleeper.sleepQuality);
    const avgSleepQuality = (sleepQuality.reduce((a, b) => a + b, 0)) / sleepQuality.length;
    return Math.round(avgSleepQuality * 10) / 10;
  }

  findHrsSleptOnDay(userID, date) {
    const hoursSlept = this.sleeps.find(sleeper => sleeper.userID === userID && sleeper.date === date);
    return hoursSlept.hoursSlept;
  }

  findSleepQualityOnDay(userID, date) {
    const sleepQuality = this.sleeps.find(sleeper => sleeper.userID === userID && sleeper.date === date);
    return sleepQuality.sleepQuality;
  }

  calculateSleepStatsWeek(userID, startDate, endDate) {
    const sleepWeekTotals = [];
    const startDateNumber = this.convertDateString(startDate);
    const endDateNumber = this.convertDateString(endDate);
    const userSleep = this.findUserSleepData(userID);
    const sleepDates = userSleep.filter(sleeper => {
      const sleepDateToNumber = this.convertDateString(sleeper.date)
      if(sleepDateToNumber >= startDateNumber && sleepDateToNumber <= endDateNumber){
        sleepWeekTotals.push(sleeper);
      }
    })
    console.log(sleepWeekTotals)
    return sleepWeekTotals;
  }

  calculateAvgSleepQualityWk(userID, startDate, endDate) {
    const sleepWeek = this.calculateSleepStatsWeek(userID, startDate, endDate);
    const sleepQualityTotals = sleepWeek.map(sleeper => sleeper.sleepQuality)
    const sleepWeekAvg = (sleepQualityTotals.reduce((a, b) => a + b, 0))/7
    return Math.round(sleepWeekAvg * 10) / 10
  }

  calculateAvgSleepQuality() {
    const sleepQualityAllUsers = this.sleeps.map(allSleepers => allSleepers.sleepQuality);
     const avgSleepQuality = (sleepQualityAllUsers.reduce((a, b) => a + b, 0)) / sleepQualityAllUsers.length;
     return Math.round(avgSleepQuality * 10) / 10;
  }

  findBestQualitySleepers(startDate, endDate) {
    const bestSleepers = []
    const startDateNumber = this.convertDateString(startDate);
    const endDateNumber = this.convertDateString(endDate);
    const sleepWeek = this.sleeps.filter(sleeper => {
      const sleepDateAsNumber = this.convertDateString(sleeper.date)
      return sleepDateAsNumber >= startDateNumber && sleepDateAsNumber <= endDateNumber
    })
    const filterSleepers = sleepWeek.filter(sleeper => {
      const avgSleepQual = this.calculateAvgSleepQualityWk(sleeper.userID, startDate, endDate)
      if(!bestSleepers.includes(sleeper.userID) && avgSleepQual > 3){
        bestSleepers.push(sleeper.userID)
      }
    })
    return bestSleepers;
  }
  findMostHrsSleepers(date) {
    const sleepers = [];
    const sleepHours = [];
    this.sleeps.forEach(sleeper => {
      sleepHours.push(this.findHrsSleptOnDay(sleeper.userID, date))
      const longestSleep = Math.max(...sleepHours);
      if(longestSleep === sleeper.hoursSlept && date === sleeper.date) {
        sleepers.push(sleeper.userID);
      }
    })
    return sleepers;
  }
}
module.exports = CommunitySleep;
