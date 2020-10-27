import * as Matrix from "./modules/matrix.js";
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
  Canvas.positions.length = 0;
  Canvas.normals.length = 0;
  Canvas.faces.length = 0;
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
              var faces = line.split(" ").splice(1, 4);
              if (faces[0]) faces[0] = faces[0].split("/");
              if (faces[1]) faces[1] = faces[1].split("/");
              if (faces[2]) faces[2] = faces[2].split("/");
              if (faces[3]) faces[3] = faces[3].split("/");
              var face = [faces[0], faces[1], faces[2], faces[3]];
              Canvas.faces.push(face);
              break;
            case "vn":
              var normals = line.split(" ").splice(1, 4);
              normals.push("1.0");
              normals = Matrix.multiply_point(ModelViewProjMatrix, normals);
              Canvas.normals.push([
                normals[0],
                normals[1],
                normals[2],
                normals[3],
              ]);
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
    loadFile();
  }, 50);
  // clearInterval(i);
}

loadFile().then(() => {
  Canvas.positionCanvas();
  // Canvas.draw();
  loop();
});
