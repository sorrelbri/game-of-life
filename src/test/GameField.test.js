import { GameField, fieldStream } from "../components/GameField";

describe("Game Field seeds living Cells with array", () => {
  const fieldArray = [
    [0, 1, 0],
    [1, 0, 1],
  ];

  const fieldMap = {
    "0,0": [true, 0],
    "0,2": [true, 0],
    "1,1": [true, 0],
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
    "0,1": [true, 0],
    "0,2": [true, 0],
    "1,0": [true, 0],
    "1,1": [true, 0],
    "1,3": [true, 0],
    "2,1": [true, 0],
    "2,2": [true, 0],
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

describe("fieldStream.next tests still lifes", () => {
  const blockArray = [
    [1, 1],
    [1, 1],
  ];

  const streamBlock = fieldStream({ fieldArray: blockArray });
  [
    ["-1,-1", false],
    ["-1,0", false],
    ["-1,1", false],
    ["-1,2", false],
    ["0,-1", false],
    ["0,0", true],
    ["0,1", true],
    ["0,2", false],
    ["1,-1", false],
    ["1,0", true],
    ["1,1", true],
    ["1,2", false],
    ["2,-1", false],
    ["2,0", false],
    ["2,1", false],
    ["2,2", false],
  ].forEach(([key, live]) => {
    test(`after one generation of Block, ${key} alive: ${live}`, () => {
      expect(streamBlock.next.next.map[key].living).toEqual(live);
    });
  });

  const beehiveMap = {
    "0,1": [true, 0],
    "0,2": [true, 0],
    "1,0": [true, 0],
    "1,3": [true, 0],
    "2,1": [true, 0],
    "2,2": [true, 0],
  };
  const streamBeehive = fieldStream({ fieldMap: beehiveMap });
  [
    ["-1,0", false],
    ["-1,1", false],
    ["-1,2", false],
    ["-1,3", false],
    ["0,-1", false],
    ["0,0", false],
    ["0,1", true],
    ["0,2", true],
    ["0,3", false],
    ["0,4", false],
    ["1,-1", false],
    ["1,0", true],
    ["1,1", false],
    ["1,2", false],
    ["1,3", true],
    ["1,4", false],
    ["2,-1", false],
    ["2,0", false],
    ["2,1", true],
    ["2,2", true],
    ["2,3", false],
    ["2,4", false],
    ["3,0", false],
    ["3,1", false],
    ["3,2", false],
    ["3,3", false],
  ].forEach(([key, live]) => {
    test(`after one generation of Beehive, ${key} alive: ${live}`, () => {
      expect(streamBeehive.next.next.map[key].living).toEqual(live);
    });
  });

  const boatArray = [
    [1, 1, 0],
    [1, 0, 1],
    [0, 1, 0],
  ];
  const streamBoat = fieldStream({ fieldArray: boatArray });
  [
    ["-1,-1", false],
    ["-1,0", false],
    ["-1,1", false],
    ["-1,2", false],
    ["0,-1", false],
    ["0,0", true],
    ["0,1", true],
    ["0,2", false],
    ["1,-1", false],
    ["1,0", true],
    ["1,1", false],
    ["1,2", true],
    ["1,3", false],
    ["2,-1", false],
    ["2,0", false],
    ["2,1", true],
    ["2,2", false],
    ["2,3", false],
    ["3,0", false],
    ["3,1", false],
    ["3,2", false],
  ].forEach(([key, live]) => {
    test(`after one generation of Beehive, ${key} alive: ${live}`, () => {
      expect(streamBoat.next.next.map[key].living).toEqual(live);
    });
  });
});

describe("fieldStream.next tests oscillators, spaceships", () => {
  const blinkerArray = [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ];
  const streamBlinker = fieldStream({ fieldArray: blinkerArray });
  [
    ["0,0", false],
    ["0,1", false],
    ["0,2", false],
    ["1,0", true],
    ["1,1", true],
    ["1,2", true],
    ["2,0", false],
    ["2,1", false],
    ["2,2", false],
  ].forEach(([key, live]) => {
    test(`after one generation of blinker, ${key} alive: ${live}`, () => {
      expect(streamBlinker.next.next.map[key].living).toEqual(live);
    });
  });
  [
    ["0,0", false],
    ["0,1", true],
    ["0,2", false],
    ["1,0", false],
    ["1,1", true],
    ["1,2", false],
    ["2,0", false],
    ["2,1", true],
    ["2,2", false],
  ].forEach(([key, live]) => {
    test(`after two generations of blinker, ${key} alive: ${live}`, () => {
      expect(streamBlinker.next.next.next.next.map[key].living).toEqual(live);
    });
  });

  const gliderArray = [
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1],
  ];
  const streamGlider = fieldStream({ fieldArray: gliderArray });

  [
    ["0,0", false],
    ["0,1", false],
    ["0,2", false],
    ["1,0", true],
    ["1,1", false],
    ["1,2", true],
    ["2,0", false],
    ["2,1", true],
    ["2,2", true],
    ["3,0", false],
    ["3,1", true],
    ["3,2", false],
  ].forEach(([key, live]) => {
    test(`after one generation of glider, ${key} alive: ${live}`, () => {
      expect(streamGlider.next.next.map[key].living).toEqual(live);
    });
  });
  [
    ["0,0", false],
    ["0,1", false],
    ["0,2", false],
    ["1,0", false],
    ["1,1", false],
    ["1,2", true],
    ["2,0", true],
    ["2,1", false],
    ["2,2", true],
    ["3,0", false],
    ["3,1", true],
    ["3,2", true],
  ].forEach(([key, live]) => {
    test(`after two generations of glider, ${key} alive: ${live}`, () => {
      expect(streamGlider.next.next.next.next.map[key].living).toEqual(live);
    });
  });
  [
    ["0,0", false],
    ["0,1", false],
    ["0,2", false],
    ["0,3", false],
    ["1,0", false],
    ["1,1", true],
    ["1,2", false],
    ["1,3", false],
    ["2,0", false],
    ["2,1", false],
    ["2,2", true],
    ["2,3", true],
    ["3,0", false],
    ["3,1", true],
    ["3,2", true],
    ["3,3", false],
  ].forEach(([key, live]) => {
    test(`after three generations of glider, ${key} alive: ${live}`, () => {
      expect(
        streamGlider.next.next.next.next.next.next.map[key].living
      ).toEqual(live);
    });
  });
  [
    ["0,0", false],
    ["0,1", false],
    ["0,2", false],
    ["0,3", false],
    ["1,0", false],
    ["1,1", false],
    ["1,2", true],
    ["1,3", false],
    ["2,0", false],
    ["2,1", false],
    ["2,2", false],
    ["2,3", true],
    ["3,0", false],
    ["3,1", true],
    ["3,2", true],
    ["3,3", true],
  ].forEach(([key, live]) => {
    test(`after four generations of glider, ${key} alive: ${live}`, () => {
      expect(
        streamGlider.next.next.next.next.next.next.next.next.map[key].living
      ).toEqual(live);
    });
  });
});
