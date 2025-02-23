function isPalindromeLoop(str) {
  const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0,
    right = cleanedStr.length - 1;

  while (left < right) {
    if (cleanedStr[left] !== cleanedStr[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

console.log(isPalindromeLoop("racecar")); // true
console.log(isPalindromeLoop("hello")); // false
console.log(isPalindromeLoop("A man, a plan, a canal: Panama")); // true
