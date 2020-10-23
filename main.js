import { multiplyPoint, multiplyMatrix } from "./modules/math.js";

var canvas = document.getElementById("viewport"),
  ctx = canvas.getContext("2d");

function Vert(x, y, z, w) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.w = w;
}

Vert.prototype.toString = function () {
  return `x: ${this.x}, y: ${this.y}, z: ${this.z}, w: ${this.w}`;
};

var ModelMatrix = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

var WorldMatrix = [
  [1, 0, 0, 0],
  [0, -1, 0, 0],
  [0, 0, 1, -10],
  [0, 0, 0, 1],
];

var far = 100;
var near = 0.1;
var ratio = { w: 16, h: 10 };
var fovY = 50;
var PerspectiveMatrix = [
  [Math.atan(((ratio.w / ratio.h) * fovY) / 2), 0, 0, 0],
  [0, Math.atan(fovY / 2), 0, 0],
  [0, 0, -(far + near) / (far - near), -((2 * (near * far)) / (far - near))],
  [0, 0, -1, 0],
];

var OrthographicMatrix = [
  [1 / ratio.w, 0, 0, 0],
  [0, 1 / ratio.h, 0, 0],
  [0, 0, -(2 / (far - near)), -((far + near) / (far - near))],
  [0, 0, 0, 1],
];

var positions = [];

function draw() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  var step = 4;
  for (var i = 0; i < positions.length; i++) {
    var vert = positions[i];
    var x = vert.x / vert.w;
    var y = vert.y / vert.w;
    var z = vert.z / vert.w;
    var w = vert.w;

    var new_x = (x * canvas.width) / (2.0 * w) + canvas.width / 2;
    var new_y = (y * canvas.height) / (2.0 * w) + canvas.height / 2;

    var new_x = x * canvas.width + canvas.width / 2;
    var new_y = y * canvas.height + canvas.height / 2;

    ctx.fillRect(new_x, new_y, 4, 4);
  }
  // var img = new Image();
  // img.src = canvas.toDataURL("image/gif");
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
    canvas.width = (canvas.height / ratio.h) * ratio.w;
  }
  canvas.style.left = window.innerWidth / 2 - canvas.width / 2 + "px";
  canvas.style.top = window.innerHeight / 2 - canvas.height / 2 + "px";
  draw();
};
window.addEventListener("resize", positionCanvas, draw);

var ViewWorldMatrix;
var ModelViewProjMatrix;
var loadFile = function () {
  ViewWorldMatrix = multiplyMatrix(PerspectiveMatrix, WorldMatrix);
  // ViewWorldMatrix = multiplyMatrix(OrthographicMatrix, WorldMatrix);
  ModelViewProjMatrix = multiplyMatrix(ViewWorldMatrix, ModelMatrix);
  // fetch("/assets/suzanne.obj")
  fetch("/assets/cube.obj")
    .then((file) => file.text())
    .then((file) => {
      var text = file.split("\n");
      text.forEach((line) => {
        switch (line.substr(0, line.indexOf(" "))) {
          case "v":
            var coords = line.split(" ").splice(1, 4);
            coords.push("1.0");
            coords = multiplyPoint(ModelViewProjMatrix, coords);
            var vert = new Vert(coords[0], coords[1], coords[2], coords[3]);
            positions.push(vert);
            break;
          default:
            break;
        }
      });
      draw();
    });
};

positionCanvas();
loadFile();
