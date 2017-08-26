/**
 * Created by luje4 on 9/1/2016.
 */
let _ = require('lodash'),
    moment = require('moment'),
    xlsx = require('node-xlsx');

function generateWorkingTime (officeCode, startTimeStr, endTimeStr) {
    let noWorkingDayBuffer = xlsx.parse('../../static/no_working_day.xlsx')[0].data,
        workingHourBuffer = xlsx.parse('../../static/working_hour.xlsx')[0].data,
        reconstructTimeParam = constructTimeParam(startTimeStr, endTimeStr),
        realStartTimeStr = reconstructTimeParam.realStartTimeStr,
        realEndTimeStr = reconstructTimeParam.realEndTimeStr,
        startMoment = moment(realStartTimeStr),
        endMoment = moment(realEndTimeStr),
        startYear = startMoment.year(),
        endYear = endMoment.year(),
        realWorkingMinutes = 0;

    let noWorkingDayColumnIndexMap = generateColumnIndexMap(noWorkingDayBuffer[0]);
    let workingHourColumnIndexMap = generateColumnIndexMap(workingHourBuffer[0]);
    let noWorkingDayOfficeCodeMap = generateMetaDataMap(noWorkingDayBuffer, noWorkingDayColumnIndexMap);
    let workingHourOfficeCodeMap = generateMetaDataMap(workingHourBuffer, workingHourColumnIndexMap);

    let realNoWorkingDays = [];

    if (startYear == endYear) {
        realNoWorkingDays = filterNoWorkingDays(officeCode, startMoment, endMoment, noWorkingDayOfficeCodeMap, noWorkingDayBuffer, noWorkingDayColumnIndexMap);
        realWorkingMinutes = calculateWorkingHourByYear(officeCode, startMoment, endMoment, realNoWorkingDays, workingHourBuffer, workingHourOfficeCodeMap, workingHourColumnIndexMap);
    }
    else if (startYear < endYear) {
        let currentYear = startYear,
            currentYearStartMoment,
            currentYearEndMoment;
        while (currentYear <= endYear) {
            if (currentYear == startYear) {
                currentYearStartMoment = startMoment;
            }
            else {
                currentYearStartMoment = moment(currentYear + '-01-01');
            }
            if (currentYear == endYear) {
                currentYearEndMoment = endMoment;
            }
            else {
                currentYearEndMoment = moment(currentYear + '-12-31');
            }
            realNoWorkingDays = filterNoWorkingDays(officeCode, currentYearStartMoment, currentYearEndMoment, noWorkingDayOfficeCodeMap, noWorkingDayBuffer, noWorkingDayColumnIndexMap);
            realWorkingMinutes += calculateWorkingHourByYear(officeCode, currentYearStartMoment, currentYearEndMoment, realNoWorkingDays, workingHourBuffer, workingHourOfficeCodeMap, workingHourColumnIndexMap);
            currentYear++;
        }
    }

    console.log('Office: ' +  officeCode + ', from: ' + realStartTimeStr + ' to: ' + realEndTimeStr);
    console.log('working time is: ' + realWorkingMinutes + ' minutes');
    console.log('amount to: ' + realWorkingMinutes / 60 + ' hours');
    return realWorkingMinutes;
}

function calculateWorkingHourByYear (officeCode, startMoment, endMoment, realNoWorkingDays, workingHourBuffer, workingHourOfficeCodeMap, workingHourColumnIndexMap) {
    let wholeWorkingHour = 0,
        wholeWeekWorkingHour = 0,
        workingTimeMap = {},
        mapObject = workingHourOfficeCodeMap[officeCode];
    for (let i = mapObject.startIndex; i <= mapObject.endIndex; i++) {
        let workingHourRecord = workingHourBuffer[i],
            dayOfWeek = workingHourRecord[workingHourColumnIndexMap.DAY_OF_WEEK] - 1,
            startTimeM = workingHourRecord[workingHourColumnIndexMap.START_TIME_IN_MINUTES],
            endTimeM = workingHourRecord[workingHourColumnIndexMap.END_TIME_IN_MINUTES],
            dayCountTimeM = endTimeM - startTimeM;
        workingTimeMap[dayOfWeek] = dayCountTimeM;
        wholeWeekWorkingHour += dayCountTimeM;
    }

    let startDayOfWeek = startMoment.weekday(),
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
        let noWorkingDayOfWeek = noWorkingDayMoment.weekday(),
            noWorkingHour = workingTimeMap[noWorkingDayOfWeek];
        if (noWorkingHour) {
            wholeWorkingHour -= noWorkingHour;
        }
    });

    return wholeWorkingHour;
}

