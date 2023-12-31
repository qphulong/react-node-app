import React from 'react'

var Datetime = () =>{
    var showdate = new Date();
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var day = showdate.getDate();
    var dayStr = "";
    if (day == 1 || day == 11 || day == 21 || day == 31){
        dayStr = day + "st"
    } else if (day == 2 || day == 22){
        dayStr = day + "nd"
    } else if (day == 3 || day == 13 || day == 23){
        dayStr = day + "rd"
    } else {
        dayStr = day + "th"
    }
    var month = months[showdate.getMonth()];
    var year = showdate.getFullYear();
    var date = dayStr + " " + month + ", " + year;
    return(
        <div>
            {date}
        </div>
    )
}

export default Datetime;