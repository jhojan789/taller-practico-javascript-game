const canvas = document.querySelector('.game');
const game = canvas.getContext('2d');
let canvasSize;
let elementSize;


window.addEventListener('load', setCanvasSize);
window.addEventListener('resize',setCanvasSize);

function setCanvasSize(){
  let canvasSize;

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
  
  game.textAlign = 'end'

  const map = maps[1];
  const mapRows = map.trim().split('\n');
  const mapRowsCols = mapRows.map(row => row.trim().split(''));
  

  mapRowsCols.forEach((row,rowIndex) => {
    row.forEach((col,colIndex)=>{
      const emoji = emojis[col];
      const posX = elementSize * (colIndex + 1);
      const posY = elementSize * (rowIndex + 1);
      game.fillText(emoji,posX,posY);

      console.log({col});


    });
  });


  // for (let row = 1; row <= 10; row++) {
  //   for (let col = 1; col <= 10; col++) {
  //     game.fillText(emojis[mapRowsCols[row-1][col-1]],elementSize * col,elementSize * row);
  //   }
  // }
    


    
  
  console.log(window.innerHeight, window.innerWidth);
  console.log(canvasSize);
  console.log(elementSize);
}




