function quickSort(arr) {
  if (!Array.isArray(arr)) return [];
  if (arr.length <= 1) return arr;

  let pivot = arr[Math.floor(arr.length / 2)];
  let left = [];
  let mid = [];
  let right = [];

  for (const n of arr) {
    if (n < pivot) {
      left.push(n);
    } else if (n > pivot) {
      right.push(n);
    } else {
      mid.push(n);
    }
  }

  return [...quickSort(left), ...mid, ...quickSort(right)];
}

let array = [64, 34, 25, 12, 22, 11, 90];
console.log("Sorted array:", quickSort(array));
