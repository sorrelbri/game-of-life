import { Cell, cellStream } from "../components/Cell";

describe("Cell functionality", () => {
  test("dispatch toggleLiving state should mark living cell dead", () => {
    const cell = new Cell(true);
    cell.toggleLiving();
    expect(cell.living).toEqual(false);
  });
  test("dispatch toggleLiving state should mark dead cell living", () => {
    const cell = new Cell();
    cell.toggleLiving();
    expect(cell.living).toEqual(true);
  });
  test("dispatch add Live Neighbor should increment live neighbors property", () => {
    const cell = new Cell();
    cell.addLiveNeighbor();
    expect(cell.liveNeighbors).toEqual(1);
  });

  const livingFromLivingStates = new Array(8)
    .fill()
    .map((_, i) => (i === 2 || i === 3 ? true : false));

  livingFromLivingStates.forEach((state, liveNeighbors) => {
    test(`dispatch setLiving on live cell with ${liveNeighbors} neighbors should result in living = ${state}`, () => {
      const cell = new Cell(true);
      new Array(liveNeighbors).fill().forEach((_) => cell.addLiveNeighbor());
      cell.setLiving();
      expect(cell.living).toEqual(state);
    });
  });

  const livingFromDeadStates = new Array(8)
    .fill()
    .map((_, i) => (i === 3 ? true : false));

  livingFromDeadStates.forEach((state, liveNeighbors) => {
    test(`dispatch setLiving on dead cell with ${liveNeighbors} neighbors should result in living = ${state}`, () => {
      const cell = new Cell();
      new Array(liveNeighbors).fill().forEach((_) => cell.addLiveNeighbor());
      cell.setLiving();
      expect(cell.living).toEqual(state);
    });
  });

  const cellStreamNextCalls = [
    [2, false],
    [3, true],
    [0, false],
    [5, false],
  ];

  cellStreamNextCalls.forEach(([liveNeighbors, livingResult]) => {
    test(`cellStream advances cell state for ${liveNeighbors} live Neighbors (from dead cell)`, () => {
      const cell = cellStream(false, liveNeighbors).next;
      expect(cell.living).toEqual(livingResult);
    });
  });

  [[2, true], ...cellStreamNextCalls.slice(1)].forEach(
    ([liveNeighbors, livingResult]) => {
      test(`cellStream advances cell state for ${liveNeighbors} live Neighbors (from living cell)`, () => {
        const cell = cellStream(true, liveNeighbors).next;
        expect(cell.living).toEqual(livingResult);
      });
    }
  );
});
