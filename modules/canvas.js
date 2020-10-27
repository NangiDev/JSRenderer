import * as Camera from "./camera.js";
import * as Vert from "./vert.js";

var canvas = document.getElementById("viewport"),
  ctx = canvas.getContext("2d");

var positions = [];
var faces = [];

function draw() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";

  faces.forEach((face) => {
    ctx.fillStyle = "#FF004D";
    ctx.beginPath();
    if (face.l) {
      // Four verts, rectangle
      var vert_i = positions[face.i];
      var vert_j = positions[face.j];
      var vert_k = positions[face.k];
      var vert_l = positions[face.l];

      var ix = vert_i.x / vert_i.w;
      var iy = vert_i.y / vert_i.w;
      var jx = vert_j.x / vert_j.w;
      var jy = vert_j.y / vert_j.w;
      var kx = vert_k.x / vert_k.w;
      var ky = vert_k.y / vert_k.w;
      var lx = vert_l.x / vert_l.w;
      var ly = vert_l.y / vert_l.w;

      var new_ix = ix * canvas.width + canvas.width / 2;
      var new_iy = iy * canvas.height + canvas.height / 2;
      var new_jx = jx * canvas.width + canvas.width / 2;
      var new_jy = jy * canvas.height + canvas.height / 2;
      var new_kx = kx * canvas.width + canvas.width / 2;
      var new_ky = ky * canvas.height + canvas.height / 2;
      var new_lx = lx * canvas.width + canvas.width / 2;
      var new_ly = ly * canvas.height + canvas.height / 2;

      ctx.moveTo(new_ix, new_iy);
      ctx.lineTo(new_jx, new_jy);
      ctx.lineTo(new_kx, new_ky);
      ctx.lineTo(new_lx, new_ly);
      ctx.closePath();
    } else {
      // Three verts, triangle
      var vert_i = positions[face.i];
      var vert_j = positions[face.j];
      var vert_k = positions[face.k];

      var ix = vert_i.x / vert_i.w;
      var iy = vert_i.y / vert_i.w;
      var jx = vert_j.x / vert_j.w;
      var jy = vert_j.y / vert_j.w;
      var kx = vert_k.x / vert_k.w;
      var ky = vert_k.y / vert_k.w;

      var new_ix = ix * canvas.width + canvas.width / 2;
      var new_iy = iy * canvas.height + canvas.height / 2;
      var new_jx = jx * canvas.width + canvas.width / 2;
      var new_jy = jy * canvas.height + canvas.height / 2;
      var new_kx = kx * canvas.width + canvas.width / 2;
      var new_ky = ky * canvas.height + canvas.height / 2;

      ctx.moveTo(new_ix, new_iy);
      ctx.lineTo(new_jx, new_jy);
      ctx.lineTo(new_kx, new_ky);
      ctx.closePath();
    }
    ctx.fill();
    ctx.fillStyle = "#000000";
  });

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
