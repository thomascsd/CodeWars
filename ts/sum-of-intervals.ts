/*
Write a function called sumIntervals/sum_intervals() that accepts an array of intervals,
and returns the sum of all the interval lengths. Overlapping intervals should only be counted once.
Intervals

Intervals are represented by a pair of integers in the form of an array. 
The first value of the interval will always be less than the second value.
 Interval example: [1, 5] is an interval from 1 to 5. The length of this interval is 4.
Overlapping Intervals

List containing overlapping intervals:

[
   [1,4],
   [7, 10],
   [3, 5]
]

The sum of the lengths of these intervals is 7. Since [1, 4] and [3, 5] overlap,
 we can treat the interval as [1, 5], which has a length of 4.
Examples:

sumOfIntervals([[1, 5], [10, 15], [-1, 3]]) // => 11

sumOfIntervals([[1, 5]]) // => 4 
*/

function calOverlappingArray(intervals: [number, number][]): [number, number][] {
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
    } else if (x1 >= x && x1 >= y && y1 >= x && y1 >= y) {
      // x y x1 y1, 沒有重疊
      // retList.push([x1, y1]);
      retList = pushOverlapArray(retList, [x1, y1]);
    } else if (x1 <= x && x1 <= y && y1 <= x && y1 <= y) {
      // x1 y1 x y，沒有重疊
      // retList.push([x1, y1]);
      retList = pushOverlapArray(retList, [x1, y1]);
    }
  }

  retList.push([x, y]);

  const sumOld = sum(intervals);
  const sumNew = sum(retList);

  if (sumNew !== sumOld) {
    retList = calOverlappingArray(retList);
  }

  return retList;
}

function mergeOverlap2(x: number, y: number, x1: number, y1: number) {
  // 判斷 x1及 y1 是否重疊，在 x ,y裡面 => x  x1  y1  y
  if (x1 > x && x1 < y && y1 > x && y1 < y) {
    return { newX: x, newY: y };
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
  } else {
    x = x1;
    y = y1;
  }

  return { newX: x, newY: y };
}

function pushOverlapArray(intervals: [number, number][], nums: [number, number]): [number, number][] {
  let list: [number, number][] = [...intervals];
  let tempNums: [number, number] = [0, 0];
  let x = 0,
    y = 0,
    x1 = nums[0],
    y1 = nums[1];

  if (list.length === 0) {
    list = [nums];
  } else if (list.length === 1) {
    x = list[0][0];
    y = list[0][1];

    let { newX, newY } = mergeOverlap2(x, y, x1, y1);
    x = newX;
    y = newY;

    if (!list.some((values) => values[0] === x && values[1] === y)) {
      list = [...list, [x, y]];
    }
  } else {
    for (let subNums of list) {
      x = subNums[0];
      y = subNums[1];

      let { newX, newY } = mergeOverlap2(x, y, x1, y1);

      if (x !== newX || y !== newY) {
        tempNums = [newX, newY];
      } else {
        tempNums = [x, y];
      }

      //排除重覆的項目
      if (!list.some((values) => values[0] === tempNums[0] && values[1] === tempNums[1])) {
        list = [...list, tempNums];
      }
    }

    // 將沒有重疊的nums，加入list
    if (!list.some((values) => values[0] === tempNums[0] && values[1] === tempNums[1])) {
      list = [...list, tempNums];
    }
  }

  return list;
}

function sum(intervals: [number, number][]): number {
  let len = 0;

  for (let nums of intervals) {
    len = len + (nums[1] - nums[0]);
  }

  return len;
}

export function sumOfIntervals(intervals: [number, number][]) {
  console.log(intervals);
  intervals.sort((a, b) => a[0] - b[0]);
  const overlappings = calOverlappingArray(intervals);
  return sum(overlappings);
}
