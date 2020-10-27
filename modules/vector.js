function normalize(vec) {
  let len = Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2]);
  vec[0] = vec[0] / len;
  vec[1] = vec[1] / len;
  vec[2] = vec[2] / len;
  if (vec[3]) vec[3] = 1;
  return vec;
}

function flat_shade_normal(v1, v2, v3, v4) {
  v1[0] += v2[0] + v3[0];
  v1[2] += v2[2] + v3[2];
  v1[1] += v2[1] + v3[1];
  if (v1[3]) v1[3] += v2[3] + v3[3];

  if (v4) v1[0] += v4[0];
  if (v4) v1[1] += v4[1];
  if (v4) v1[2] += v4[2];
  if (v4 && v1[3]) v1[3] += v4[3];

  return normalize(v1);
}

export { normalize, flat_shade_normal };
