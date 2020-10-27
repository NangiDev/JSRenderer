function Vert(x, y, z, w) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.w = w;
}

Vert.prototype.toString = function () {
  return `x: ${this.x}, y: ${this.y}, z: ${this.z}, w: ${this.w}`;
};

export { Vert };
