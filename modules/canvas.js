import * as Camera from "./camera.js";

var canvas = document.getElementById("viewport"),
  ctx = canvas.getContext("2d");

var positions = [];
var faces = [];

function draw() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  for (var i = 0; i < positions.length; i++) {
    var vert = positions[i];
    var x = vert.x / vert.w;
    var y = vert.y / vert.w;
    var z = vert.z / vert.w;
    var w = vert.w;

    var new_x = x * canvas.width + canvas.width / 2;
    var new_y = y * canvas.height + canvas.height / 2;

    ctx.fillRect(new_x, new_y, 2, 2);
  }
}

var positionCanvas = function () {
  canvas.style.position = "absolute";
  canvas.style.borderStyle = "solid";
  canvas.style.borderWidth = 1 + "px";
  if (window.innerWidth < window.innerHeight) {
    canvas.width = window.innerWidth * 0.5;
    canvas.height = (canvas.width / ratio.w) * ratio.h;
  } else {
    canvas.height = window.innerHeight * 0.5;
    canvas.width = (canvas.height / Camera.ratio.h) * Camera.ratio.w;
  }
  canvas.style.left = window.innerWidth / 2 - canvas.width / 2 + "px";
  canvas.style.top = window.innerHeight / 2 - canvas.height / 2 + "px";
  draw();
};
window.addEventListener("resize", positionCanvas, draw);

export { draw, positions, faces, positionCanvas };
