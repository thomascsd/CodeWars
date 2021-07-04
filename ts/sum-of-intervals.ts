function calArray(intervals: [number, number][]): [number, number][] {
  let retList: [number, number][] = [];
  let x: number = 0;
  let y: number = 0;
  let x1 = 0;
  let y1 = 0;

  for (let nums of intervals) {
    if (x === 0 && y === 0) {
      x = nums[0];
      y = nums[1];
      continue;
    }

    x1 = nums[0];
    y1 = nums[1];

    // 判斷 x1及 y1 是否重疊，在 x ,y裡面 => x  x1  y1  y
    if (x1 > x && x1 < y && y1 > x && y1 < y) {
      continue;
    } else if (x1 <= x && x1 < y && y1 > x && y1 >= y) {
      //  x1 x y y1
      x = x1;
      y = y1;
    } else if (x <= x1 && x1 < y && y1 > x && y1 >= y) {
      // x x1 y y1 ，x1 重疊
      y = y1;
    } else if (x1 <= x && x1 < y && y1 > x && y1 <= y) {
      // x1 x y1 y ，y1 重疊
      x = x1;
    } else if (x1 > x && x1 > y && y1 > x && y1 > y) {
      //x y x1 y1, 沒有重疊
      retList.push([x1, y1]);
    } else if (x1 < x && x1 < y && y1 < x && y1 < y) {
      // x1 y1 x y，沒有重疊
      retList.push([x1, y1]);
    }
  }

  retList.push([x, y]);

  const sumOld = sum(intervals);
  const sumNew = sum(retList);

  if (sumNew !== sumOld) {
    retList = calArray(retList);
  }

  return retList;
}

function sum(intervals: [number, number][]): number {
  let len = 0;

  for (let nums of intervals) {
    len = len + (nums[1] - nums[0]);
  }

  return len;
}

export function sumOfIntervals(intervals: [number, number][]) {
  const overlappings = calArray(intervals);
  return sum(overlappings);
}
