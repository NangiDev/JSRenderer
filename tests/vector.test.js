const { expect } = require("@jest/globals");
const esmImport = require("esm")(module);

const Vector = esmImport("../modules/vector.js");

describe("Math", function () {
  test("Normalize a vector3", () => {
    let vector = Vector.normalize([5, 3, 7]);
    let normalized = [
      0.5488212999484517,
      0.329292779969071,
      0.7683498199278324,
    ];
    expect(vector).toMatchObject(normalized);
  });

  test("Normalize a vector3 with trailing w", () => {
    let vector = Vector.normalize([5, 3, 7, 2]);
    let normalized = [
      0.5488212999484517,
      0.329292779969071,
      0.7683498199278324,
      1,
    ];
    expect(vector).toMatchObject(normalized);
  });

  test("Return flat shade normal vector for 4 vector3", () => {
    let vector = Vector.flat_shade_normal(
      [5, 3, 7],
      [6, 4, 8],
      [7, 5, 9],
      [8, 6, 1]
    );
    let flat = [0.644980619863884, 0.4465250445211505, 0.6201736729460423];
    expect(vector).toMatchObject(flat);
  });

  test("Return flat shade normal vector for 3 vector3", () => {
    let vector = Vector.flat_shade_normal([5, 3, 7], [6, 4, 8], [7, 5, 9]);
    let flat = [0.5570860145311557, 0.3713906763541038, 0.7427813527082076];
    expect(vector).toMatchObject(flat);
  });

  test("Return flat shade normal vector for 4 vector3 with trailing w", () => {
    let vector = Vector.flat_shade_normal(
      [5, 3, 7, 2],
      [6, 4, 8, 3],
      [7, 5, 9, 4],
      [8, 6, 1, 5]
    );
    let flat = [0.644980619863884, 0.4465250445211505, 0.6201736729460423, 1];
    expect(vector).toMatchObject(flat);
  });

  test("Return flat shade normal vector for 3 vector3 with trailing w", () => {
    let vector = Vector.flat_shade_normal(
      [5, 3, 7, 2],
      [6, 4, 8, 3],
      [7, 5, 9, 4]
    );
    let flat = [0.5570860145311557, 0.3713906763541038, 0.7427813527082076, 1];
    expect(vector).toMatchObject(flat);
  });
});
