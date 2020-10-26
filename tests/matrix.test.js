const { expect } = require("@jest/globals");
const esmImport = require("esm")(module);

const Matrix = esmImport("../modules/matrix.js");

describe("Initialize Matrix", function () {
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
