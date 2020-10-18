var title = document.createElement("title");
title.innerHTML = ".OBJ Renderer";
document.getElementsByTagName("head")[0].appendChild(title);

var canvas = document.createElement("canvas"),
  ctx = canvas.getContext("2d");
document.getElementsByTagName("body")[0].appendChild(canvas);

var positions = [];

function draw() {
  var step = 4;
  for (var i = 0; i < positions.length; i += step) {
    var x = positions[i];
    var y = positions[i + 1];
    var w = -positions[i + 3];
    var new_x = (x * canvas.width) / (2.0 * w) + canvas.width / 2;
    var new_y = (y * canvas.height) / (2.0 * w) + canvas.height / 2;
    ctx.fillRect(new_x, new_y, 4, 4);
  }
}

var positionCanvas = function () {
  canvas.style.position = "absolute";
  canvas.style.borderStyle = "solid";
  canvas.style.borderWidth = 1 + "px";
  if (window.innerWidth < window.innerHeight) {
    canvas.width = window.innerWidth * 0.5;
    canvas.height = (canvas.width / 26) * 20;
  } else {
    canvas.height = window.innerHeight * 0.5;
    canvas.width = (canvas.height / 20) * 26;
  }
  canvas.style.left = window.innerWidth / 2 - canvas.width / 2 + "px";
  canvas.style.top = window.innerHeight / 2 - canvas.height / 2 + "px";
};
window.addEventListener("resize", positionCanvas, draw);

var loadFile = function () {
  fetch("/assets/suzanne.obj")
    .then((file) => file.text())
    .then((file) => {
      var text = file.split("\n");
      text.forEach((line) => {
        switch (line.substr(0, line.indexOf(" "))) {
          case "v":
            var coords = line.split(" ");
            coords.push("1.0");
            positions = positions.concat(coords.splice(1, 4));
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
