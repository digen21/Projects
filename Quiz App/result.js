let user = sessionStorage.getItem('Name');
let point = sessionStorage.getItem('Points');

 let time = sessionStorage.getItem('Time');


document.querySelector('.name').innerHTML = user;

document.querySelector('.point').innerHTML = point;

document.querySelector('.time').innerHTML =   time;

