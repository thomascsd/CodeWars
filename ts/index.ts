import { sumOfIntervals } from "./sum-of-intervals";
let sum = 0;

sum = sumOfIntervals([
  [1, 4],
  [7, 10],
  [3, 5],
]);

console.log(sum === 7);

sum = sumOfIntervals([
  [-407, -6],
  [56, 96],
  [-392, -23],
  [175, 477],
  [-87, -24],
  [-384, -78],
  [-252, 203],
  [-328, 114],
  [430, 468],
  [147, 281],
  [-138, 146],
  [457, 483],
]);

console.log(sum === 890);

sum = sumOfIntervals([
  [-251, -202],
  [-118, 32],
  [313, 483],
  [-199, -69],
]);

console.log(sum === 450);
