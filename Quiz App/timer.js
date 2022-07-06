
let dt = new Date(new Date().setTime(0));

let timex = dt.getTime();
// console.log(time);

let seconds = Math.floor((time % (100 * 60))/1000);
let minutes = Math.floor((time % (100 * 60 * 60))/(1000*60));
let timeT = 0;



let mTime = setInterval(function() {
    if(seconds < 59){
        seconds++;
    }
    else{
        seconds = 0;
        minutes++;
    }
    let s = (seconds < 10) ? '0' + seconds : seconds;
    let m = (minutes < 10) ? '0' + minutes : minutes;
    // console.log(seconds, minutes);
    document.querySelector('.qTimer').innerHTML = `${m} : ${s}`;
},1000)