const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const num = document.querySelector('.num');
let a = 1;

plus.addEventListener('click', () =>{
    a++;
    a = (a < 10) ? "0" + a : a;
   num.innerHTML = a;
   num.style.color = "green";
})



minus.addEventListener('click', () =>{
    if(a > 1){
       a--;
       a = (a < 10) ? "0" + a : a;
       num.innerHTML = a;
       num.style.color = "red";
}
})