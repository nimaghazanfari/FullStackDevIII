var moment = require('moment');

var getCurrentDate = function() {
    let wrapped = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
    console.log(wrapped);
}

getCurrentDate();