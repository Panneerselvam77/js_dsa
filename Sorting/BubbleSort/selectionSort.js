function selectionSort(arr) {
  if (!Array.isArray(arr)) return [];
  if (arr.length < 2) return arr;

  let n = arr.length;

  // Outer loop: iterate through each position
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i; // Start by assuming current position has minimum

    // Inner loop: find the minimum element in remaining unsorted array
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j; // Update index of minimum element
      }
    }

    // Swap only if minimum is not already in position
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }

  return arr;
}

const arr = [45, 23, 67, 12, 89, 23, 45, 90, 12, 67, 34, 56, 78, 23, 45];
console.log(selectionSort(arr));
// Output: [12, 12, 23, 23, 23, 34, 45, 45, 45, 56, 67, 67, 78, 89, 90]

const arr2 = [7, 3, 9, 12, 11];
console.log(selectionSort(arr2));
// Output: [3, 7, 9, 11, 12]
