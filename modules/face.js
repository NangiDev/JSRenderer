function Face(i, j, k, l) {
  if (i) this.i = i.split("/")[0] - 1;
  if (j) this.j = j.split("/")[0] - 1;
  if (k) this.k = k.split("/")[0] - 1;
  if (l) this.l = l.split("/")[0] - 1;
}

Face.prototype.toString = function () {
  return `i: ${this.i}, j: ${this.j}, k: ${this.k}, l: ${this.l}`;
};

export { Face };
