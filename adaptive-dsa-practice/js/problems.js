export const PATTERNS = ["Arrays & Hashing","Two Pointers","Stack","Binary Search","Sliding Window","Linked List","Trees","Backtracking","Heap / Priority Queue","Graphs","1-D Dynamic Programming","Greedy"];

export const PROBLEMS = {
"Arrays & Hashing":[
 {title:"Group Anagrams", tier:"medium", slug:"group-anagrams", note:"Looks like it needs sorting each string to compare — that works, but the asymptotically better key is a character-count signature instead of a full sort."},
 {title:"Top K Frequent Elements", tier:"medium", slug:"top-k-frequent-elements", note:"Sorting by frequency gives O(n log n). Bucket sort by frequency (index = count) gets true O(n)."},
 {title:"Encode and Decode Strings", tier:"medium", slug:"encode-and-decode-strings", note:"Using a plain separator character breaks if that character appears in the data. Prefix each string with its length instead."},
 {title:"Product of Array Except Self", tier:"medium", slug:"product-of-array-except-self", note:"The division trick fails when zeros are present. Two passes — prefix products, then suffix products — avoid division entirely."},
 {title:"Valid Sudoku", tier:"medium", slug:"valid-sudoku", note:"Looks like it needs three separate passes (rows, columns, boxes). One single pass with three hash sets, keyed per row/col/box index, does it."},
 {title:"Longest Consecutive Sequence", tier:"medium", slug:"longest-consecutive-sequence", note:"Sorting first gives O(n log n). A hash set lets you only start counting from true sequence starts, hitting O(n)."}
],
"Two Pointers":[
 {title:"Two Sum II Input Array Is Sorted", tier:"medium", slug:"two-sum-ii-input-array-is-sorted", note:"A hashmap also solves this in O(n), but the sorted input is the hint — two pointers from both ends gets O(1) extra space."},
 {title:"3Sum", tier:"medium", slug:"3sum", note:"Brute-force triple loop is O(n^3). Sort first, fix one number, then two-pointer the rest for O(n^2), skipping duplicates carefully."},
 {title:"Container With Most Water", tier:"medium", slug:"container-with-most-water", note:"Tempting to check every pair (O(n^2)). Moving the shorter of the two boundary pointers inward is always safe and gets O(n)."},
 {title:"Trapping Rain Water", tier:"hard", slug:"trapping-rain-water", note:"Looks like it needs per-column prefix/suffix max arrays (which works). Two pointers tracking running max from each side gets the same answer in O(1) space."}
],
"Stack":[
 {title:"Min Stack", tier:"medium", slug:"min-stack", note:"The trick is O(1) min at any point, not just at the top. A second stack tracking the running minimum alongside each push does it."},
 {title:"Evaluate Reverse Polish Notation", tier:"medium", slug:"evaluate-reverse-polish-notation", note:"Order of operations isn't the issue (RPN has none) — a simple operand stack, popping two per operator, is the whole trick."},
 {title:"Daily Temperatures", tier:"medium", slug:"daily-temperatures", note:"Looks like an O(n^2) scan ahead from each day. A monotonic decreasing stack of indices resolves every answer in one pass."},
 {title:"Car Fleet", tier:"medium", slug:"car-fleet", note:"Feels like a simulation problem. Sorting by position and comparing arrival times with a stack of 'fleet leaders' avoids simulating the road."},
 {title:"Largest Rectangle In Histogram", tier:"hard", slug:"largest-rectangle-in-histogram", note:"Checking every pair of bars is O(n^2). A monotonic increasing stack of bar indices gets you O(n)."}
],
"Binary Search":[
 {title:"Search a 2D Matrix", tier:"medium", slug:"search-a-2d-matrix", note:"Looks 2D, but since rows are sorted end-to-end, treating it as one flattened sorted array lets a single binary search work."},
 {title:"Koko Eating Bananas", tier:"medium", slug:"koko-eating-bananas", note:"Feels like simulation or greedy. It's binary search on the answer — the eating speed — since feasibility is monotonic."},
 {title:"Find Minimum In Rotated Sorted Array", tier:"medium", slug:"find-minimum-in-rotated-sorted-array", note:"A linear scan works but misses the point. Binary search by comparing against the rightmost element finds the rotation point in O(log n)."},
 {title:"Search In Rotated Sorted Array", tier:"medium", slug:"search-in-rotated-sorted-array", note:"The array isn't fully sorted, so plain binary search seems broken. At each step, one half is always sorted — check which, then decide where to search."},
 {title:"Time Based Key Value Store", tier:"medium", slug:"time-based-key-value-store", note:"Looks like it needs scanning all timestamps for a key. Storing values per key in a sorted list and binary-searching for the largest timestamp <= query gets O(log n) lookups."},
 {title:"Median of Two Sorted Arrays", tier:"hard", slug:"median-of-two-sorted-arrays", note:"Merging both arrays is the obvious O(m+n) approach. The O(log(min(m,n))) requirement is the signal: binary search on the partition point of the smaller array."}
],
"Sliding Window":[
 {title:"Longest Substring Without Repeating Characters", tier:"medium", slug:"longest-substring-without-repeating-characters", note:"Checking every substring is O(n^2) or worse. A variable window with a hashmap of last-seen character indices keeps it O(n)."},
 {title:"Longest Repeating Character Replacement", tier:"medium", slug:"longest-repeating-character-replacement", note:"Looks like it needs trying every replacement combination. Track the max character frequency in the current window; shrink only when (window size - max freq) exceeds k."},
 {title:"Permutation In String", tier:"medium", slug:"permutation-in-string", note:"Looks like it needs generating permutations. A fixed-size sliding window comparing character-count frequency to the target string's does it in O(n)."},
 {title:"Minimum Window Substring", tier:"hard", slug:"minimum-window-substring", note:"Looks like a simple expand-only window. It needs to expand until valid, then aggressively shrink from the left while still valid, tracking the smallest window seen."},
 {title:"Sliding Window Maximum", tier:"hard", slug:"sliding-window-maximum", note:"Naive approach recomputes the max in every window (O(nk)). A monotonic decreasing deque of indices gives the window max in O(1) amortized per step."}
],
"Linked List":[
 {title:"Reorder List", tier:"medium", slug:"reorder-list", note:"Looks like it needs extra array storage to reindex nodes. Find the middle (slow/fast pointers), reverse the second half, then merge the two halves in place."},
 {title:"Remove Nth Node From End Of List", tier:"medium", slug:"remove-nth-node-from-end-of-list", note:"You don't know the list length up front without a first pass. Two pointers, one started n steps ahead, find the target node in a single pass."},
 {title:"Copy List With Random Pointer", tier:"medium", slug:"copy-list-with-random-pointer", note:"A two-pass hashmap mapping old nodes to new ones works. An O(1)-space version interleaves cloned nodes directly next to the originals."},
 {title:"Add Two Numbers", tier:"medium", slug:"add-two-numbers", note:"Looks like it wants you to convert both lists to integers directly — which overflows at scale. Walk both lists node by node, carrying digit-by-digit."},
 {title:"Find The Duplicate Number", tier:"medium", slug:"find-the-duplicate-number", note:"Looks like it needs a hash set (O(n) space) or sorting (mutates input). Treating the array as a linked list of indices turns this into Floyd's cycle detection."},
 {title:"LRU Cache", tier:"medium", slug:"lru-cache", note:"A plain hashmap gives O(1) lookup but not O(1) eviction-order tracking. Pairing a hashmap with a doubly linked list gives O(1) for both get and put."},
 {title:"Merge K Sorted Lists", tier:"hard", slug:"merge-k-sorted-lists", note:"Merging lists two at a time repeatedly works but isn't optimal. A min-heap across all k list-heads merges everything in O(n log k)."},
 {title:"Reverse Nodes In K Group", tier:"hard", slug:"reverse-nodes-in-k-group", note:"Looks like a straightforward full-list reversal. It requires reversing exactly k nodes at a time, then correctly reconnecting each group to the next."}
],
"Trees":[
 {title:"Lowest Common Ancestor of a Binary Search Tree", tier:"medium", slug:"lowest-common-ancestor-of-a-binary-search-tree", note:"A generic tree LCA needs full-tree traversal. The BST property means you can binary-search down from the root by comparing values."},
 {title:"Binary Tree Level Order Traversal", tier:"medium", slug:"binary-tree-level-order-traversal", note:"Recursion can do this, but tracking levels cleanly is far easier with a BFS queue, processing one level's worth of nodes at a time."},
 {title:"Binary Tree Right Side View", tier:"medium", slug:"binary-tree-right-side-view", note:"Looks like it needs tracking the rightmost path explicitly. A BFS by level — keeping only the last node seen per level — gives the same answer more simply."},
 {title:"Count Good Nodes In Binary Tree", tier:"medium", slug:"count-good-nodes-in-binary-tree", note:"Looks like it needs comparing every node to every ancestor (O(n^2)). Passing the running max-so-far down through the recursion keeps it O(n)."},
 {title:"Validate Binary Search Tree", tier:"medium", slug:"validate-binary-search-tree", note:"Comparing each node only to its direct children misses violations further up the tree. A (min, max) bound threaded through the recursion catches all of them."},
 {title:"Kth Smallest Element In a Bst", tier:"medium", slug:"kth-smallest-element-in-a-bst", note:"Looks like it needs collecting and sorting all values. An in-order traversal of a BST already visits nodes in sorted order, so you can stop at the kth."},
 {title:"Construct Binary Tree From Preorder And Inorder Traversal", tier:"medium", slug:"construct-binary-tree-from-preorder-and-inorder-traversal", note:"Looks like trial-and-error reconstruction. Preorder gives you the root first; inorder tells you exactly how to split the rest into left and right subtrees."},
 {title:"Binary Tree Maximum Path Sum", tier:"hard", slug:"binary-tree-maximum-path-sum", note:"Looks like it should be a simple root-to-leaf sum. The path can bend through any node, and negative values mean you sometimes shouldn't extend into a child at all."},
 {title:"Serialize And Deserialize Binary Tree", tier:"hard", slug:"serialize-and-deserialize-binary-tree", note:"Looks like it needs a special data structure. A plain preorder traversal with explicit null markers is enough to reconstruct the exact tree."}
],
"Backtracking":[
 {title:"Subsets", tier:"medium", slug:"subsets", note:"Looks like it needs iterative bitmasking to be efficient — it doesn't, at these sizes. Simple include/exclude recursion covers every subset."},
 {title:"Combination Sum", tier:"medium", slug:"combination-sum", note:"Looks like permutations need deduplication after the fact. Recursing while only allowing 'forward' choices (same or later index) avoids duplicates from the start."},
 {title:"Combination Sum II", tier:"medium", slug:"combination-sum-ii", note:"Each number can be used once and the input has duplicates. Sorting first and skipping repeated siblings at the same recursion depth avoids duplicate combinations."},
 {title:"Permutations", tier:"medium", slug:"permutations", note:"Looks like it needs explicit duplicate-checking logic. Swapping elements in place, or tracking a 'used' set, naturally generates every ordering."},
 {title:"Subsets II", tier:"medium", slug:"subsets-ii", note:"Plain subset generation produces duplicate subsets when the input has repeats. Sorting first and skipping repeated siblings at the same depth fixes it."},
 {title:"Generate Parentheses", tier:"medium", slug:"generate-parentheses", note:"Looks like it needs generating everything and filtering invalid ones. Tracking open/close counts as you build lets you only ever generate valid strings."},
 {title:"Word Search", tier:"medium", slug:"word-search", note:"Looks like it needs precomputing all paths. A DFS from each starting cell, marking visited cells temporarily and un-marking on backtrack, is the approach."},
 {title:"Palindrome Partitioning", tier:"medium", slug:"palindrome-partitioning", note:"Looks like it needs checking every substring combination blindly. Only extending a cut when the next substring is itself a palindrome prunes heavily."},
 {title:"Letter Combinations of a Phone Number", tier:"medium", slug:"letter-combinations-of-a-phone-number", note:"Looks like it needs a precomputed cartesian product. Building one combination at a time and backtracking per digit uses far less memory."},
 {title:"N Queens", tier:"hard", slug:"n-queens", note:"Looks like it needs checking the whole board for conflicts at every placement. Tracking occupied columns and diagonals lets you prune invalid placements immediately."}
],
"Heap / Priority Queue":[
 {title:"K Closest Points to Origin", tier:"medium", slug:"k-closest-points-to-origin", note:"Sorting all points by distance works but is overkill. A size-k max-heap keeps only the k closest as you scan."},
 {title:"Kth Largest Element In An Array", tier:"medium", slug:"kth-largest-element-in-an-array", note:"A full sort gives O(n log n). A size-k min-heap gets you there in O(n log k), and quickselect can do it in expected O(n)."},
 {title:"Task Scheduler", tier:"medium", slug:"task-scheduler", note:"Looks like it needs full scheduling simulation. A max-heap by remaining frequency, combined with a cooldown queue, greedily builds the schedule."},
 {title:"Design Twitter", tier:"medium", slug:"design-twitter", note:"Looks like it needs scanning every followee's full tweet history per request. A heap merging only the most recent tweets per followee gets the top 10 efficiently."},
 {title:"Find Median From Data Stream", tier:"hard", slug:"find-median-from-data-stream", note:"Re-sorting on every insert is O(n log n) per operation. Two heaps — a max-heap for the lower half, min-heap for the upper half — keep the median accessible in O(log n)."}
],
"Graphs":[
 {title:"Number of Islands", tier:"medium", slug:"number-of-islands", note:"Looks like a counting problem you can do with nested loops. Flood-filling (DFS/BFS) from each unvisited land cell prevents recounting connected land."},
 {title:"Max Area of Island", tier:"medium", slug:"max-area-of-island", note:"Same flood-fill idea as Number of Islands, but you track and compare the size of each island as you fill it, not just count islands."},
 {title:"Clone Graph", tier:"medium", slug:"clone-graph", note:"Looks like it needs multiple passes to map old nodes to new ones. A single DFS/BFS with a hashmap from original node to its clone does it in one pass."},
 {title:"Walls And Gates", tier:"medium", slug:"walls-and-gates", note:"Looks like it needs per-room search back to the nearest gate (slow). Multi-source BFS starting from all gates simultaneously is far more efficient."},
 {title:"Rotting Oranges", tier:"medium", slug:"rotting-oranges", note:"Looks like single-source BFS. Since rot spreads from every rotten orange simultaneously, this needs multi-source BFS starting from all of them at once."},
 {title:"Pacific Atlantic Water Flow", tier:"medium", slug:"pacific-atlantic-water-flow", note:"Checking every cell's path to both oceans is expensive. Starting BFS/DFS from the ocean borders inward reverses the problem into something tractable."},
 {title:"Surrounded Regions", tier:"medium", slug:"surrounded-regions", note:"Looks like it needs checking every region's boundary individually. Flood-filling inward from the border first, marking safe cells, is the cleaner reverse approach."},
 {title:"Course Schedule", tier:"medium", slug:"course-schedule", note:"Reads like a simple dependency checklist. It's cycle detection in a directed graph — track nodes in the current DFS path, not just overall visited nodes."},
 {title:"Course Schedule II", tier:"medium", slug:"course-schedule-ii", note:"Same cycle-detection idea as Course Schedule, but you also record a valid finishing order — topological sort via DFS post-order or Kahn's algorithm."},
 {title:"Graph Valid Tree", tier:"medium", slug:"graph-valid-tree", note:"Looks like it just needs counting edges. A valid tree needs both exactly n-1 edges AND full connectivity — edge count alone isn't sufficient."},
 {title:"Number of Connected Components In An Undirected Graph", tier:"medium", slug:"number-of-connected-components-in-an-undirected-graph", note:"Looks like it needs a full traversal from every node. Union-Find (or DFS/BFS marking visited components) avoids redundant work across components."},
 {title:"Redundant Connection", tier:"medium", slug:"redundant-connection", note:"Looks like it needs checking the whole graph for cycles after each edge. Union-Find lets you detect the exact edge that first creates a cycle, incrementally."},
 {title:"Word Ladder", tier:"hard", slug:"word-ladder", note:"Looks like it needs trying every word transformation combinatorially. BFS over the word graph, where edges connect words one letter apart, finds the shortest path."}
],
"1-D Dynamic Programming":[
 {title:"House Robber", tier:"medium", slug:"house-robber", note:"Looks like greedy (always skip the smaller neighbor) — that fails on some inputs. DP tracking the best sum either including or excluding each house is needed."},
 {title:"House Robber II", tier:"medium", slug:"house-robber-ii", note:"Same as House Robber, but the houses are circular. Running the linear version twice — once excluding the first house, once excluding the last — handles the wraparound."},
 {title:"Longest Palindromic Substring", tier:"medium", slug:"longest-palindromic-substring", note:"Checking every substring is O(n^3). Expanding outward from each possible center (or interval DP) gets it down to O(n^2)."},
 {title:"Palindromic Substrings", tier:"medium", slug:"palindromic-substrings", note:"Same 'expand around center' idea as Longest Palindromic Substring, but counting every palindromic substring instead of just the longest."},
 {title:"Decode Ways", tier:"medium", slug:"decode-ways", note:"Looks like it needs generating every possible decoding. DP tracking the number of ways to decode up to each position, considering 1- and 2-digit groups, avoids enumerating them."},
 {title:"Coin Change", tier:"medium", slug:"coin-change", note:"Greedy (always use the largest coin) fails for certain coin sets. DP tracking the minimum coins needed for every amount up to the target is required."},
 {title:"Maximum Product Subarray", tier:"medium", slug:"maximum-product-subarray", note:"The max-subarray-sum sliding approach breaks because negative numbers can flip a very negative product into the maximum. Track both a running max AND running min product."},
 {title:"Word Break", tier:"medium", slug:"word-break", note:"Looks like it needs trying every possible split combinatorially. DP tracking which prefixes of the string are breakable avoids redundant recomputation."},
 {title:"Longest Increasing Subsequence", tier:"medium", slug:"longest-increasing-subsequence", note:"Naive recursion trying all subsequences is exponential. O(n^2) DP — best chain ending at each index — is the baseline, with O(n log n) patience sorting as a follow-up."},
 {title:"Partition Equal Subset Sum", tier:"medium", slug:"partition-equal-subset-sum", note:"Looks like it needs trying every subset (2^n). It reduces to subset-sum DP: can some subset reach exactly half the total sum?"}
],
"Greedy":[
 {title:"Maximum Subarray", tier:"medium", slug:"maximum-subarray", note:"Looks like it needs checking every subarray (O(n^2)). Kadane's algorithm — resetting the running sum to zero whenever it goes negative — gets O(n)."},
 {title:"Jump Game", tier:"medium", slug:"jump-game", note:"Looks like it needs trying every jump path (exponential). Tracking the farthest reachable index as you scan left to right is enough to answer yes/no."},
 {title:"Jump Game II", tier:"medium", slug:"jump-game-ii", note:"Similar to Jump Game, but minimizing jumps. Greedily tracking the current jump's reachable boundary and the next jump's farthest reach avoids exploring every path."},
 {title:"Gas Station", tier:"medium", slug:"gas-station", note:"Looks like it needs trying every starting station (O(n^2)). If total gas is enough overall, there's exactly one valid start, findable in one greedy pass."},
 {title:"Hand of Straights", tier:"medium", slug:"hand-of-straights", note:"Looks like it needs trying every possible grouping. Sorting the cards and greedily building each straight from its smallest remaining card works."},
 {title:"Merge Triplets to Form Target Triplet", tier:"medium", slug:"merge-triplets-to-form-target-triplet", note:"Looks like it needs combining triplets in every order. Only triplets that don't exceed the target in any coordinate can ever contribute — a single filtering pass."},
 {title:"Partition Labels", tier:"medium", slug:"partition-labels", note:"Looks like it needs backtracking over every possible partition. Tracking the last occurrence of each character lets you greedily extend a partition until it's safe to cut."},
 {title:"Valid Parenthesis String", tier:"medium", slug:"valid-parenthesis-string", note:"Looks like it needs trying every way to resolve the wildcard characters (exponential). Tracking a range of possible open-paren counts collapses it to one linear pass."}
]
};
