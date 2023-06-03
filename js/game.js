const canvas = document.querySelector('.game');
const game = canvas.getContext('2d');
let canvasSize;
let elementSize;
const btnUp = document.getElementById('up');
const btnDown = document.getElementById('down');
const btnLeft = document.getElementById('left');
const btnRight = document.getElementById('right');

const playerPosition = {
  x: undefined,
  y: undefined,
};

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

  const map = maps[0];
  const mapRows = map.trim().split('\n');
  const mapRowsCols = mapRows.map(row => row.trim().split(''));
  
 
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
      }
      game.fillText(emoji,posX,posY);
    });
  });
  
  movePlayer();
  
}


function movePlayer(){
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
  if((playerPosition.x) < elementSize){
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







