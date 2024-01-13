// ex1.js
/*
  Contains the logic for generating and drawing a Sierpinski triangle
  and handling user interactions such as clicks and window resizes, etc.
  
  lolearning javascript with fractals
*/

import palettes from './colorPalettes.js';
import { logDisplaySizes } from './debugTools.js';
console.log(palettes);

// const pyramidContainer = document.getElementById('pyramidContainer');
const canvasContainer = document.getElementById('canvasContainer');
const canvas = document.getElementById('fractalCanvas'); //child of canvasContainer
const ctx = canvas.getContext('2d');
const infoBox = document.getElementById("infoBox");
const kaoNashiPath = "url('/resources/kaonashi.gif')";
let opacityDirection = -1; // used for increasing/decreasing canvas opacity 
let alphaDirection = 1 // used for increasing/decreasing canvas::after alpha
let touchStartX = 0; // Initialize touch start variable for handling touch events 
// hasSwiped variable for preventing multiple swipes from being read during one long swipe
// might be better to have a listener/handler for 'touchend' instead
let hasSwiped = false;

let iterations = 11; // Number of iterations to display
let lineWidth = .7; // drawing width of fractal lines
let paletteIndex = 0; // for tracking palette being used
let colorIndex = 0; // for tracking current color of palette
let strokeColors = palettes.palette1; // Assigning initial palette to strokeColors

// impementing configs for when multiple modes are introduced
// let defaultConfig = {
//   iterations : 11, 
//   lineWidth : 0.7,
//   colorIndex : 0,
//   strokeColors : palettes.palette1,
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

    await new Promise((resolve) => setTimeout(resolve, 0.000001)); // ms delay for animation, janky
    // await new Promise(requestAnimationFrame);
        await drawFractal(x, y, size / 2,
                        iterations - 1,
                        colorIndex + 1); 
        await drawFractal(x + size / 2, y, size / 2,
                        iterations - 1,
                        colorIndex + 2); 
        await drawFractal(x + size / 4, y + (Math.sqrt(3) * size) / 4, size / 2,
                        iterations - 1,
                        colorIndex + 3); 
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

    // Should consider separating canvas resizing from drawFractal calls, but works ok this way
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

function switchColorPalette(increment = true) {
  paletteIndex = (paletteIndex + (increment ? 1 : -1) + Object.keys(palettes).length) % Object.keys(palettes).length;
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

function adjustCanvasOpacity(increment = 0.01, minOpacity = 0.50, maxOpacity = 1) {
  const currentOpacity = parseFloat(window.getComputedStyle(canvas).opacity);
  if (currentOpacity <= minOpacity || currentOpacity >= maxOpacity) {
    opacityDirection *= -1
  }
  // Calculate new opacity and make sure it stays in range
  let newOpacity = currentOpacity + opacityDirection * increment;
  newOpacity = Math.max(minOpacity, Math.min(newOpacity, maxOpacity));
  // // Debugging information
  console.log(`Canvas opacity : ${newOpacity}`)
  // Set the new opacity value
  canvas.style.opacity = newOpacity.toFixed(4);
}

function adjustBackgroundAlpha({ 
  increment = 0.01, 
  minAlpha = 0, 
  maxAlpha = 1, 
  init = false, 
  defaultValue = 0.5,
} = {}) {
  let newAlpha;

  if (!init) {
    const _currentAlpha = getComputedStyle(canvas).getPropertyValue("--alpha");
    // // Get the current alpha value from the pseudo-element
    const currentAlpha = parseFloat(_currentAlpha);
    // Check if the adjustment direction needs to be flipped
    if (currentAlpha <= minAlpha || currentAlpha >= maxAlpha) {
      alphaDirection *= -1;
    }
    // Calculate the new alpha value
    newAlpha = currentAlpha + alphaDirection * increment;
  } else {
    // initializing, need to figure out why default css value doesn't auto-load
    newAlpha = defaultValue;
  }
  
  // Ensure the alpha value stays within range
  newAlpha = Math.max(minAlpha, Math.min(newAlpha, maxAlpha)).toFixed(3);
  // Set the new rgba alpha value using the CSS variable --alpha
  canvas.style.setProperty('--alpha', newAlpha);
  // idk why but both of these lines are required for it to work correctly
  canvas.style.setProperty("background-color", `rgba(0, 0, 0, ${newAlpha})`);

  console.log(`Canvas::after alpha : ${canvas.style.backgroundColor}`);
  // Force a reflow to apply the style changes immediately
  reflow(canvasContainer);
}

function reflow(elt) {
    elt.offsetHeight;
}

function handleKeyDown(event) {

    if (event.key === 'c') {
      // Swap color palettes
      switchColorPalette();
      updateCanvasSize();
    } else if (event.key === 'b') {
      // Toggle the kaonashi behind the canvas
      toggleKaoNashi();
    } else if (event.key === 'o') {
      // Adjust canvas opacity
      adjustCanvasOpacity(0.01);
    } else if (event.key === 'i') {
      // Adjust alpha of rgba of the shade/curtain between canvas and kaonashi background
      adjustBackgroundAlpha({ increment: 0.05 });
    }
}

function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
}

async function handleTouchMove(event) {
  const touchEndX = event.touches[0].clientX;
  const deltaX = touchEndX - touchStartX;
  // Threshold for considering the swipe as intentional
  const minSwipeDistance = 50;
  if (deltaX > minSwipeDistance) {
    // Right swipe 
    if (!hasSwiped) {
      hasSwiped = true;
      switchColorPalette(true);
      await updateCanvasSize();  // Update the Canvas
    }
  } else if (deltaX < -minSwipeDistance) {
    // Left swipe
    if (!hasSwiped) {
      hasSwiped = true;  // Reset the flag if the swipe distance is less than the threshold
      switchColorPalette(false); // false flag decrements paletteIndex
      await updateCanvasSize();  // Update the Canvas
    }
  } else {
    hasSwiped = false
  }
}

function initializeCanvas() {
    // Initialize the canvas after updating sizes.
    // Should consider separating canvas resizing from drawFractal calls
    // , but works ok this way 
    updateCanvasSize();
    //Initialize (or set?) the rgba alpha of the curtain/shade 
    // ::after canvas, before canvasContainer
    adjustBackgroundAlpha({ init : true });
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

initializeCanvas();



