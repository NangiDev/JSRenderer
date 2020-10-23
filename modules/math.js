function multiplyPoint(matrix, point) {
  var result = [0, 0, 0, 0];

  for (let i = 0; i < 4; i++) {
    result[i] += point[0] * matrix[i][0];
    result[i] += point[1] * matrix[i][1];
    result[i] += point[2] * matrix[i][2];
    result[i] += point[3] * matrix[i][3];
  }

  return result;
}

function multiplyMatrix(matrix_a, matrix_b) {
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
    var col = multiplyPoint(matrix_a, point);
    result[0][i] = col[0];
    result[1][i] = col[1];
    result[2][i] = col[2];
    result[3][i] = col[3];
  }

  return result;
}

export { multiplyPoint, multiplyMatrix };
