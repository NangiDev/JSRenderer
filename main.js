import * as Matrix from "./modules/matrix.js";
import * as Face from "./modules/face.js";
import * as Camera from "./modules/camera.js";
import * as Canvas from "./modules/canvas.js";

var ModelMatrix = Matrix.IDENTITY_MATRIX;

var WorldMatrix = Matrix.inverse(
  Matrix.translate(Matrix.rotate(Matrix._new(), [0, 0, 1], 180), [0, 0, -7])
);

var ViewWorldMatrix = Matrix.multiply_matrix(
  Camera.PerspectiveMatrix,
  // Camera.OrthographicMatrix,
  WorldMatrix
);

var loadFile = function () {
  var ModelViewProjMatrix = Matrix.multiply_matrix(
    ViewWorldMatrix,
    ModelMatrix
  );
  return (
    fetch("/assets/suzanne.obj")
      // fetch("/assets/cube.obj")
      .then((file) => file.text())
      .then((file) => {
        var text = file.split("\n");
        text.forEach((line) => {
          switch (line.substr(0, line.indexOf(" "))) {
            case "v":
              var coords = line.split(" ").splice(1, 4);
              coords.push("1.0");
              coords = Matrix.multiply_point(ModelViewProjMatrix, coords);
              Canvas.positions.push([
                coords[0],
                coords[1],
                coords[2],
                coords[3],
              ]);
              break;
            case "f":
              var data = line.split(" ").splice(1, 4);
              var face = new Face.Face(data[0], data[1], data[2], data[3]);
              Canvas.faces.push(face);
              break;
            default:
              break;
          }
        });
      })
  );
};

function loop() {
  var i = setInterval(() => {
    Canvas.draw();
    ModelMatrix = Matrix.rotate(ModelMatrix, [0, 1, 0], 5);
    Canvas.positions.length = 0;
    Canvas.faces.length = 0;
    loadFile();
  }, 50);
}

loadFile().then(() => {
  Canvas.positionCanvas();
  loop();
});
