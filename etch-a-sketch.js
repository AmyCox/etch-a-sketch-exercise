//select the elements on the page = canvas - shake button

const canvas = document.querySelector('#etch-a-sketch');

const ctx = canvas.getContext('2d');

const shakeButtonn = document.querySelector('.shake');

const MOVE_AMOUNT = 10; //true constant - use upper case and underscore

//Set up our canvas for drawing
// const width = canvas.width;
// const height = canvas.height;
// make a variable called height and width from the same properties on our canvas.
const {
  width,
  height
} = canvas;


console.log(width);

//create random x and y starting points on the canvas

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

ctx.beginPath(); // start the drawing 
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();
//write a draw function
//reference an options object
function draw({
  key
}) {
    //increment the hue
    hue += 5;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

  console.log(key);
  //start the path
  ctx.beginPath();
  ctx.moveTo(x, y);
  //move our x and y values depending on what the user did
  switch (key) {
    case 'ArrowUp':
      y = y - MOVE_AMOUNT;
      break;
    case 'ArrowDown':
      y = y + MOVE_AMOUNT;
      break;
    case 'ArrowRight':
      x = x + MOVE_AMOUNT;
      break;
    case 'ArrowLeft':
      x = x - MOVE_AMOUNT;
      break;
    default:
      break;
  }
  ctx.lineTo(x, y)
  ctx.stroke();
}

//write a handler for the keys
function handleKey(e) {
  if (e.key.includes('Arrow')) {

    e.preventDefault();
    draw({
      key: e.key
    });

  }
}
//clear/shake function
function clearCanvas() {
    canvas.classList.add('shake');
    ctx.clearRect(0,0, width, height);
    canvas.addEventListener('animationend', function (){
        console.log('done the shake')
        canvas.classList.remove('shake');
    }, 
    {once: true} //will unbind the event listener without having to write any additional code. Automatically removes the listener
    );
}
//listen for arrow keys
window.addEventListener('keydown', handleKey);
shakeButtonn.addEventListener('click', clearCanvas);
