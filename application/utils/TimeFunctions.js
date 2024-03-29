// import database from '@react-native-firebase/database';

// /**
//  * Function that will return the current firebase server time
//  *
//  * @export
//  * @return {*} 
//  */
// export function _getCurrentServerTime(){

//     var timeDate = database().getServerTime();

//     var allmonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
//     var day = timeDate.getDate();
//     var monthIndex = timeDate.getMonth();
//     var year = timeDate.getFullYear();

//     var date = day + ' ' + allmonths[monthIndex] + ', ' + year;

//     //setting time in 12 hours format
//     var hours = timeDate.getHours();
//     var ampm = timeDate.getHours() >= 12 ? 'PM' : 'AM';
//     var hours = timeDate.getHours() % 12;
//     hours = hours ? hours : 12; // the hour '0' should be '12'
//     var minutes = timeDate.getMinutes();
//     minutes = minutes < 10 ? '0'+minutes : minutes;

//     var time = hours + ':' + minutes + ' ' + ampm;

//     return(time + ' ' + date);
// }

/**
 * Function that will format the date and time
 * @param {*} date 
 */

export const _formatTime = (date) => {
    // console.log(date,'_formatTime')
    let timeDate = new Date(date);
    var allmonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    var day = timeDate.getDate();
    var monthIndex = timeDate.getMonth();
    var year = timeDate.getFullYear();

    var date = day + ' ' + allmonths[monthIndex] + ', ' + year;

    //setting time in 12 hours format
    var hours = timeDate.getHours();
    var ampm = timeDate.getHours() >= 12 ? 'PM' : 'AM';
    var hours = timeDate.getHours() % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var minutes = timeDate.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;

    var time = hours + ':' + minutes + ' ' + ampm;

    return (time + '-' + date);
}

export const _formatDate = (d) => {
    const timestamp = Date.parse(d);
    // console.log(timestamp)
    if (!isNaN(timestamp)) {
        const date = new Date(d)
        const yyyy = date.getFullYear();
        let mm = String(date.getMonth() + 1).padStart(2, "0"); // Months start at 0!
        let dd = String(date.getDate()).padStart(2, "0");
        const today = yyyy + '-' + mm + '-' + dd;
        return today;
    } else {
        return ''
    }
}


export const _formatDotDate = (d) => {

    const date = new Date(d)
    const yyyy = date.getFullYear();
    let mm = String(date.getMonth() + 1).padStart(2, "0"); // Months start at 0!
    let dd = String(date.getDate()).padStart(2, "0");
    const today = dd + '.' + mm + '.' + yyyy;
    return today;
}

export const _formatDateMonth = (date) => {
    var today = new Date(date);
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var dd = String(today.getDate()).padStart(2, "0");
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var allmonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    var monthIndex = today.getMonth();
    var mm = allmonths[monthIndex]
    var dayIndex = today.getDay();
    var dayName = days[dayIndex];
    var yyyy = today.getFullYear();
    today = dayName + ", " + dd + " " + mm + " " + yyyy;
    return today
};
export const _formatFullDate = (date) => {
    var today = new Date(date);
    // var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var dd = String(today.getDate()).padStart(2, "0");
    var allmonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    var monthIndex = today.getMonth();
    var mm = allmonths[monthIndex]
    var yyyy = today.getFullYear();
    today = dd + " " + mm + " " + yyyy;
    return today
};



export const _formatDateMonthNumber = (date) => {
    var today = new Date(date);
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + " " + yyyy;
    return today
};

export const _getDayName = (date) => {
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var d = new Date(date);
    var dayName = days[d.getDay()];
    return dayName;
}

export const _getDate = (date) => {
    var d = new Date(date);
    var dayName = d.getDate();
    return dayName;
}


export const _formateTime = (dateTime) => {
    let date = new Date(dateTime);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? '0' + hours : hours;
    // appending zero in the start if hours less than 10
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
}


export const _formatWeekDate = (date) => {
    var today = new Date(date);
    today.setUTCHours(0, 0, 0, 0, 0);
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var dd = String(today.getDate()).padStart(2, "0");
    today = dd + "." + mm;
    return today
};

export const _formatMonthString = (date) => {
    // var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    // var dd = String(today.getDate()).padStart(2, "0");
    var today = new Date(date);
    var allmonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    var monthIndex = today.getMonth();
    var mm = allmonths[monthIndex]
    var yyyy = today.getFullYear();
    today = mm
    return today
};

export function getFullMonthName(date) {
    const options = { month: 'long' };
    return date.toLocaleString('en-US', options);
}


export function HoursMinsStriing(minutes) {
    // console.log(minutes)
    var hours = Math.floor(minutes / 60);  // Calculate the number of whole hours
    var minutesRemaining = minutes % 60;  // Calculate the remaining minutes
    var timeString = "";
    if (hours > 0) {
        timeString += hours + " Hours";
        if (minutesRemaining > 0) {
            timeString +=  " "+ minutesRemaining + " mins";
        }
    } else {
        timeString += minutesRemaining + " Mins";
    }

    return timeString;
}

export function isCurrentDate(d) {
    const currentDate = new Date(); // Create a date instance for the current date
    const date = new Date(d)
    // Compare the year, month, and day of the dates
    if (
        date.getFullYear() > currentDate.getFullYear() ||
        (date.getFullYear() === currentDate.getFullYear() && date.getMonth() > currentDate.getMonth()) ||
        (date.getFullYear() === currentDate.getFullYear() && date.getMonth() === currentDate.getMonth() && date.getDate() >= currentDate.getDate())
    ) {
        return true; // The date is the current date or a future date
    }

    return false; // The date is in the past
}