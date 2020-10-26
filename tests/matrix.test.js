const { expect } = require("@jest/globals");
const esmImport = require("esm")(module);

const Matrix = esmImport("../modules/matrix.js");

describe("Matrix", function () {
  test("Getting a identity matrix, when calling new", () => {
    expect(Matrix._new()).toMatchObject(Matrix.IDENTITY_MATRIX);
  });

  test("Getting a scaled matrix, when calling scale", () => {
    let scaled = Matrix.scale(Matrix._new(), [2, 3, 4]);
    expect(scaled).toMatchObject([
      [2, 0, 0, 0],
      [0, 3, 0, 0],
      [0, 0, 4, 0],
      [0, 0, 0, 1],
    ]);
  });

  test("Getting a rotated matrix, when calling rotate", () => {
    let rotated = Matrix.rotate(Matrix._new(), [1, 0, 0], 35);
    expect(rotated).toMatchObject([
      [1, 0, 0, 0],
      [0, 0.8191520442889918, 0.573576436351046, 0],
      [0, -0.573576436351046, 0.8191520442889918, 0],
      [0, 0, 0, 1],
    ]);
  });

  test("Getting a translated matrix, when calling translate", () => {
    let translated = Matrix.translate(Matrix._new(), [10, 20, 30]);
    expect(translated).toMatchObject([
      [1, 0, 0, 10],
      [0, 1, 0, 20],
      [0, 0, 1, 30],
      [0, 0, 0, 1],
    ]);
  });

  test("Getting a correct perspective view matrix", () => {
    var fovy = 50;
    var width = 4;
    var height = 4;
    var ratio = width / height;
    var near = 1;
    var far = 20;

    let pers_matrix = Matrix.createPerspective(fovy, ratio, near, far);

    expect(pers_matrix).toMatchObject([
      [2.1445069205095586, 0, 0, 0],
      [0, 2.1445069205095586, 0, 0],
      [0, 0, -1.105263157894737, 0],
      [0, 0, 1, -2.1052631578947367],
    ]);
  });

  test("Getting a correct orthographic view matrix", () => {
    var width = 4;
    var height = 4;
    var near = 1;
    var far = 20;

    let ortho_matrix = Matrix.createOrthographic(width, height, near, far);

    expect(ortho_matrix).toMatchObject([
      [0.5, 0, 0, 0],
      [0, 0.5, 0, 0],
      [0, 0, -0.10526315789473684, -1.105263157894737],
      [0, 0, 0, 1],
    ]);
  });
});

describe("Math", function () {
  test("Degree to radians", () => {
    var degrees = 35;
    var radians = 0.6108652381980153;

    expect(Matrix.to_radians(degrees)).toBe(radians);
  });

  test("Matrix multiply by point", () => {
    var input_point = [17, 18, 19, 20];
    var matrix = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];

    var output_point = [190, 486, 782, 1078];
    expect(Matrix.multiply_point(matrix, input_point)).toMatchObject(
      output_point
    );
  });

  test("Matrix multiply by matrix", () => {
    var matrix_a = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    var matrix_b = [
      [16, 15, 14, 13],
      [12, 11, 10, 9],
      [8, 7, 6, 5],
      [4, 3, 2, 1],
    ];
    var matrix_c = [
      [80, 70, 60, 50],
      [240, 214, 188, 162],
      [400, 358, 316, 274],
      [560, 502, 444, 386],
    ];

    expect(Matrix.multiply_matrix(matrix_a, matrix_b)).toMatchObject(matrix_c);
  });

  test("Transpose matrix", () => {
    var matrix = [
      [-4, 2, -16, 6],
      [-1, 1, -2, 1],
      [2, 0, 4, -2],
      [1, -1, 4, -1],
    ];
    var transposed = [
      [-4, -1, 2, 1],
      [2, 1, 0, -1],
      [-16, -2, 4, 4],
      [6, 1, -2, -1],
    ];
    expect(Matrix.transpose(matrix)).toMatchObject(transposed);
  });

  test("Get determinant for 2x2 matrix", () => {
    var matrix = [
      [4, 6],
      [3, 8],
    ];
    var determinant = 14;
    expect(Matrix.get_determinant_2x2(matrix)).toBe(determinant);
  });

  test("Get determinant for 3x3 matrix", () => {
    var matrix = [
      [6, 1, 1],
      [4, -2, 5],
      [2, 8, 7],
    ];
    var determinant = -306;
    expect(Matrix.get_determinant_3x3(matrix)).toBe(determinant);
  });

  test("Get determinant for 4x4 matrix", () => {
    var matrix = [
      [1, 0, 0, 1],
      [0, 2, 1, 2],
      [2, 1, 0, 1],
      [2, 0, 1, 4],
    ];
    var determinant = 2;
    expect(Matrix.get_determinant_4x4(matrix)).toBe(determinant);
  });

  test("Inverse matrix", () => {
    var matrix = [
      [1, 0, 0, 1],
      [0, 2, 1, 2],
      [2, 1, 0, 1],
      [2, 0, 1, 4],
    ];
    var inverse = [
      [-2, -0.5, 1, 0.5],
      [1, 0.5, 0, -0.5],
      [-8, -1, 2, 2],
      [3, 0.5, -1, -0.5],
    ];

    expect(Matrix.inverse(matrix)).toMatchObject(inverse);
    expect(
      Matrix.multiply_matrix(matrix, Matrix.inverse(matrix))
    ).toMatchObject(Matrix.IDENTITY_MATRIX);
    expect(
      Matrix.multiply_matrix(Matrix.inverse(matrix), matrix)
    ).toMatchObject(Matrix.IDENTITY_MATRIX);
  });

  test("Getting a x-axis rotate matrix, when calling get_rotation_matrix with 1 on x-axis", () => {
    let axis = [1, 0, 0];
    let angle = 35;
    let rotated = Matrix.get_rotation_matrix(axis, angle);
    expect(rotated).toMatchObject([
      [1, 0, 0, 0],
      [0, 0.8191520442889918, 0.573576436351046, 0],
      [0, -0.573576436351046, 0.8191520442889918, 0],
      [0, 0, 0, 1],
    ]);
  });

  test("Getting a y-axis rotate matrix, when calling get_rotation_matrix with 1 on y-axis", () => {
    let axis = [0, 1, 0];
    let angle = 35;
    let rotated = Matrix.get_rotation_matrix(axis, angle);
    expect(rotated).toMatchObject([
      [0.8191520442889918, 0, -0.573576436351046, 0],
      [0, 1, 0, 0],
      [0.573576436351046, 0, 0.8191520442889918, 0],
      [0, 0, 0, 1],
    ]);
  });

  test("Getting a z-axis rotate matrix, when calling get_rotation_matrix with 1 on z-axis", () => {
    let axis = [0, 0, 1];
    let angle = 35;
    let rotated = Matrix.get_rotation_matrix(axis, angle);
    expect(rotated).toMatchObject([
      [0.8191520442889918, 0.573576436351046, 0, 0],
      [-0.573576436351046, 0.8191520442889918, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ]);
  });
});
