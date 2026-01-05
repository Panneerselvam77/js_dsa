// Meeting Rooms II - Find minimum number of conference rooms required
// Given intervals representing meeting times, find minimum rooms needed

// Solution 1: Min Heap / Priority Queue approach
function minMeetingRooms(intervals) {
  if (!intervals || intervals.length === 0) return 0;

  // Sort by start time
  intervals.sort((a, b) => a[0] - b[0]);

  // Min heap to track end times (simulate with array)
  const endTimes = [];

  for (const interval of intervals) {
    const [start, end] = interval;

    // If earliest ending meeting ends before current starts, reuse room
    if (endTimes.length > 0 && endTimes[0] <= start) {
      endTimes.shift(); // Remove earliest ending meeting
    }

    // Add current meeting's end time
    endTimes.push(end);
    endTimes.sort((a, b) => a - b); // Keep min heap property
  }

  return endTimes.length;
}

// Solution 2: Chronological ordering (more efficient)
function minMeetingRoomsOptimized(intervals) {
  if (!intervals || intervals.length === 0) return 0;

  const starts = intervals.map((i) => i[0]).sort((a, b) => a - b);
  const ends = intervals.map((i) => i[1]).sort((a, b) => a - b);

  let rooms = 0;
  let maxRooms = 0;
  let startPtr = 0;
  let endPtr = 0;

  while (startPtr < starts.length) {
    if (starts[startPtr] < ends[endPtr]) {
      // Meeting starts, need a room
      rooms++;
      maxRooms = Math.max(maxRooms, rooms);
      startPtr++;
    } else {
      // Meeting ends, free a room
      rooms--;
      endPtr++;
    }
  }

  return maxRooms;
}

// Bonus: Return actual room assignments
function assignMeetingRooms(intervals) {
  if (!intervals || intervals.length === 0) return [];

  // Add index to track original intervals
  const indexed = intervals.map((interval, i) => [...interval, i]);
  indexed.sort((a, b) => a[0] - b[0]);

  const rooms = []; // Each room stores [endTime, [...meetingIndices]]
  const assignments = new Array(intervals.length);

  for (const [start, end, idx] of indexed) {
    let assigned = false;

    // Try to find available room
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i][0] <= start) {
        rooms[i][0] = end; // Update end time
        rooms[i][1].push(idx);
        assignments[idx] = i;
        assigned = true;
        break;
      }
    }

    // Need new room
    if (!assigned) {
      rooms.push([end, [idx]]);
      assignments[idx] = rooms.length - 1;
    }
  }

  return {
    minRooms: rooms.length,
    assignments: assignments,
    roomSchedules: rooms.map((r) => r[1]),
  };
}

// Test Cases
console.log("=== Test Case 1 ===");
const meetings1 = [
  [0, 30],
  [5, 10],
  [15, 20],
];
console.log("Meetings:", meetings1);
console.log("Min rooms needed:", minMeetingRooms(meetings1)); // 2
console.log("Min rooms (optimized):", minMeetingRoomsOptimized(meetings1)); // 2

console.log("\n=== Test Case 2 ===");
const meetings2 = [
  [7, 10],
  [2, 4],
];
console.log("Meetings:", meetings2);
console.log("Min rooms needed:", minMeetingRooms(meetings2)); // 1
console.log("Min rooms (optimized):", minMeetingRoomsOptimized(meetings2)); // 1

console.log("\n=== Test Case 3 ===");
const meetings3 = [
  [0, 30],
  [5, 10],
  [15, 20],
  [5, 15],
];
console.log("Meetings:", meetings3);
console.log("Min rooms needed:", minMeetingRooms(meetings3)); // 3
console.log("Min rooms (optimized):", minMeetingRoomsOptimized(meetings3)); // 3

console.log("\n=== Test Case 4 - Room Assignments ===");
const meetings4 = [
  [1, 5],
  [2, 6],
  [8, 9],
  [9, 11],
  [9, 12],
];
console.log("Meetings:", meetings4);
const result = assignMeetingRooms(meetings4);
console.log("Min rooms:", result.minRooms);
console.log("Room assignments:", result.assignments);
console.log("Room schedules (meeting indices):", result.roomSchedules);

console.log("\n=== Edge Cases ===");
console.log("Empty array:", minMeetingRooms([])); // 0
console.log("Single meeting:", minMeetingRooms([[1, 5]])); // 1
console.log(
  "No overlap:",
  minMeetingRooms([
    [1, 2],
    [3, 4],
    [5, 6],
  ])
); // 1
console.log(
  "All overlap:",
  minMeetingRooms([
    [1, 10],
    [2, 9],
    [3, 8],
  ])
); // 3
