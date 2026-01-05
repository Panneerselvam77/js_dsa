// Snapshot Array - supports set, snap, and get operations
// Efficient implementation using sparse storage

class SnapshotArray {
  constructor(length) {
    this.length = length;
    this.snapId = 0;
    // Each index stores array of [snapId, value] pairs
    this.history = Array.from({ length }, () => [[0, 0]]);
  }

  // Set value at index
  set(index, val) {
    const indexHistory = this.history[index];
    const lastEntry = indexHistory[indexHistory.length - 1];

    // If current snap already has a value, update it
    if (lastEntry[0] === this.snapId) {
      lastEntry[1] = val;
    } else {
      // Otherwise add new entry for current snap
      indexHistory.push([this.snapId, val]);
    }
  }

  // Take a snapshot, return snap_id
  snap() {
    return this.snapId++;
  }

  // Get value at index for given snap_id
  get(index, snapId) {
    const indexHistory = this.history[index];

    // Binary search to find the right snapshot
    let left = 0;
    let right = indexHistory.length - 1;

    while (left < right) {
      const mid = Math.ceil((left + right) / 2);

      if (indexHistory[mid][0] <= snapId) {
        left = mid;
      } else {
        right = mid - 1;
      }
    }

    return indexHistory[left][1];
  }
}

// Alternative: Simple implementation (less memory efficient)
class SnapshotArraySimple {
  constructor(length) {
    this.array = new Array(length).fill(0);
    this.snapshots = [];
  }

  set(index, val) {
    this.array[index] = val;
  }

  snap() {
    // Create copy of current array
    this.snapshots.push([...this.array]);
    return this.snapshots.length - 1;
  }

  get(index, snapId) {
    return this.snapshots[snapId][index];
  }
}

// Test Cases
console.log("=== Efficient Snapshot Array ===");
const arr1 = new SnapshotArray(3);

arr1.set(0, 5);
console.log("Set index 0 to 5");

const snap0 = arr1.snap();
console.log("Snapshot 0:", snap0);

arr1.set(0, 6);
console.log("Set index 0 to 6");

console.log("Get(0, 0):", arr1.get(0, 0)); // 5
console.log("Get(0, 0) should be 5 (before second set)");

const snap1 = arr1.snap();
console.log("\nSnapshot 1:", snap1);

arr1.set(0, 10);
arr1.set(1, 20);
console.log("Set index 0 to 10, index 1 to 20");

console.log("Get(0, 1):", arr1.get(0, 1)); // 6
console.log("Get(1, 1):", arr1.get(1, 1)); // 0
console.log("Get(0, 0):", arr1.get(0, 0)); // 5

console.log("\n=== Complex Test Case ===");
const arr2 = new SnapshotArray(4);

arr2.set(0, 10);
arr2.set(1, 20);
arr2.set(2, 30);

const s0 = arr2.snap();
console.log("Snap 0:", s0);

arr2.set(1, 25);
arr2.set(3, 40);

const s1 = arr2.snap();
console.log("Snap 1:", s1);

arr2.set(0, 15);
arr2.set(2, 35);

const s2 = arr2.snap();
console.log("Snap 2:", s2);

console.log("\nQuerying different snapshots:");
console.log("Get(0, 0):", arr2.get(0, 0)); // 10
console.log("Get(0, 1):", arr2.get(0, 1)); // 10
console.log("Get(0, 2):", arr2.get(0, 2)); // 15

console.log("Get(1, 0):", arr2.get(1, 0)); // 20
console.log("Get(1, 1):", arr2.get(1, 1)); // 25
console.log("Get(1, 2):", arr2.get(1, 2)); // 25

console.log("Get(3, 0):", arr2.get(3, 0)); // 0
console.log("Get(3, 1):", arr2.get(3, 1)); // 40
console.log("Get(3, 2):", arr2.get(3, 2)); // 40

console.log("\n=== Performance Comparison ===");
console.log("Efficient version:");
console.log("- Space: O(set operations) - only stores changes");
console.log("- set(): O(1)");
console.log("- snap(): O(1)");
console.log("- get(): O(log S) where S = snapshots for that index");

console.log("\nSimple version:");
console.log("- Space: O(length × snapshots) - stores full arrays");
console.log("- set(): O(1)");
console.log("- snap(): O(length)");
console.log("- get(): O(1)");

console.log("\n=== Edge Cases ===");
const arr3 = new SnapshotArray(1);
console.log("Get before any set:", arr3.get(0, 0)); // 0
const s = arr3.snap();
console.log("Snap without sets:", s); // 0
console.log("Get after snap:", arr3.get(0, 0)); // 0
