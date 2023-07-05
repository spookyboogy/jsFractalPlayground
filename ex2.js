function generateFractal(colorPalette, iterations, lineWidth) {
  const canvas = document.getElementById('fractalCanvas');
  const ctx = canvas.getContext('2d');

  const pyramidContainer = document.getElementById('pyramidContainer');

  let startX = 300; // X-coordinate of the triangle's starting point
  let startY = 300; // Y-coordinate of the triangle's starting point
  const size = 200; // Length of the triangle's sides

  let colorIndex = 0;

  async function drawFractal(x, y, size, iterations, colorIndex) {
    if (iterations === 0) {
      // Base case: Stop recursion when iterations reach 0
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + size, y);
      ctx.lineTo(x + size / 2, y + (Math.sqrt(3) * size) / 2);
      ctx.closePath();
      ctx.strokeStyle = colorPalette[colorIndex % colorPalette.length];
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    } else {
      // Recursive case: Generate three smaller triangles
      await drawFractalStep(x, y, size, iterations, colorIndex);
    }
  }

  async function drawFractalStep(x, y, size, iterations, colorIndex) {
    await new Promise((resolve) => setTimeout(resolve, 0.0001)); // ms

    await drawFractal(x, y, size / 2, iterations - 1, colorIndex + 1);
    await drawFractal(x + size / 2, y, size / 2, iterations - 1, colorIndex + 2);
    await drawFractal(x + size / 4, y + (Math.sqrt(3) * size) / 4, size / 2, iterations - 1, colorIndex + 3);
  }

  async function updateCanvasSize() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const containerWidth = canvas.parentNode.clientWidth;
    const containerHeight = canvas.parentNode.clientHeight;
    const canvasSize = Math.min(containerWidth, containerHeight);

    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const triangleHeight = (Math.sqrt(3) * canvasSize) / 2;

    const startX = canvas.width / 2 - canvasSize / 2;
    const startY = canvas.height / 2 - triangleHeight / 2;

    await drawFractal(startX, startY, canvasSize, iterations, colorIndex);
  }

  // Initialize canvas size and add event listener
  updateCanvasSize();
  window.addEventListener('resize', updateCanvasSize);
  canvas.addEventListener('click', updateCanvasSize);
}

// Example usage
const colorPalette = palettes.palette2; // Example color palette
const iterations = 8; // Example number of iterations
const lineWidth = 0.75; // Example line width

generateFractal(colorPalette, iterations, lineWidth);

