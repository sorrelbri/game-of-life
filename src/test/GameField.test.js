import GameField from "../components/GameField";

describe("Game Field", () => {
  test("smoke test", () => {
    expect(new GameField([])).toEqual({ map: {} });
  });
});

describe("Game Field seeds living Cells", () => {
  const gameField = new GameField([
    [0, 1, 0],
    [1, 0, 1],
  ]);
  [("0-1", "1-0", "1-2")].forEach((key) => {
    test(`${key} should equal living Cell`, () => {
      expect(gameField.map[key].living).toEqual(true);
    });
  });
  ["0-0", "0-2", "1-1"].forEach((key) => {
    test(`${key} should equal undefined`, () => {
      expect(gameField.map[key]).toEqual(undefined);
    });
  });
});
