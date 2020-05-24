const Cell = require("../components/Cell");

describe("Cell functionality", () => {
  test("dispatch toggleLiving state should mark living cell dead", () => {
    const cell = new Cell();
    cell.toggleLiving();
    expect(cell.living).toEqual(true);
  });
  test.todo("dispatch toggleLiving state should mark dead cell living");
  test.todo(
    "dispatch add Live Neighbor should increment live neighbors property"
  );
  test.todo(
    "dispatch setLiving should determine life based on neighbors (for living cells)"
  );
  const livingFromLivingStates = new Array(8).map((_, i) =>
    i === 2 || i === 3 ? true : false
  );
  test.todo(
    "dispatch setLiving should determine life based on neighbors (for dead cells)"
  );
  const livingFromDeadStates = new Array(8).map((_, i) =>
    i === 3 ? true : false
  );
  test.todo("dispatch setLiving should reset live neighbors");
});
