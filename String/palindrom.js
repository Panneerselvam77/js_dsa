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
debugger;
console.log(isPalindromeLoop("racecar")); // true
console.log(isPalindromeLoop("hello")); // false
console.log(isPalindromeLoop("A man, a plan, a canal: Panama")); // true

function isPalindrome(str) {
  const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, ""); // Remove non-alphanumeric characters
  return cleanedStr === cleanedStr.split("").reverse().join("");
}

console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello")); // false
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
