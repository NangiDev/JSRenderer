function multiplyPoint(matrix, point) {
  var result = [0, 0, 0, 0];
  matrix.forEach((col) => {
    for (let i = 0; i < col.length; i++) {
      result[i] += point[i] * col[i];
    }
  });

  return result;
}

function multiplyMatrix(a, b) {
  let result = [];

  b.forEach((row) => {
    result.push(multiplyPoint(a, row));
  });

  return result;
}

export { multiplyPoint, multiplyMatrix };
