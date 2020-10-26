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

function get_determinant_2x2(m) {
  return m[0][0] * m[1][1] - m[0][1] * m[1][0];
}

function get_determinant_3x3(m) {
  return (
    m[0][0] *
      get_determinant_2x2([
        [m[1][1], m[1][2]],
        [m[2][1], m[2][2]],
      ]) -
    m[0][1] *
      get_determinant_2x2([
        [m[1][0], m[1][2]],
        [m[2][0], m[2][2]],
      ]) +
    m[0][2] *
      get_determinant_2x2([
        [m[1][0], m[1][1]],
        [m[2][0], m[2][1]],
      ])
  );
}

function get_determinant_4x4(m) {
  return (
    m[0][0] *
      get_determinant_3x3([
        [m[1][1], m[1][2], m[1][3]],
        [m[2][1], m[2][2], m[2][3]],
        [m[3][1], m[3][2], m[3][3]],
      ]) -
    m[0][1] *
      get_determinant_3x3([
        [m[1][0], m[1][2], m[1][3]],
        [m[2][0], m[2][2], m[2][3]],
        [m[3][0], m[3][2], m[3][3]],
      ]) +
    m[0][2] *
      get_determinant_3x3([
        [m[1][0], m[1][1], m[1][3]],
        [m[2][0], m[2][1], m[2][3]],
        [m[3][0], m[3][1], m[3][3]],
      ]) -
    m[0][3] *
      get_determinant_3x3([
        [m[1][0], m[1][1], m[1][2]],
        [m[2][0], m[2][1], m[2][2]],
        [m[3][0], m[3][1], m[3][2]],
      ])
  );
}

function transpose(m) {
  var res = _new();

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      res[i][j] = m[j][i];
    }
  }

  return res;
}

function createOrthographic(w, h, near, far) {
  var res = _new();

  var right = w / 2;
  var left = -right;
  var top = h / 2;
  var bottom = -top;

  res[0][0] = 2.0 / (right - left);
  res[1][1] = 2.0 / (top - bottom);
  res[2][2] = 2.0 / (near - far);

  res[0][3] += (left + right) / (left - right);
  res[1][3] += (bottom + top) / (bottom - top);
  res[2][3] += (near + far) / (near - far);

  return res;
}
function createPerspective(fovy, ratio, near, far) {
  let result = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  var e = 1 / Math.tan(to_radians(0.5 * fovy));

  result[0][0] += e / ratio;
  result[1][1] += e;
  result[2][2] += (near + far) / (near - far);
  result[3][2] += 1;
  result[3][3] += (2 * near * far) / (near - far);

  return result;
}

// Copied from http://blog.acipo.com/matrix-inversion-in-javascript/
// Returns the inverse of matrix `M`.
function inverse(M) {
  // I use Guassian Elimination to calculate the inverse:
  // (1) 'augment' the matrix (left) by the identity (on the right)
  // (2) Turn the matrix on the left into the identity by elemetry row ops
  // (3) The matrix on the right is the inverse (was the identity matrix)
  // There are 3 elemtary row ops: (I combine b and c in my code)
  // (a) Swap 2 rows
  // (b) Multiply a row by a scalar
  // (c) Add 2 rows

  //if the matrix isn't square: exit (error)
  if (M.length !== M[0].length) {
    return;
  }

  //create the identity matrix (I), and a copy (C) of the original
  var i = 0,
    ii = 0,
    j = 0,
    dim = M.length,
    e = 0,
    t = 0;
  var I = [],
    C = [];
  for (i = 0; i < dim; i += 1) {
    // Create the row
    I[I.length] = [];
    C[C.length] = [];
    for (j = 0; j < dim; j += 1) {
      //if we're on the diagonal, put a 1 (for identity)
      if (i == j) {
        I[i][j] = 1;
      } else {
        I[i][j] = 0;
      }

      // Also, make the copy of the original
      C[i][j] = M[i][j];
    }
  }

  // Perform elementary row operations
  for (i = 0; i < dim; i += 1) {
    // get the element e on the diagonal
    e = C[i][i];

    // if we have a 0 on the diagonal (we'll need to swap with a lower row)
    if (e == 0) {
      //look through every row below the i'th row
      for (ii = i + 1; ii < dim; ii += 1) {
        //if the ii'th row has a non-0 in the i'th col
        if (C[ii][i] != 0) {
          //it would make the diagonal have a non-0 so swap it
          for (j = 0; j < dim; j++) {
            e = C[i][j]; //temp store i'th row
            C[i][j] = C[ii][j]; //replace i'th row by ii'th
            C[ii][j] = e; //repace ii'th by temp
            e = I[i][j]; //temp store i'th row
            I[i][j] = I[ii][j]; //replace i'th row by ii'th
            I[ii][j] = e; //repace ii'th by temp
          }
          //don't bother checking other rows since we've swapped
          break;
        }
      }
      //get the new diagonal
      e = C[i][i];
      //if it's still 0, not invertable (error)
      if (e == 0) {
        return;
      }
    }

    // Scale this row down by e (so we have a 1 on the diagonal)
    for (j = 0; j < dim; j++) {
      C[i][j] = C[i][j] / e; //apply to original matrix
      I[i][j] = I[i][j] / e; //apply to identity
    }

    // Subtract this row (scaled appropriately for each row) from ALL of
    // the other rows so that there will be 0's in this column in the
    // rows above and below this one
    for (ii = 0; ii < dim; ii++) {
      // Only apply to other rows (we want a 1 on the diagonal)
      if (ii == i) {
        continue;
      }

      // We want to change this element to 0
      e = C[ii][i];

      // Subtract (the row above(or below) scaled by e) from (the
      // current row) but start at the i'th column and assume all the
      // stuff left of diagonal is 0 (which it should be if we made this
      // algorithm correctly)
      for (j = 0; j < dim; j++) {
        C[ii][j] -= e * C[i][j]; //apply to original matrix
        I[ii][j] -= e * I[i][j]; //apply to identity
      }
    }
  }

  //we've done all operations, C should be the identity
  //matrix I should be the inverse:
  return I;
}

export {
  IDENTITY_MATRIX,
  _new,
  scale,
  rotate,
  translate,
  get_rotation_matrix,
  get_determinant_2x2,
  get_determinant_3x3,
  get_determinant_4x4,
  createOrthographic,
  createPerspective,
  multiply_point,
  multiply_matrix,
  inverse,
  transpose,
  to_radians,
};
