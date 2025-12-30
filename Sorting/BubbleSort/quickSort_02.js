function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return arr;

  let pivotIndex = partition(arr, left, right);
  quickSort(arr, left, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, right);

  return arr;
}

function partition(arr, left, right) {
  let pivot = arr[right]; // pivot value
  let i = left;

  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      swap(arr, i, j);
      i++;
    }
  }

  swap(arr, i, right);
  return i;
}

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

let array = [64, 34, 25, 12, 22, 11, 90];
console.log("Sorted array:", quickSort(array));
