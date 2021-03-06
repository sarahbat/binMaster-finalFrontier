/**
 * @fileoverview date.js provides useful date functions
 */
'use strict';
var ezs = require('./ezs');

ezs.Date = {}; // create a namespace

ezs.Date.shortDayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
ezs.Date.longDayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
                          'Thursday', 'Friday', 'Saturday'];

ezs.Date.shortMonthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

ezs.Date.longMonthList = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December'];


/**
 * @param {Date} opt_date is an optional js Date
 * @return {string} the date as DD MMM YYYY
 */
ezs.Date.getDate = function (opt_date) {
  var date = opt_date instanceof Date ? opt_date : new Date();
  var dd = date.getDate(); // day as a number
  var mmm = ezs.Date.shortMonthList[date.getMonth()];  // month as short
  var yyyy = date.getFullYear();

  return [dd, mmm, yyyy].join(' ');
};


/**
 * @param {Date} opt_date is an optional js Date
 * @return {string} the time as HH:NN:SS AMPM
 */
ezs.Date.getTime = function (opt_date) {
  var date = opt_date instanceof Date ? opt_date : new Date();
  var hh = date.getHours();
  var ampm = hh < 12 ? 'am' : 'pm';
  hh = hh === 0 ? 12 : hh > 12 ? hh - 12 : hh;

  var nn = date.getMinutes();
  nn = (nn < 10) ? ['0', nn].join('') : nn;

  var ss = date.getSeconds();
  ss = (ss < 10) ? ['0', ss].join('') : ss;
  
  return [hh, ':', nn, ':', ss, ampm].join('');
};

module.exports = ezs.Date;
