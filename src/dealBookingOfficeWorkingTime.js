/**
 * Created by luje4 on 9/1/2016.
 */
var _ = require('lodash'),
    moment = require('moment'),
    xlsx = require('node-xlsx');

function generateWorkingTime (officeCode, startTimeStr, endTimeStr) {
    var noWorkingDayBuffer = xlsx.parse('../static/no_working_day.xlsx')[0].data,
        workingHourBuffer = xlsx.parse('../static/working_hour.xlsx')[0].data;

    var reconstructTimeParam = constructParamTime(startTimeStr,endTimeStr),
        realStartTimeStr = reconstructTimeParam.realStartTimeStr,
        realEndTimeStr = reconstructTimeParam.realEndTimeStr,
        startMoment = moment(realStartTimeStr).subtract(1, 'days'),
        endMoment = moment(realEndTimeStr).subtract(1, 'days'),
        startYear = startMoment.year(),
        endYear = endMoment.year(),
        realWorkingHour = 0;

    var noWorkingDayColumnIndexMap = generateColumnIndexMap(noWorkingDayBuffer[0]);
    var workingHourColumnIndexMap = generateColumnIndexMap(workingHourBuffer[0]);
    var noWorkingDayOfficeCodeMap = generateMetaDataMap(noWorkingDayBuffer, noWorkingDayColumnIndexMap);
    var workingHourOfficeCodeMap = generateMetaDataMap(workingHourBuffer, workingHourColumnIndexMap);

    var realNoWorkingDays = [];

    if (startYear == endYear) {
        realNoWorkingDays = filterNoWorkingDays(officeCode, startMoment, endMoment, noWorkingDayOfficeCodeMap, noWorkingDayBuffer, noWorkingDayColumnIndexMap);
        realWorkingHour = calculateWorkingHourByYear(officeCode, startMoment, endMoment, realNoWorkingDays, workingHourBuffer, workingHourOfficeCodeMap, workingHourColumnIndexMap);
    }
    else if (startYear < endYear) {
        var currentYear = startYear,
            currentYearStartMoment,
            currentYearEndMoment;
        while (currentYear < endYear) {
            if (currentYear == startYear) {
                currentYearStartMoment = startMoment;
            }
            else {
                currentYearStartMoment = moment(currentYear + '-01-01').subtract(1, 'days');
            }
            if (currentYear == endYear) {
                currentYearEndMoment = endMoment;
            }
            else {
                currentYearEndMoment = moment(currentYear + '-12-31').subtract(1, 'days');
            }
            realNoWorkingDays = filterNoWorkingDays(officeCode, currentYearStartMoment, currentYearEndMoment, noWorkingDayOfficeCodeMap, noWorkingDayBuffer, noWorkingDayColumnIndexMap);
            realWorkingHour += calculateWorkingHourByYear(officeCode, currentYearStartMoment, currentYearEndMoment, realNoWorkingDays, workingHourBuffer, workingHourOfficeCodeMap, workingHourColumnIndexMap);
            currentYear++;
        }
    }

    console.log('Office: ' +  officeCode + ', from: ' + realStartTimeStr + ' to: ' + realEndTimeStr);
    console.log('working time is: ' + realWorkingHour + ' minutes');
    console.log('amount to: ' + realWorkingHour/60 + ' hours');
}

function calculateWorkingHourByYear (officeCode, startMoment, endMoment, realNoWorkingDays, workingHourBuffer, workingHourOfficeCodeMap, workingHourColumnIndexMap) {
    var wholeWorkingHour = 0,
        wholeWeekWorkingHour = 0,
        workingTimeMap = {},
        mapObject = workingHourOfficeCodeMap[officeCode];
    for (var i = mapObject.startIndex; i <= mapObject.endIndex; i++) {
        var workingHourRecord = workingHourBuffer[i],
            dayOfWeek = workingHourRecord[workingHourColumnIndexMap.DAY_OF_WEEK] - 1,
            startTimeM = workingHourRecord[workingHourColumnIndexMap.START_TIME_IN_MINUTES],
            endTimeM = workingHourRecord[workingHourColumnIndexMap.END_TIME_IN_MINUTES],
            dayCountTimeM = endTimeM - startTimeM;
        workingTimeMap[dayOfWeek] = dayCountTimeM;
        wholeWeekWorkingHour += dayCountTimeM;
    }

    var startDayOfWeek = startMoment.weekday(),
        endDayOfWeek = endMoment.weekday(),
        startWeek = startMoment.week(),
        endWeek = endMoment.week() == 1 ? endMoment.day(-7).week() + 1 : endMoment.week(),
        wholeWeekNumber = endWeek - startWeek - 1;
    //Calculate first and last week days
    //0~6, Sunday is the first day of week.
    if (startWeek == endWeek) {
        while (startDayOfWeek <= endDayOfWeek) {
            wholeWorkingHour += workingTimeMap[startDayOfWeek] ? workingTimeMap[startDayOfWeek] : 0;
            startDayOfWeek++;
        }
    }
    else if (startWeek < endWeek) {
        while (startDayOfWeek <= 6) {
            wholeWorkingHour += workingTimeMap[startDayOfWeek] ? workingTimeMap[startDayOfWeek] : 0;
            startDayOfWeek++;
        }
        while (endDayOfWeek >= 0) {
            wholeWorkingHour += workingTimeMap[endDayOfWeek] ? workingTimeMap[endDayOfWeek] : 0;
            endDayOfWeek--;
        }
        //Calculate middle whole weeks
        wholeWorkingHour += (wholeWeekNumber * wholeWeekWorkingHour);
    }
    //Subtract no working day
    _.forEach(realNoWorkingDays, function(noWorkingDayMoment) {
        var noWorkingDayOfWeek = noWorkingDayMoment.weekday(),
            noWorkingHour = workingTimeMap[noWorkingDayOfWeek];
        if (noWorkingHour) {
            wholeWorkingHour -= noWorkingHour;
        }
    });

    return wholeWorkingHour;
}

