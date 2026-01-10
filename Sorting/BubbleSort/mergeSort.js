function mergeSort(arr, left = 0, right = arr.length - 1) {
  if (!Array.isArray(arr)) return [];
  if (left >= right) return;

  let mid = Math.floor((left + right) / 2);
  mergeSort(arr, left, mid);
  mergeSort(arr, mid + 1, right);
  merge(arr, left, mid, right);
  return arr;
}
function merge(arr, left, mid, right) {
  let temp = [];
  let i = left;
  let j = mid + 1;

  while (i <= mid && j <= right) {
    if (arr[i] < arr[j]) {
      temp.push(arr[i]);
      i++;
    } else {
      temp.push(arr[j]);
      j++;
    }
  }
  while (i <= mid) {
    temp.push(arr[i]);
    i++;
  }
  while (j <= right) {
    temp.push(arr[j]);
    j++;
  }
  for (let k = 0; k < temp.length; k++) {
    arr[left + k] = temp[k];
  }
}
let arr = [38, 27, 43, 3, 9, 82, 10];
console.log(mergeSort(arr));
