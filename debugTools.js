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

  // Create a plain text string with the sizes, only displaying int values
  const sizesText = `
    Viewport Size: ${parseInt(viewportWidth)} x ${parseInt(viewportHeight)}
    Canvas Size: ${parseInt(canvasWidth)} x ${parseInt(canvasHeight)}
    Canvas Buffer Size: ${parseInt(canvasBufferWidth)} x ${parseInt(canvasBufferHeight)}
    Device Pixel Ratio: ${parseInt(devicePixelRatio)}
  `;

  // Create an HTML-formatted string with line breaks, also with int values
  const sizesHTML = `
    Viewport Size: ${parseInt(viewportWidth)} x ${parseInt(viewportHeight)}<br>
    Canvas Size: ${parseInt(canvasWidth)} x ${parseInt(canvasHeight)}<br>
    Canvas Buffer Size: ${parseInt(canvasBufferWidth)} x ${parseInt(canvasBufferHeight)}<br>
    Device Pixel Ratio: ${parseInt(devicePixelRatio)}
  `;

  // Log the plain text sizes to the console
  console.log(sizesText);

  // Return an object with both plain text and HTML-formatted strings
  return { text: sizesText, html: sizesHTML };
}