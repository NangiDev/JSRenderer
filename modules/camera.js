import * as Matrix from "./matrix.js";

var far = 100;
var near = 0.1;
var ratio = { w: 16, h: 10 };
var fovY = 50;

var PerspectiveMatrix = Matrix.createPerspective(
  fovY,
  ratio.w / ratio.h,
  near,
  far
);

var OrthographicMatrix = Matrix.createOrthographic(ratio.w, ratio.h, near, far);

export { ratio, PerspectiveMatrix, OrthographicMatrix };
