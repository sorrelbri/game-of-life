import GameField from "../components/GameField";

describe("Game Field", () => {
  test("smoke test", () => {
    expect(new GameField([])).toEqual({ map: {} });
  });
});

describe("Game Field seeds living Cells with array", () => {
  const gameArraySeed = new GameField({
    fieldArray: [
      [0, 1, 0],
      [1, 0, 1],
    ],
  });
  const gameMapSeed = new GameField({
    fieldMap: {
      "0-0": true,
      "0-2": true,
      "1-1": true,
    },
  });
  ["0-1", "1-0", "1-2"].forEach((key) => {
    test(`Array seed: ${key} should equal living Cell`, () => {
      expect(gameArraySeed.map[key].living).toEqual(true);
    });
    test(`Map seed: ${key} should equal undefined`, () => {
      expect(gameMapSeed.map[key]).toEqual(undefined);
    });
  });
  ["0-0", "0-2", "1-1"].forEach((key) => {
    test(`Array seed: ${key} should equal undefined`, () => {
      expect(gameArraySeed.map[key]).toEqual(undefined);
    });
    test(`Map seed: ${key} should equal living Cell`, () => {
      expect(gameMapSeed.map[key].living).toEqual(true);
    });
  });
});
