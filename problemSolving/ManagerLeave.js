// PROBLEM EXPLANATION:
// Given a hierarchical tree of managers and employees:
// - Each node represents a person
// - A "manager" is anyone who has at least one direct report
// - When a manager goes on leave, their direct reports are promoted temporarily
// - Question: If a specific manager goes on leave, how many NEW managers are created?
//   (i.e., people who weren't managers before but now have reports)

// Example Tree:
//        CEO (A)
//       /   |   \
//      B    C    D
//     / \        |
//    E   F       G
//   /
//  H
//
// If B goes on leave:
// - E and F become direct reports of A
// - E was already a manager (had H), so +0 new managers
// - F was not a manager, but now "manages" nobody, so +0 new managers
// - Answer: 0 new managers
//
// If A goes on leave:
// - B, C, D become top-level (no manager)
// - B was already a manager (had E, F)
// - C was not a manager, still isn't
// - D was already a manager (had G)
// - Answer: 0 new managers
//
// Better example - If C goes on leave in this tree:
//        A
//       / \
//      B   C
//         / \
//        D   E
//           / \
//          F   G
// If C leaves:
// - D and E become direct reports of A
// - D was NOT a manager (had no reports), still isn't → +0
// - E WAS a manager (had F, G), already counted → +0
// - Answer: 0
//
// When do we get new managers?
// If this tree:
//        A
//       / \
//      B   C
//     /   / \
//    D   E   F
//           / \
//          G   H
// If F leaves:
// - G and H become direct reports of C
// - G was NOT a manager, still isn't → +0
// - H was NOT a manager, still isn't → +0
// - Answer: 0
//
// The key insight: New managers are created when non-manager employees
// who had a manager above them are now promoted AND they themselves have reports.

// ==============================================================
// SOLUTION 1: BINARY TREE
// ==============================================================

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function countNewManagersBinaryTree(root, targetVal) {
  // First, find if each node is currently a manager
  const isManager = new Map();

  function markManagers(node) {
    if (!node) return;

    // A node is a manager if it has at least one child
    isManager.set(node.val, !!(node.left || node.right));

    markManagers(node.left);
    markManagers(node.right);
  }

  // Find the target node and count new managers
  function findAndCount(node) {
    if (!node) return { found: false, count: 0 };

    if (node.val === targetVal) {
      // Found the target! Count new managers among direct reports
      let newManagers = 0;

      // Check left child
      if (node.left && !isManager.get(node.left.val)) {
        // This child wasn't a manager before
        // Check if they'll become one (if they have children)
        if (node.left.left || node.left.right) {
          newManagers++;
        }
      }

      // Check right child
      if (node.right && !isManager.get(node.right.val)) {
        if (node.right.left || node.right.right) {
          newManagers++;
        }
      }

      return { found: true, count: newManagers };
    }

    // Search in subtrees
    const leftResult = findAndCount(node.left);
    if (leftResult.found) return leftResult;

    return findAndCount(node.right);
  }

  markManagers(root);
  return findAndCount(root).count;
}

// ==============================================================
// SOLUTION 2: N-ARY TREE (More realistic for org charts)
// ==============================================================

class NaryNode {
  constructor(val) {
    this.val = val;
    this.children = [];
  }
}

function countNewManagersNaryTree(root, targetVal) {
  // Mark all current managers
  const isManager = new Map();

  function markManagers(node) {
    if (!node) return;

    // A node is a manager if it has at least one child
    isManager.set(node.val, node.children.length > 0);

    for (const child of node.children) {
      markManagers(child);
    }
  }

  function findAndCount(node) {
    if (!node) return { found: false, count: 0 };

    if (node.val === targetVal) {
      let newManagers = 0;

      // Check each direct report
      for (const child of node.children) {
        // If this child wasn't a manager before
        if (!isManager.get(child.val)) {
          // Check if they'll become a manager now (have reports)
          if (child.children.length > 0) {
            newManagers++;
          }
        }
      }

      return { found: true, count: newManagers };
    }

    // Search in children
    for (const child of node.children) {
      const result = findAndCount(child);
      if (result.found) return result;
    }

    return { found: false, count: 0 };
  }

  markManagers(root);
  return findAndCount(root).count;
}

// ==============================================================
// TEST CASES
// ==============================================================

console.log("=== BINARY TREE TESTS ===\n");

