const canvas = document.querySelector('.game');
const game = canvas.getContext('2d');


window.addEventListener('load', startGame);

function startGame(){

  // game.fillRect(0,0,100,100);
  // game.clearRect(10,10,50,50);
  
  game.font = '25px Sanserif';
  game.fillStyle = 'purple';
  game.textAlign = 'left';
  game.fillText('Jhojan', 0 , 25);


}