function filterNoWorkingDays (officeCode, startMoment, endMoment, noWorkingDayOfficeCodeMap, noWorkingDayBuffer, columnIndexMap) {
    var matchedNoWorkingDays = [],
        mapObject = noWorkingDayOfficeCodeMap[officeCode],
        startMomentExpand = startMoment.subtract(1, 'days'),
        endMomentExpand = endMoment.add(1, 'days');
    for (var i = mapObject.startIndex; i <= mapObject.endIndex; i++) {
        var noWorkingRecord = noWorkingDayBuffer[i],
            recordMonthNumber = noWorkingRecord[columnIndexMap.MONTH_NUMBER],
            recordDateNumber = noWorkingRecord[columnIndexMap.DAYS_OF_MONTH]
            recordEffectiveStartTime = noWorkingRecord[columnIndexMap.EFFECTIVE_START_IODT];
        if (recordEffectiveStartTime == 0) {
            var basicYear = startMoment.year(),
                limitYear = endMoment.year();
            while (basicYear <= limitYear) {
                var newMoment = moment('1984-01-01');
                newMoment = newMoment.year(basicYear).month(recordMonthNumber).date(recordDateNumber);
                if (newMoment.isBetween(startMomentExpand, endMomentExpand)) {
                    matchedNoWorkingDays.push(newMoment);
                }
                basicYear++;
            }
        }
        else {
            var effectiveTimeMoment = parseEffectiveTimeToMoment(recordEffectiveStartTime.toString(), recordMonthNumber, recordDateNumber);
            if (effectiveTimeMoment.isBetween(startMomentExpand, endMomentExpand)) {
                matchedNoWorkingDays.push(effectiveTimeMoment);
            }
        }
    }
    return matchedNoWorkingDays;
}

function parseEffectiveTimeToMoment (timeStr, monthNumber, dateNumber) {
    var timeM = null,
        timeObj = {
            year: _.slice(timeStr, 0, 4).join(''),
            month: monthNumber,
            day: dateNumber
        };
    if (timeObj.year) {
        timeM = moment(_.values(timeObj));
    }
    return timeM;
}

function generateMetaDataMap (buffer, columnIndexMap) {
    var map = {};
    if (buffer.length > 1) {
        var currentOfficeCode = "",
            startIndex = 0;

        for (var i = 1, len = buffer.length; i < len; i++) {
            var record = buffer[i];
            if (currentOfficeCode !== record[columnIndexMap.BOOKING_OFFICE_CODE]) {
                map[currentOfficeCode] = {
                    startIndex: startIndex,
                    endIndex: i - 1
                };
                currentOfficeCode = record[columnIndexMap.BOOKING_OFFICE_CODE];
                startIndex = i;
            }
        }
        return _.omit(map, '');
    }
    return map;
}

function generateColumnIndexMap (columnNameArray) {
    var columnIndexMap = {};
    _.forEach(columnNameArray, function(columnName, index) {
      columnIndexMap[columnName] = index;
    });
    return columnIndexMap;
}

function constructParamTime (startTimeStr, endTimeStr) {
    var temp = endTimeStr ? endTimeStr : moment().format('YYYY-MM-DD');
    if (moment(startTimeStr).isSameOrBefore(moment(temp))) {
        endTimeStr = temp;
    }
    else {
        endTimeStr = startTimeStr;
        startTimeStr = temp;
    }
    return {
        realStartTimeStr: startTimeStr,
        realEndTimeStr: endTimeStr
    }
}

generateWorkingTime('AAH', '2014-04-01', '2016-12-20');
generateWorkingTime('AAH', '2014-04-01');
generateWorkingTime('AAH', '2016-12-20');
// generateWorkingTime('AAH', '2014-04-01', '2014-12-31');
//var x = moment('2010-04-01').isBetween('2010-04-01', '2010-04-02'); //false
//var x = moment('2010-04-01').isBetween('2010-03-10', '2010-04-01'); //false
//console.log(moment('2010-04-01').subtract(1, 'days').toString());
//var x = moment('201501');
//console.log(x.toString());
//console.log(_.slice('201601000000', 0, 4).join(''));
//console.log('00' == 0);
// var x = moment('2016-01-03');
// console.log(x.day(-7).toString());
module.exports = {
    generateWorkingTime: generateWorkingTime
}