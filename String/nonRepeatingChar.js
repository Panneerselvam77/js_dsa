function nonRepeatString(s) {
  const str = s.toLowerCase();

  for (let i = 0; i < str.length; i++) {
    let found = false;
    for (let j = 0; j < str.length; j++) {
      if (i !== j && str[i] === str[j]) {
        found = true;
        break;
      }
    }
    if (found === false) return s[i];
  }
  // If no such character is found, return '$'
  return "$";
}
// Driver Code
let s = "geeksforgeeks";
console.log(nonRepeatString(s));

/* Different type */
function nonRepeatingChar(s) {
  let charCount = new Map();

  // First pass: Count occurrences of each character
  for (let char of s) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }

  // Second pass: Find the first character with count 1
  for (let char of s) {
    if (charCount.get(char) === 1) {
      return char;
    }
  }

  return "$"; // If no non-repeating character found
}

// Test case
let s1 = "racecar";
console.log(nonRepeatingChar(s1)); // Output: "e"
