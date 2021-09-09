"use script";

const color = document.querySelector("#selected_color");

window.addEventListener("DOMContentLoaded", getColor);

function getColor() {
  color.addEventListener("input", delegatorColor);
}

function delegatorColor(event) {
  const rgbObject = convertHexToRgb(event.target.value);
  showRgb(rgbObject);
  const cssColor = convertRgbToCss(rgbObject);
  showBox(cssColor);
  const hexStr = convertRgbToHex(rgbObject);
  showHex(hexStr);
  const hslStr = convertRgbToHsl(rgbObject.r, rgbObject.g, rgbObject.b);
  showHsl(hslStr);
}

function showBox(css) {
  document.querySelector("#color_box").style.background = css;
}

function showHex(hex) {
  document.querySelector("#HEX").textContent = `HEX: ${hex}`;
}

function showRgb(object) {
  document.querySelector("#RGB").textContent = `RGB: ${object.r}, ${object.g}, ${object.b}`;
}

function showHsl(hex) {
  document.querySelector("#HSL").textContent = `HSL: ${hex.h} ${hex.s}% ${hex.l}%`;
}

// CONVERTERS

function convertHexToRgb(hex) {
  console.log(hex);
  rgb = {
    r: parseInt(hex.substring(1, 3), 16),
    g: parseInt(hex.substring(3, 5), 16),
    b: parseInt(hex.substring(5, 7), 16),
  };
  return rgb;
}

function convertRgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  // Rounding to even numbers
  h = Math.round(h);
  s = Math.round(s);
  l = Math.round(l);

  console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing

  return { h, s, l };
}

function convertRgbToHex(rgb) {
  let r = rgb.r.toString(16);
  let g = rgb.g.toString(16);
  let b = rgb.b.toString(16);
  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  const hex = "#" + r + g + b;

  // https://css-tricks.com/converting-color-spaces-in-javascript/

  return hex;
}

function convertRgbToCss(rgb) {
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}