// Test Case 1:
//        A
//       / \
//      B   C
//     /     \
//    D       E
//   /
//  F
const bt1 = new TreeNode("A");
bt1.left = new TreeNode("B");
bt1.right = new TreeNode("C");
bt1.left.left = new TreeNode("D");
bt1.right.right = new TreeNode("E");
bt1.left.left.left = new TreeNode("F");

console.log("Tree 1: A->B,C; B->D; C->E; D->F");
console.log("If B leaves:", countNewManagersBinaryTree(bt1, "B"));
console.log("  D wasn't a manager, now has F below → +1 new manager");
console.log("If D leaves:", countNewManagersBinaryTree(bt1, "D"));
console.log("  F wasn't a manager, has no reports → +0");

// Test Case 2:
//        CEO
//       /   \
//      M1    M2
//     / \    / \
//    E1 E2  E3 E4
console.log("\n");
const bt2 = new TreeNode("CEO");
bt2.left = new TreeNode("M1");
bt2.right = new TreeNode("M2");
bt2.left.left = new TreeNode("E1");
bt2.left.right = new TreeNode("E2");
bt2.right.left = new TreeNode("E3");
bt2.right.right = new TreeNode("E4");

console.log("Tree 2: CEO->M1,M2; M1->E1,E2; M2->E3,E4");
console.log("If CEO leaves:", countNewManagersBinaryTree(bt2, "CEO"));
console.log("  M1 and M2 were already managers → +0");
console.log("If M1 leaves:", countNewManagersBinaryTree(bt2, "M1"));
console.log("  E1 and E2 weren't managers, have no reports → +0");

console.log("\n=== N-ARY TREE TESTS ===\n");

// Test Case 3:
//          CEO
//        /  |  \
//       M1  M2  M3
//      / \  |   |
//     E1 E2 E3  M4
//              / \
//             E4 E5
const nt1 = new NaryNode("CEO");
const m1 = new NaryNode("M1");
const m2 = new NaryNode("M2");
const m3 = new NaryNode("M3");
const e1 = new NaryNode("E1");
const e2 = new NaryNode("E2");
const e3 = new NaryNode("E3");
const m4 = new NaryNode("M4");
const e4 = new NaryNode("E4");
const e5 = new NaryNode("E5");

nt1.children = [m1, m2, m3];
m1.children = [e1, e2];
m2.children = [e3];
m3.children = [m4];
m4.children = [e4, e5];

console.log("Org Chart: CEO -> M1, M2, M3");
console.log("           M1 -> E1, E2");
console.log("           M2 -> E3");
console.log("           M3 -> M4");
console.log("           M4 -> E4, E5");

console.log("\nIf CEO leaves:", countNewManagersNaryTree(nt1, "CEO"));
console.log("  M1, M2, M3 were already managers → +0");

console.log("\nIf M3 leaves:", countNewManagersNaryTree(nt1, "M3"));
console.log("  M4 was already a manager → +0");

console.log("\nIf M1 leaves:", countNewManagersNaryTree(nt1, "M1"));
console.log("  E1, E2 weren't managers and have no reports → +0");

// Test Case 4: Example where we GET new managers
//          CEO
//        /  |  \
//       M1  E1  E2
//      / \
//     E3  M2
//        / \
//       E4 E5
const nt2 = new NaryNode("CEO");
const m1_2 = new NaryNode("M1");
const e1_2 = new NaryNode("E1");
const e2_2 = new NaryNode("E2");
const e3_2 = new NaryNode("E3");
const m2_2 = new NaryNode("M2");
const e4_2 = new NaryNode("E4");
const e5_2 = new NaryNode("E5");

nt2.children = [m1_2, e1_2, e2_2];
m1_2.children = [e3_2, m2_2];
m2_2.children = [e4_2, e5_2];

console.log("\n--- Example with NEW managers ---");
console.log("Org: CEO -> M1, E1, E2");
console.log("     M1 -> E3, M2");
console.log("     M2 -> E4, E5");

console.log("\nIf M1 leaves:", countNewManagersNaryTree(nt2, "M1"));
console.log("  E3 wasn't a manager, has no reports → +0");
console.log("  M2 was already a manager → +0");
console.log("  Total: 0 new managers");

console.log("\n=== COMPLEXITY ===");
console.log("Time: O(n) - visit each node once");
console.log("Space: O(n) - store manager status for all nodes");
console.log("           + O(h) recursion stack where h = height");
