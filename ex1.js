// ex1.js
/*
  Contains the logic for generating and drawing a Sierpinski triangle
  and handling user interactions such as clicks and window resizes, among other things.
  
  lolearning javascript with fractals
*/

import palettes from './colorPalettes.js';
import { logDisplaySizes } from './debugTools.js';
console.log(palettes);

const pyramidContainer = document.getElementById('pyramidContainer');
const canvasContainer = document.getElementById('canvasContainer');
const canvas = document.getElementById('fractalCanvas'); //child of canvasContainer
const ctx = canvas.getContext('2d');
const infoBox = document.getElementById("infoBox");
const kaoNashiPath = "url('/resources/kaonashi.gif')";

let iterations = 11; // Number of iterations to display
let lineWidth = .7;

let paletteIndex = 0;
let colorIndex = 0;
let strokeColors = palettes.palette1; // Assigning initial palette to strokeColors

// impementing configs for when multiple modes are introduced
// let config = {
//   iterations : 7, 
//   lineWidth : 0.7, 
//   strokeColors : palettes.palette1,
//   // ...
// };

async function drawFractal(x, y, size, iterations, colorIndex) {
    if (iterations === 0) {
    // Base case: Stop recursion when iterations reach 0
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x + size / 2, y + (Math.sqrt(3) * size) / 2);
        ctx.closePath();
        ctx.strokeStyle = strokeColors[colorIndex % strokeColors.length]; 
        ctx.lineWidth = lineWidth;
        ctx.stroke();
  } else {
    // Recursive case: Generate three smaller triangles
		await drawFractalStep(x, y, size, iterations, colorIndex);
	}
}

async function drawFractalStep(x, y, size, iterations, colorIndex) {

    await new Promise((resolve) => setTimeout(resolve, 0.000001)); // ms delay so that it animates drawing
				
        await drawFractal(x, y, size / 2, 
                        iterations - 1, 
                        colorIndex + 1); //
        await drawFractal(x + size / 2, y, size / 2, 
                        iterations - 1, 
                        colorIndex + 2); // 
        await drawFractal(x + size / 4, y + (Math.sqrt(3) * size) / 4, size / 2, 
                        iterations - 1, 
                        colorIndex + 3); // 
}

async function updateCanvasSize() {
    
    const containerWidth = canvas.parentNode.clientWidth;
    const containerHeight = canvas.parentNode.clientHeight;
    // getting dimensions from canvas.parentNode is much more crisp than from window.inner*
    const canvasSize = Math.min(containerWidth, containerHeight);

    // Set the CSS size of the canvas to match the size of the container (this breaks things currently)
    // canvas.style.width = `${canvasSize}px`;
    // canvas.style.height = `${canvasSize}px`;
    
    // Adjust the canvas drawing buffer size to match the display size
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Update infobox and log info to console
    infoBox.innerHTML = logDisplaySizes().html; 
    
    // const dpr = window.devicePixelRatio || 1;
    // canvas.width = canvasSize * dpr;
    // canvas.height = canvasSize * dpr;
    // ctx.scale(dpr, dpr);
    
    const triangleHeight = (Math.sqrt(3) * canvasSize) / 2;
    const startX = canvas.width / 2 - canvasSize / 2;
    const startY = canvas.height / 2 - triangleHeight / 2;

    await drawFractalRange(startX, startY, canvasSize, 1, iterations, colorIndex);
    // draw a single fractal at given iteration level
    // await drawFractal(startX, startY, canvasSize, iterations, colorIndex);  
}

async function drawFractalRange(x, y, size, startIterations, endIterations, colorIndex) {
  for (let iterations = startIterations; iterations <= endIterations; iterations++) {
      await drawFractal(x, y, size, iterations, colorIndex);
      // introduce a delay between iterations for visualization purposes
      await new Promise(resolve => setTimeout(resolve, 100)); // milliseconds
      // set the wait time as a function of the iteration level such that
      // low level iterations have a bigger pause, so that it looks less hurried at the start
  }
}

function switchColorPalette(event){
  paletteIndex = (paletteIndex + 1) % Object.keys(palettes).length;
  // testing
  // let _strokeColors = palettes[Object.keys(palettes)[paletteIndex]]
  // console.log(`new palette : ${_strokeColors}`)
  strokeColors = palettes[Object.keys(palettes)[paletteIndex]]
  console.log(`palette index : ${paletteIndex}`)
  console.log(`current palette : \n${strokeColors}`);
}

// infoBox - used for displaying canvas/display size info
function toggleInfoBox() {
  // Update the content of the infoBox with the information from logDisplaySizes()
  infoBox.innerHTML = logDisplaySizes().html;
  // Toggle the visibility of the infoBox
  infoBox.style.display = infoBox.style.display === "none" ? "block" : "none";
}

function toggleKaoNashi() {
  const currentBackground = canvasContainer.style.backgroundImage;
  canvasContainer.style.backgroundImage = currentBackground === 'none' ? kaoNashiPath : 'none';
}

function handleKeyDown(event) {
  // Check if the pressed key is 'c'
  if (event.key === 'c') {
    switchColorPalette();
    updateCanvasSize();
  } else if (event.key === 'b') {
    toggleKaoNashi();
  }
}

// Initialize touch start variable
let touchStartX = 0;
// hasSwiped variable to prevent multiple swipes from being read during one long swipe
// might be better to have a listener/handler for 'touchend' instead
let hasSwiped = false; 
function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
}
async function handleTouchMove(event) {
  const touchEndX = event.touches[0].clientX;
  const deltaX = touchEndX - touchStartX;
  // Threshold for considering the swipe as intentional
  const minSwipeDistance = 50;
  if (deltaX > minSwipeDistance || deltaX < -minSwipeDistance) {
    // add palette deincrement case for when left swiping eventually
    if (!hasSwiped) {
      hasSwiped = true;
      switchColorPalette();
      await updateCanvasSize();  // Wait for canvas update to complete
    }
  } else {
    hasSwiped = false;  // Reset the flag if the swipe distance is less than the threshold
  }
}

// Add a click event listener to the subhead element to call the function
document.getElementById("pyramidContainer").addEventListener("click", toggleInfoBox);
// Recenter and update canvas on window resize
window.addEventListener('resize', updateCanvasSize); 
// Add keydown listener for implementing keybindings
document.addEventListener('keydown', handleKeyDown);
// Add click event listener to the canvas
canvas.addEventListener('click', updateCanvasSize);
// Add touch event listeners to the canvas
canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchmove', handleTouchMove);

updateCanvasSize(); // Initialize canvas
