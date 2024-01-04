// 
// llolearning javascript with fractals

import palettes from './colorPalettes.js';
console.log(palettes)

const pyramidContainer = document.getElementById('pyramidContainer');
const canvas = document.getElementById('fractalCanvas');
const ctx = canvas.getContext('2d');

let startX = 300; // X-coordinate of the triangle's starting point
let startY = 300; // Y-coordinate of the triangle's starting point
const size = 200; // Length of the triangle's sides
const iterations = 9; // Number of iterations to display
const lineWidth = .55;
const strokeColors = palettes.palette1; // Assigning palette to strokeColors
let colorIndex = 0;

// let config = {
//   iterations : 7, 
//   lineWidth : 0.7, 
//   strokeColors : palettes.palette1,
//   // ...
// };

// note on setting combos : interesting math related to colorIndex % palette.length 
// palette5 , 8 iterations, 0.6 width
// palette4, 7, .75
// palette2, 8, .75
// palette5, 11, .125
// js note : Accesses palette4 directly using 'destructuring' : const { palette1 } = palettes; // 

async function drawFractal(x, y, size, iterations, colorIndex) {
    if (iterations === 0) {
    // Base case: Stop recursion when iterations reach 0
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x + size / 2, y + (Math.sqrt(3) * size) / 2);
        ctx.closePath();
        ctx.strokeStyle = strokeColors[colorIndex % strokeColors.length];
        ctx.lineWidth = lineWidth; // 
        ctx.stroke();
  } else {
    // Recursive case: Generate three smaller triangles
		await drawFractalStep(x, y, size, iterations, colorIndex);
	}
}

async function drawFractalStep(x, y, size, iterations, colorIndex) {

    await new Promise((resolve) => setTimeout(resolve, 0.0001)); // ms delay. not sure of usefulness
				
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
    
    //   ctx.clearRect(0, 0, canvas.width, canvas.height); // clears canvas

    const containerWidth = canvas.parentNode.clientWidth;
    const containerHeight = canvas.parentNode.clientHeight;
    const canvasSize = Math.min(containerWidth, containerHeight);
  
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const triangleHeight = (Math.sqrt(3) * canvasSize) / 2;

    const startX = canvas.width / 2 - canvasSize / 2;
    const startY = canvas.height / 2 - triangleHeight / 2;

    await drawFractalRange(startX, startY, canvasSize, 1, 7, colorIndex);
    // await drawFractal(startX, startY, canvasSize, iterations, colorIndex);

}


async function drawFractalRange(x, y, size, startIterations, endIterations, colorIndex) {
  for (let iterations = startIterations; iterations <= endIterations; iterations++) {
      await drawFractal(x, y, size, iterations, colorIndex);
      // introduce a delay between iterations for visualization purposes
      await new Promise(resolve => setTimeout(resolve, 200)); // milliseconds
      // set the wait time as a function of the iteration level such that
      // low level iterations have a bigger pause, so that it looks less hurried at the start
  }
}

function printPyramid(baseSize) {
  // Loop through the rows of the pyramid
  for (let row = 1; row <= baseSize; row++) {
    // Print spaces to create an indentation for each row
    let spaces = ' '.repeat(baseSize - row);
    // Print the triangles in each row
    let triangles = '*'.repeat(row * 2 - 1);
    // Combine the spaces and triangles to form the row
    let rowOutput = spaces + triangles;
    // Print the row to the console
    console.log(rowOutput); 
  }
}

updateCanvasSize(); // Initialize canvas size
window.addEventListener('resize', updateCanvasSize); // Recenter canvas on window resize
canvas.addEventListener('click', updateCanvasSize);
// canvas.addEventListener('click', (event) => {
//   const clickedX = event.clientX - canvas.getBoundingClientRect().left;
//   const clickedY = event.clientY - canvas.getBoundingClientRect().top;
//   // Call a function to draw a new fractal centered at (clickedX, clickedY)
//   drawInteractiveFractal(clickedX, clickedY, /* other parameters */);
// });

const msg = "hellooo?";
console.log(msg);
console.log("\nHell?\n");
printPyramid(9);

// todo:
  // for each palette (probably clearing canvas on new palette):
  //   draw fractal of increasing iteration level and proportionally decreasing 
  //   line width. each new iteration level being slightly shifted on the canvas (eg down,left)
  //   refresh canvas


// set up github actions to make pushing updates / deploying to neocities from local repo ez
