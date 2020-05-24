import { GameField, fieldStream } from "../components/GameField";

const fieldArray = [
  [0, 1, 0],
  [1, 0, 1],
];

const fieldMap = {
  "0-0": true,
  "0-2": true,
  "1-1": true,
};

describe("Game Field seeds living Cells with array", () => {
  const gameArraySeed = new GameField({ fieldArray });
  const gameMapSeed = new GameField({ fieldMap });
  const streamArraySeed = fieldStream({ fieldArray });
  const streamMapSeed = fieldStream({ fieldMap });

  ["0-1", "1-0", "1-2"].forEach((key) => {
    test(`Array seed: ${key} should equal living Cell`, () => {
      expect(gameArraySeed.map[key].living).toEqual(true);
    });

    test(`Map seed: ${key} should equal undefined`, () => {
      expect(gameMapSeed.map[key]).toEqual(undefined);
    });

    test(`Stream array seed: ${key} should equal living Cell`, () => {
      expect(streamArraySeed.map[key].living).toEqual(true);
    });

    test(`Stream map seed: ${key} should equal undefined`, () => {
      expect(streamMapSeed.map[key]).toEqual(undefined);
    });
  });

  ["0-0", "0-2", "1-1"].forEach((key) => {
    test(`Array seed: ${key} should equal undefined`, () => {
      expect(gameArraySeed.map[key]).toEqual(undefined);
    });

    test(`Map seed: ${key} should equal living Cell`, () => {
      expect(gameMapSeed.map[key].living).toEqual(true);
    });

    test(`Stream array seed: ${key} should equal undefined`, () => {
      expect(streamArraySeed.map[key]).toEqual(undefined);
    });

    test(`Stream map seed: ${key} should equal living Cell`, () => {
      expect(streamMapSeed.map[key].living).toEqual(true);
    });
  });
});
