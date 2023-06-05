const canvas = document.querySelector('.game');
const game = canvas.getContext('2d');
let canvasSize;
let elementSize;
let level = 0;
let lives = 3;
let starTime;
let intervalTime;
const btnUp = document.getElementById('up');
const btnDown = document.getElementById('down');
const btnLeft = document.getElementById('left');
const btnRight = document.getElementById('right');

const spanLives = document.getElementById('lives');
const spanTime = document.getElementById('time');


const playerPosition = {
  x: undefined,
  y: undefined,
};

const giftPosition = {
  x: undefined,
  y: undefined,
};


let enemyPositions = [];

btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);

window.addEventListener('keydown',moveByKeyboard);
window.addEventListener('load', setCanvasSize);
window.addEventListener('resize',setCanvasSize);


function setCanvasSize(){
  
  if(window.innerHeight > window.innerWidth){
    canvasSize = window.innerWidth * 0.8;
  }else{
    canvasSize = window.innerHeight * 0.8;
  }
  
  
  canvas.setAttribute('width',canvasSize);
  canvas.setAttribute('height',canvasSize);

  elementSize = canvasSize / 10;
 

  startGame();
  
}




function startGame(){

  game.font = elementSize + 'px Verdana';
  
  game.textAlign = 'end';

  const map = maps[level];

  if(!map){
    gameWin();
    return;
  }

  if(!starTime){
    starTime = Date.now();
    intervalTime = setInterval(printTime,100);

  }

  const mapRows = map.trim().split('\n');
  const mapRowsCols = mapRows.map(row => row.trim().split(''));
  
  enemyPositions = [];
  game.clearRect(0,0,canvasSize,canvasSize); 
  
  mapRowsCols.forEach((row,rowIndex) => {
    row.forEach((col,colIndex)=>{
      const emoji = emojis[col];
      const posX = elementSize * (colIndex + 1);
      const posY = elementSize * (rowIndex + 1);
      
      
      if(col == 'O'){
        if(!playerPosition.x && !playerPosition.y){
          playerPosition.x = posX;
          playerPosition.y = posY;

        }
      }else if(col == 'I'){
        giftPosition.x = posX;
        giftPosition.y = posY;
      }else if(col == 'X'){
        enemyPositions.push({
          x: posX,
          y: posY,
        });
      }


      game.fillText(emoji,posX,posY);
    });
  });
  
  movePlayer();
  printLiveHearts();
}

function movePlayer(){
  const isGiftCollisionX = giftPosition.x.toFixed(3) == playerPosition.x.toFixed(3);
  const isGiftCollisionY = giftPosition.y.toFixed(3) == playerPosition.y.toFixed(3);
  const isGiftCollision = isGiftCollisionX && isGiftCollisionY; 
  
  if(isGiftCollision){
    console.log('Gift collision');
    levelWin();
  }

  const enemyCollision = enemyPositions.find(enemy =>{
    const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
    return enemyCollisionX && enemyCollisionY;
  });


  if(enemyCollision){
    console.log('Enemy collision');
    levelFail();
  }

  game.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y);


}

function moveUp(){
  console.log('Moving up');
  if((playerPosition.y) < elementSize){
    console.log('OUT');
  }else{
    playerPosition.y -= elementSize;
    startGame();
    // console.log(playerPosition.y,(playerPosition.y - elementSize), canvasSize,elementSize);
  }
}

function moveLeft(){
  console.log('Moving left');
  if((playerPosition.x-elementSize) < elementSize){
    console.log('OUT');
  }else{
    playerPosition.x -= elementSize;
    startGame();
  }
  // console.log(playerPosition.x,(playerPosition.x - elementSize), canvasSize,elementSize);
  
}

function moveRight(){
  console.log('Moving right');
  if((playerPosition.x + elementSize) > canvasSize){
    console.log('OUT');
  }else{
    playerPosition.x += elementSize;
    startGame();
  }
  
  // console.log(playerPosition.x,(playerPosition.x + elementSize), canvasSize,elementSize);
}

function moveDown(){
  console.log('Moving down');
  if((playerPosition.y + elementSize) > canvasSize){
    console.log('OUT');
  }else{
    playerPosition.y += elementSize;
    startGame();
  }
  // console.log(playerPosition.y, (playerPosition.y + elementSize), canvasSize,elementSize);
}

function moveByKeyboard(event){
  if(event.code == 'ArrowUp') moveUp();
  else if(event.code == 'ArrowDown') moveDown();
  else if(event.code == 'ArrowLeft') moveLeft();
  else if(event.code == 'ArrowRight') moveRight();
}

function levelWin(){
  level++;
  startGame();
}

function gameWin(){
  console.log('Game finished');
  clearInterval(intervalTime);
}

function levelFail(){
  lives--;
  console.log(lives);

  if(lives <= 0){
    level = 0;
    lives = 3;
    starTime = undefined;
  }

  
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function printLiveHearts(){
  const hearts = Array(lives).fill(emojis['HEART']);
  spanLives.innerText = '';
  hearts.forEach(heart =>{
    spanLives.innerText += heart;

  });

}

function printTime(){
  spanTime.innerText = Date.now() - starTime; 
}

