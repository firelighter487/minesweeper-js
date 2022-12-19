let id = i => document.getElementById(i);
let safe;
let safegreen;
safegreen = document.querySelectorAll(".safegreen");
safe = [];
let minecount = 0;
const mines = document.getElementsByClassName('mine');
const safes = document.getElementsByClassName('safe');
let classnumber = 0;
let container = id('container');
let clickedcount = 0;
let mode;
let boxes;
let columns;

function hundredboxes(){
  boxes = 100;
  columns = 10;
  mode = 0;
  id("container").style.gridTemplateColumns = "repeat(10, 20px)";
  hideboxes();
  init();
}

function twohundredboxes(){
  boxes = 225;
  columns = 15;
  mode = 1;
  id("container").style.gridTemplateColumns = "repeat(15, 20px)";
  hideboxes();
  init();
}

function fourhundredboxes(){
  boxes = 400;
  columns = 20;
  mode = 1;
  id("container").style.gridTemplateColumns = "repeat(20, 20px)";
  hideboxes();
  init();
}

function hideboxes(){
  id("button1").style.display="none";
  id("button2").style.display="none";
  id("button4").style.display="none";
}


function init(){
  //setInterval(safegreencount, 1000);
  generateboxes(boxes);
  document.addEventListener('contextmenu', event => event.preventDefault());
  //safegreencount();
  id("minesleft").innerHTML = "Init complete. number of mines: " + minecount;
  setInterval(wincheck, 1000);
}


function wincheck(){
  for (let y = 0; y < safegreen.length; y++) {
    if(boxes - minecount == safegreen.length){
      setInterval(win, 1000);
    }
  }
}

function generateboxes(number){
  let container = document.createElement('div');
  for (var i = 0; i < number; i++) {
    randomizer();
    generate(i); 
  }
}

function randomizer(){
  randomnumber = Math.floor(Math.random() * 5);
}

function generate(times){
  classnumber++;
  let div = document.createElement('div');
  div.className = 'box';
  div.id = classnumber;
  container.appendChild(div);
  if (randomnumber == 4){
    div.classList.add('mine');
    minecount++;  
    //setInterval(safegreencount, 1000);
    div.addEventListener('click', explosiontimer);
    rightclick(div);
  }
  else{
    div.classList.add('safe');
    reply_click(div);
    rightclick(div);
  }
}

function rightclick(div){
  div.addEventListener('contextmenu', function(){
    div.innerHTML = "&#128681";
  });
}

function reply_click(div){
  div.addEventListener('click', function(){
    div.classList.add('safegreen');
    let clicked;
    clicked = 0;
    clicked = parseInt(div.id);
    sweeper(div,clicked);
    div.innerHTML = clickedcount;
    clickedcount = 0;
  });
};

function sweeper(elmnt,elmnt2){
  safegreen = document.querySelectorAll(".safegreen");
  if(elmnt2+1 < boxes) {safe.push(document.querySelector("#container div:nth-of-type("+(elmnt2+1)+")"));};
  if(elmnt2+columns < boxes) {safe.push(document.querySelector("#container div:nth-of-type("+(elmnt2+columns)+")"))};
  if(elmnt2+columns-1 < boxes) {safe.push(document.querySelector("#container div:nth-of-type("+(elmnt2+columns-1)+")"))};
  if(elmnt2+columns+1 < boxes) {safe.push(document.querySelector("#container div:nth-of-type("+(elmnt2+columns+1)+")"))};
  if(elmnt2-1 > 0) {safe.push(document.querySelector("#container div:nth-of-type("+(elmnt2-1)+")"))};
  if(elmnt2-columns > 0) {safe.push(document.querySelector("#container div:nth-of-type("+(elmnt2-columns)+")"))};
  if(elmnt2-columns-1 > 0) {safe.push(document.querySelector("#container div:nth-of-type("+(elmnt2-columns-1)+")"))};
  if(elmnt2-columns+1 > 0) {safe.push(document.querySelector("#container div:nth-of-type("+(elmnt2-columns+1)+")"))};
  
  if (mode == 0) {
    console.log('easymode');
    for (let i = 0; i < safe.length; i++) {
      if(safe[i].classList.contains('safe')){
        safe[i].classList.add('safegreen');
      }
    } 
  } else {
    console.log("hardmode");
  }



  console.log(safe);
  for (let g = 0; g < safe.length; g++) {
    console.log('loop');
    if(safe[g].classList.contains('mine')){
      //console.log('if');
      clickedcount++;
      //console.log(clickedcount);
      //safe[i].innerHTML = parseInt(clickedcount);
      //clickedcount = 0;
    }
  } 
  safe = [];
}


// function safegreencount(){
//   safegreen = document.querySelectorAll(".safegreen");
//   id("safegreentotal").innerHTML = "boxes left:" + (400 - minecount - safegreen.length);
// }

function explosiontimer(){
  setInterval(explosion, 100);
};

function explosion(){
  id("minesleft").innerHTML = "GAME OVER";
  for (let mine of mines) {
    mine.classList.remove("mine");
    mine.classList.add("mineexplode");
    mine.innerHTML = "&#128163";
  };
};

function win(){
  id("minesleft").innerHTML = "YOU WIN!";
  for (let mine of mines) {
    mine.classList.remove("mine");
    mine.classList.add("mineexplode");
    mine.innerHTML = "&#128163";
  }
};

function safecount(){
  id("minesleft").innerHTML = "safe";
};