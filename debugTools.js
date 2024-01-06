// debugTools.js

export function logDisplaySizes() {
    // Viewport size
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  
    // Canvas size (assuming you have a canvas element with id "fractalCanvas")
    const canvas = document.getElementById('fractalCanvas');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Drawing buffer size
    const canvasBufferWidth = canvas.width * (window.devicePixelRatio || 1);
    const canvasBufferHeight = canvas.height * (window.devicePixelRatio || 1);
  
    // Get dpr
    const devicePixelRatio = window.devicePixelRatio || 1;

    // Log the sizes to the console
    console.log(`\nViewport Size: ${viewportWidth} x ${viewportHeight}`);
    console.log(`Canvas Size: ${canvasWidth} x ${canvasHeight}`);
    console.log(`Canvas Buffer Size: ${canvasBufferWidth} x ${canvasBufferHeight}`);
    console.log(`Device Pixel Ratio: ${devicePixelRatio}`);
  }
  