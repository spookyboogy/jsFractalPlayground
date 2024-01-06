// 
// llolearning javascript with fractals

import palettes from './colorPalettes.js';
import { logDisplaySizes } from './debugTools.js';
console.log(palettes);

const pyramidContainer = document.getElementById('pyramidContainer');
const canvas = document.getElementById('fractalCanvas');
const ctx = canvas.getContext('2d');

// not needing when dynamically resizing canvas instead
// let startX = 300; // X-coordinate of the triangle's starting point
// let startY = 300; // Y-coordinate of the triangle's starting point
// const size = 200; // Length of the triangle's sides

let iterations = 11; // Number of iterations to display
const lineWidth = .7;
const strokeColors = palettes.palette1; // Assigning palette to strokeColors
let colorIndex = 0;

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

// infoBox - used for displaying canvas/display size info
const infoBox = document.getElementById("infoBox");
function toggleInfoBox() {
  // Toggle the visibility of the infoBox
  infoBox.style.display = infoBox.style.display === "none" ? "block" : "none";
  // Update the content of the infoBox with the information from logDisplaySizes()
  infoBox.innerHTML = logDisplaySizes().html;
}
// Add a click event listener to the subhead element to call the function
document.getElementById("subhead").addEventListener("click", toggleInfoBox);
window.addEventListener('resize', updateCanvasSize); // Recenter canvas on window resize
canvas.addEventListener('click', updateCanvasSize);

updateCanvasSize(); // Initialize canvas size

