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

/* *** Different method **** */
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

/* *** Different method **** */
// JavaScript program to find the index of the first
// non-repeating character using frequency array

// As the input string can only have lowercase
// characters, the maximum characters will be 26
const MAX_CHAR = 26;

function nonRepeatingChar(s) {
  // Initialize frequency array
  let freq = new Array(MAX_CHAR).fill(0);

  // Count the frequency of all characters
  for (let c of s) {
    freq[c.charCodeAt(0) - "a".charCodeAt(0)]++;
  }

  // Find the first character with frequency 1
  for (let i = 0; i < s.length; ++i) {
    if (freq[s.charCodeAt(i) - "a".charCodeAt(0)] === 1) return s[i];
  }

  // If no character with a frequency of 1 is
  // found, then return '$'
  return "$";
}

// Driver Code
let s2 = "racecar";
console.log(nonRepeatingChar(s2));
