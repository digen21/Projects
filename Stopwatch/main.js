var hr = 0;
var min = 0;
var sec = 0;
var ms = 0;

var timer = false;

document.getElementById('start').addEventListener('click', () => {
    timer = true;
    stopwatch();



});



document.getElementById('pause').addEventListener('click', () => {
    timer = false;


});


document.getElementById('reset').addEventListener('click', () =>{
    timer = false;
    hr = 0;
    min = 0;
    sec = 0;
    ms = 0;


   document.getElementById('hr').innerHTML = "00";
   document.getElementById('min').innerHTML = "00";
   
   document.getElementById('ms').innerHTML = "000";
   document.getElementById('sec').innerHTML = "00";



});


let stopwatch = ()=> {
    if(timer == true){
        ms += 1;
        
        if(ms == 100){
            sec += 1;
            ms = 0;
        }
        if(sec == 60){
            min += 1;
            sec = 0;
            ms = 0;
        }
        

        if(min == 60){
            hr +=1;
            min = 0;
            ms = 0;
        }
        
       var hrs = hr;
       var secs = sec;
       var mins = min;
       var mss = ms;

        if(hr < 10){
            hrs = '0' + hrs;
        }

        if(min < 10){
            mins = '0' + mins;
        }

        if(sec < 10){
            secs = '0' + secs;
        }

        if(ms < 10){
            mss = '0' + mss;
        }



        document.getElementById('ms').innerHTML = mss;
        document.getElementById('sec').innerHTML = secs;
        document.getElementById('min').innerHTML = mins;
        document.getElementById('hr').innerHTML =  hrs;
        
        setTimeout("stopwatch()", 10);
    }


}