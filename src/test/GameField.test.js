import { GameField, fieldStream } from "../components/GameField";

describe("Game Field seeds living Cells with array", () => {
  const fieldArray = [
    [0, 1, 0],
    [1, 0, 1],
  ];

  const fieldMap = {
    "0,0": true,
    "0,2": true,
    "1,1": true,
  };
  const gameArraySeed = new GameField({ fieldArray });
  const gameMapSeed = new GameField({ fieldMap });
  const streamArraySeed = fieldStream({ fieldArray });
  const streamMapSeed = fieldStream({ fieldMap });

  ["0,1", "1,0", "1,2"].forEach((key) => {
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

  ["0,0", "0,2", "1,1"].forEach((key) => {
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

describe("fieldStream.next calculates liveNeighbors", () => {
  const fieldArray = [
    [0, 1, 0],
    [1, 0, 1],
  ];
  const testStream = fieldStream({ fieldArray });
  [
    ["-1,0", 1],
    ["-1,1", 1],
    ["-1,2", 1],
    ["0,-1", 1],
    ["0,0", 2],
    ["0,1", 2],
    ["0,2", 2],
    ["0,3", 1],
    ["1,-1", 1],
    ["1,0", 1],
    ["1,1", 3],
    ["1,2", 1],
    ["1,3", 1],
    ["2,-1", 1],
    ["2,0", 1],
    ["2,1", 2],
    ["2,2", 1],
    ["2,3", 1],
  ].forEach(([key, liveNeighbors]) => {
    test(`after .next ${key} in 1st should have ${liveNeighbors} liveNeighbors`, () => {
      expect(testStream.next.map[key].liveNeighbors).toEqual(liveNeighbors);
    });
  });

  const fieldMap = {
    "0,1": true,
    "0,2": true,
    "1,0": true,
    "1,1": true,
    "1,3": true,
    "2,1": true,
    "2,2": true,
  };
  const testStream2 = fieldStream({ fieldMap });
  [
    ["-1,0", 1],
    ["-1,1", 2],
    ["-1,2", 2],
    ["-1,3", 1],
    ["0,-1", 1],
    ["0,0", 3],
    ["0,1", 3],
    ["0,2", 3],
    ["0,3", 2],
    ["0,4", 1],
    ["1,-1", 1],
    ["1,0", 3],
    ["1,1", 5],
    ["1,2", 6],
    ["1,3", 2],
    ["1,4", 1],
    ["2,-1", 1],
    ["2,0", 3],
    ["2,1", 3],
    ["2,2", 3],
    ["2,3", 2],
    ["2,4", 1],
    ["3,0", 1],
    ["3,1", 2],
    ["3,2", 2],
    ["3,3", 1],
  ].forEach(([key, liveNeighbors]) => {
    test(`after .next ${key} in 2nd should have ${liveNeighbors} liveNeighbors`, () => {
      expect(testStream2.next.map[key].liveNeighbors).toEqual(liveNeighbors);
    });
  });
});

describe.skip("fieldStream.next tests still lifes", () => {
  const blockArray = [
    [1, 1],
    [1, 1],
  ];

  streamBlock = fieldStream({ fieldArray: blockArray });
  ["0,0", "0,1", "1,0", "1,1"].forEach((key) => {});

  const beehiveMap = {
    "0,1": true,
    "0,2": true,
    "1,0": true,
    "1,3": true,
    "2,1": true,
    "2,2": true,
  };

  const boatArray = [
    [1, 1, 0],
    [1, 0, 1],
    [0, 1, 0],
  ];
});