function filterNoWorkingDays (officeCode, startMoment, endMoment, noWorkingDayOfficeCodeMap, noWorkingDayBuffer, columnIndexMap) {
    let matchedNoWorkingDays = [],
        mapObject = noWorkingDayOfficeCodeMap[officeCode],
        startMomentExpand = moment(startMoment.format('YYYY-MM-DD')).subtract(1, 'days'),
        endMomentExpand = moment(endMoment.format('YYYY-MM-DD')).add(1, 'days');
    for (let i = mapObject.startIndex; i <= mapObject.endIndex; i++) {
        let noWorkingRecord = noWorkingDayBuffer[i],
            recordMonthNumber = noWorkingRecord[columnIndexMap.MONTH_NUMBER],
            recordDateNumber = noWorkingRecord[columnIndexMap.DAYS_OF_MONTH],
            recordEffectiveStartTime = noWorkingRecord[columnIndexMap.EFFECTIVE_START_IODT],
            recordEffectiveEndTime = noWorkingRecord[columnIndexMap.EFFECTIVE_END_IODT];
        if (recordEffectiveStartTime == 0 || recordEffectiveEndTime == 0) {
            let basicYear = (recordEffectiveStartTime != 0 && startMoment.year() < _.slice(recordEffectiveStartTime.toString(), 0, 4).join('')) ? _.slice(recordEffectiveStartTime.toString(), 0, 4).join('') : startMoment.year(),
                limitYear = (recordEffectiveEndTime != 0 && endMoment.year() > _.slice(recordEffectiveStartTime.toString(), 0, 4).join('')) ? _.slice(recordEffectiveEndTime.toString(), 0, 4).join('') : endMoment.year();
            while (basicYear <= limitYear) {
                let newMoment = moment('1084-01-01');
                newMoment = parseEffectiveTimeToMoment(basicYear.toString(), recordMonthNumber, recordDateNumber);
                if (newMoment.isBetween(startMomentExpand, endMomentExpand)) {
                    matchedNoWorkingDays.push(newMoment);
                }
                basicYear++;
            }
        }
        else {
            let effectiveTimeMoment = parseEffectiveTimeToMoment(recordEffectiveStartTime.toString(), recordMonthNumber, recordDateNumber);
            if (effectiveTimeMoment.isBetween(startMomentExpand, endMomentExpand)) {
                matchedNoWorkingDays.push(effectiveTimeMoment);
            }
        }
    }
    return _.uniqWith(matchedNoWorkingDays, _.isEqual);
}

function parseEffectiveTimeToMoment (timeStr, monthNumber, dateNumber) {
    let timeM = null,
        timeObj = {
            year: _.slice(timeStr, 0, 4).join(''),
            month: monthNumber - 1,
            day: dateNumber
        };
    if (timeObj.year) {
        timeM = moment(_.values(timeObj));
    }
    return timeM;
}

function generateMetaDataMap (buffer, columnIndexMap) {
    let map = {};
    if (buffer.length > 1) {
        let currentOfficeCode = "",
            startIndex = 0;

        for (let i = 1, len = buffer.length; i < len; i++) {
            let record = buffer[i];
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
    let columnIndexMap = {};
    _.forEach(columnNameArray, function(columnName, index) {
      columnIndexMap[columnName] = index;
    });
    return columnIndexMap;
}

function constructTimeParam(startTimeStr, endTimeStr) {
    let temp = endTimeStr ? endTimeStr : moment().format('YYYY-MM-DD');
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

generateWorkingTime('AAH', '2014-12-21', '2014-12-31'); // 32h
generateWorkingTime('AAH', '2014-12-21', '2015-01-11'); // 80h
generateWorkingTime('AAH', '2016-09-01');// x
generateWorkingTime('AAH', '2016-09-06');// less 24h than x
generateWorkingTime('AAH', '2014-04-01', '2014-12-31');
generateWorkingTime('AAH', '2014-04-01', '2016-12-31');// sum of below two times add 8h, because 'today time' is calculated twice
generateWorkingTime('AAH', '2014-04-01');
generateWorkingTime('AAH', '2016-12-31');

module.exports = {
    generateWorkingTime: generateWorkingTime
};