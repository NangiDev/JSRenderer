const { expect } = require("@jest/globals");
const esmImport = require("esm")(module);

const { multiplyPoint, multiplyMatrix } = esmImport("../modules/math");

describe("Matrix", function () {
  test("multiply by point", function () {
    var input_point = [17, 18, 19, 20];
    var matrix = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];

    var output_point = [190, 486, 782, 1078];
    expect(multiplyPoint(matrix, input_point)).toMatchObject(output_point);
  });

  test("multiply by matrix", function () {
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
    
    expect(multiplyMatrix(matrix_a, matrix_b)).toMatchObject(matrix_c);
  });
});
