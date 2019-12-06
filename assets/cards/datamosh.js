// Datamosh
// Pixelsorting, cobbled together from these sources
// https://github.com/larixk/sort/blob/master/js/script.js
// https://codepen.io/muradkhan101/pen/qVNrOO

// We have to keep this one unique among cards
var sortedCanvas = document.getElementById('datamosh');
var sortedContext = sortedCanvas.getContext('2d');

// Had to use regular canvas
sortedCanvas.width = 300;
sortedCanvas.height = 500;

var width = sortedCanvas.width;
var height = sortedCanvas.height;

// Configuration stuff
let imageSize = 500;
let imageData;
let imageDataArray;
let imageLoaded = false;

let rowWidth;
let maxColumn;
let maxRow;
let loopCount = 0;

// Change these numbers to change the processing
let threshold = -0.45; // Best between -1 and 1
let strength = 0.75; // Don't go above 1-ish
let loops = 50; // Don't overdo this, it's expensive
let images = {
  mesa: 'https://lkpttn-image-bucket.s3.amazonaws.com/mesa.jpg',
  galaxy: 'https://lkpttn-image-bucket.s3.amazonaws.com/galaxy.jpg',
  forest: 'https://lkpttn-image-bucket.s3.amazonaws.com/woods.jpg',
};

// Get started
loadImage(images.forest, afterLoad);

// Take pixels into array (collection)
function loadImage(url, callback) {
  let image = new Image();
  image.crossOrigin = 'Anonymous';
  image.onload = function() {
    // Calculate number of rows, columns
    rowWidth = width * 4;
    maxColumn = rowWidth;
    maxRow = (height - 1) * rowWidth;

    // Draw original canvas
    sortedContext.drawImage(this, 0, 0, width, height);

    // Set up for drawing sorted context
    imageData = sortedContext.getImageData(0, 0, width, height);
    imageDataArray = imageData.data;
    callback();
  };
  image.src = url;
}

function afterLoad() {
  if (!imageLoaded) {
    imageLoaded = true;
    window.requestAnimationFrame(draw);
    console.log('Image loaded');
  }
}

function draw() {
  // Only draw() a number of times equal to loops
  if (loopCount < loops) {
    iterate();
    sortedContext.putImageData(imageData, 0, 0);
    window.requestAnimationFrame(draw);
  } else {
    // Do sharpen
    sharpen(sortedContext, sortedCanvas.width, sortedCanvas.height, 0.7);
    // sortingContext.putImageData(imageData, 0, 0);
    console.log('Done sorting');
  }
  loopCount += 1;
}

function iterate() {
  // Start at 0, loop through rows
  for (var rowIndex = 0; rowIndex < maxRow; rowIndex += rowWidth) {
    var maxY = rowIndex + maxColumn;
    // Move four indicies down the column
    for (var columnIndex = rowIndex; columnIndex < maxY; columnIndex += 4) {
      // Process just on the same column
      processIndexPair(columnIndex, columnIndex + rowWidth);
    }
  }
}

// Compare and recolor two bitmap indices
function processIndexPair(sourceIndex, targetIndex) {
  if (!compare(sourceIndex, targetIndex)) {
    return;
  }

  // Save values before overwriting
  var oldR = imageDataArray[targetIndex],
    oldG = imageDataArray[targetIndex + 1],
    oldB = imageDataArray[targetIndex + 2],
    oldA = imageDataArray[targetIndex + 3];

  // Swap them pixels
  setPixel(
    targetIndex,
    imageDataArray[sourceIndex],
    imageDataArray[sourceIndex + 1],
    imageDataArray[sourceIndex + 2],
    imageDataArray[sourceIndex + 3],
  );
  setPixel(sourceIndex, oldR, oldG, oldB, oldA);
}

function compare(sourceIndex, targetIndex) {
  var oldTotal =
      imageDataArray[targetIndex] +
      imageDataArray[targetIndex + 1] +
      imageDataArray[targetIndex + 2] +
      imageDataArray[targetIndex + 3],
    newTotal =
      imageDataArray[sourceIndex] +
      imageDataArray[sourceIndex + 1] +
      imageDataArray[sourceIndex + 2] +
      imageDataArray[sourceIndex + 3];

  // Which way are we comparing?
  let thresholdInt = Math.floor(Math.pow(threshold, 7) * 3 * 255);
  if (thresholdInt > 0) {
    return oldTotal - newTotal > thresholdInt;
  } else {
    return oldTotal - newTotal < thresholdInt;
  }
}

// Change the color of a pixel in a bitmap with alpha blending
function setPixel(index, r, g, b, alpha) {
  var orgR = imageDataArray[index],
    orgG = imageDataArray[index + 1],
    orgB = imageDataArray[index + 2],
    orgA = imageDataArray[index + 3];

  // Linear interpolation with a
  imageDataArray[index] = orgR + strength * (r - orgR);
  imageDataArray[index + 1] = orgG + strength * (g - orgG);
  imageDataArray[index + 2] = orgB + strength * (b - orgB);
  imageDataArray[index + 3] = orgA + strength * (alpha - orgA);
}

// Sharpen function from Mike Cao
function sharpen(ctx, w, h, mix) {
  var x, sx, sy, r, g, b;
  var dstOff, srcOff, wt, cx, cy, scy, scx;
  var weights = [0, -1, 0, -1, 5, -1, 0, -1, 0],
    katet = Math.round(Math.sqrt(weights.length)),
    half = (katet * 0.5) | 0,
    dstData = ctx.createImageData(w, h),
    dstBuff = dstData.data,
    srcBuff = ctx.getImageData(0, 0, w, h).data,
    y = h;

  while (y--) {
    x = w;
    while (x--) {
      sy = y;
      sx = x;
      dstOff = (y * w + x) * 4;
      r = 0;
      g = 0;
      b = 0;
      a = 0;

      for (cy = 0; cy < katet; cy++) {
        for (cx = 0; cx < katet; cx++) {
          scy = sy + cy - half;
          scx = sx + cx - half;

          if (scy >= 0 && scy < h && scx >= 0 && scx < w) {
            srcOff = (scy * w + scx) * 4;
            wt = weights[cy * katet + cx];

            r += srcBuff[srcOff] * wt;
            g += srcBuff[srcOff + 1] * wt;
            b += srcBuff[srcOff + 2] * wt;
            a += srcBuff[srcOff + 3] * wt;
          }
        }
      }

      dstBuff[dstOff] = r * mix + srcBuff[dstOff] * (1 - mix);
      dstBuff[dstOff + 1] = g * mix + srcBuff[dstOff + 1] * (1 - mix);
      dstBuff[dstOff + 2] = b * mix + srcBuff[dstOff + 2] * (1 - mix);
      dstBuff[dstOff + 3] = srcBuff[dstOff + 3];
    }
  }

  sortedContext.putImageData(dstData, 0, 0);
}
