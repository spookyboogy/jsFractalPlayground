//
// llolearning javascript with fractals
//

import palettes from './colorPalettes.js';

const canvas = document.getElementById('fractalCanvas');
const ctx = canvas.getContext('2d');

const pyramidContainer = document.getElementById('pyramidContainer');

let startX = 300; // X-coordinate of the triangle's starting point
let startY = 300; // Y-coordinate of the triangle's starting point
const size = 200; // Length of the triangle's sides
const iterations = 9; // Number of iterations to display

const { palette4 } = palettes; // Access palette4 directly
const strokeColors = palettes.palette4; // Assign palette4 to strokeColors

let colorIndex = 0;

async function drawFractal(x, y, size, iterations, colorIndex) {
  if (iterations === 0) {
    // Base case: Stop recursion when iterations reach 0
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size, y);
    ctx.lineTo(x + size / 2, y + (Math.sqrt(3) * size) / 2);
    ctx.closePath();
					// ctx.strokeStyle = '#ffffff'; // Set stroke color to white
		ctx.strokeStyle = strokeColors[colorIndex % strokeColors.length];
		ctx.lineWidth = 0.2; // 
    ctx.stroke();
  } else {
    // Recursive case: Generate three smaller triangles
		await drawFractalStep(x, y, size, iterations, colorIndex);
	}
}

// async function drawSecondFractal(x, y, size, iterations, colorIndex) {
//   // Calculate the shifted coordinates
//   const shiftedX = x + 20;
//   const shiftedY = y + 20;
// 
//   // Draw the second fractal with the shifted coordinates
//   await drawFractal(shiftedX, shiftedY, size, iterations, colorIndex);
// }


async function drawFractalStep(x, y, size, iterations, colorIndex) {

    await new Promise((resolve) => setTimeout(resolve, 0.0001)); // ms
				
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
    
    //   ctx.clearRect(0, 0, canvas.width, canvas.height);

    const containerWidth = canvas.parentNode.clientWidth;
    const containerHeight = canvas.parentNode.clientHeight;
    const canvasSize = Math.min(containerWidth, containerHeight);
  
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const triangleHeight = (Math.sqrt(3) * canvasSize) / 2;

    const startX = canvas.width / 2 - canvasSize / 2;
    const startY = canvas.height / 2 - triangleHeight / 2;

    await drawFractal(startX, startY, canvasSize, iterations, colorIndex);

    // // Draw the second fractal
    // const secondStartX = startX + 20;
    // const secondStartY = startY + 20;
    // await drawSecondFractal(secondStartX, secondStartY, size, iterations, 0);
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

var msg = "hellooo?";
console.log(msg);
console.log("\nHell?\n");

printPyramid(9);

updateCanvasSize(); // Initialize canvas size
window.addEventListener('resize', updateCanvasSize); // Recenter canvas on window resize

