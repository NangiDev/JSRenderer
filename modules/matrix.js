const IDENTITY_MATRIX = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

function _new() {
  let identity = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];

  return identity.map((x) => x);
}

function scale(m, scale) {
  m[0][0] *= scale[0];
  m[1][1] *= scale[1];
  m[2][2] *= scale[2];
  return m;
}

function translate(m, translation) {
  m[0][3] += translation[0];
  m[1][3] += translation[1];
  m[2][3] += translation[2];
  return m;
}

function get_rotation_matrix(axis, angle) {
  let rot = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 1],
  ];
  let radian = to_radians(angle);
  let cosine = Math.cos(radian);
  let sine = Math.sin(radian);
  let omcosine = 1 - cosine;

  let x = axis[0];
  let y = axis[1];
  let z = axis[2];

  rot[0][0] += x * x * omcosine + cosine;
  rot[0][1] += x * y * omcosine + z * sine;
  rot[0][2] += x * z * omcosine - y * sine;

  rot[1][0] += y * x * omcosine - z * sine;
  rot[1][1] += y * y * omcosine + cosine;
  rot[1][2] += y * z * omcosine + x * sine;

  rot[2][0] += z * x * omcosine + y * sine;
  rot[2][1] += z * y * omcosine - x * sine;
  rot[2][2] += z * z * omcosine + cosine;

  return rot;
}

function rotate(matrix, axis, angle) {
  return multiply_matrix(get_rotation_matrix(axis, angle), matrix);
}

function to_radians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

function multiply_point(matrix, point) {
  var result = [0, 0, 0, 0];

  for (let i = 0; i < 4; i++) {
    result[i] += point[0] * matrix[i][0];
    result[i] += point[1] * matrix[i][1];
    result[i] += point[2] * matrix[i][2];
    result[i] += point[3] * matrix[i][3];
  }

  return result;
}

function multiply_matrix(matrix_a, matrix_b) {
  let result = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  for (let i = 0; i < 4; i++) {
    var point = [
      matrix_b[0][i],
      matrix_b[1][i],
      matrix_b[2][i],
      matrix_b[3][i],
    ];
    var col = multiply_point(matrix_a, point);
    result[0][i] = col[0];
    result[1][i] = col[1];
    result[2][i] = col[2];
    result[3][i] = col[3];
  }

  return result;
}

export {
  IDENTITY_MATRIX,
  _new,
  scale,
  rotate,
  translate,
  get_rotation_matrix,
  multiply_point,
  multiply_matrix,
  to_radians,
};
