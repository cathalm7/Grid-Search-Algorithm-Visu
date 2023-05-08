import { generateGrid } from "./grid.js";


// Breadth First Search
export async function BFS(matrix) {
    const grid = document.getElementById("grid");
    const ROW = matrix.length;
    const COL = matrix[0].length;
    const visited = new Array(ROW).fill(0).map(() => new Array(COL).fill(false));
    const queue = [];
    // Define starting and ending coordinates
    let startRow, startCol, endRow, endCol;
    for (let i = 0; i < ROW; i++) {
        for (let j = 0; j < COL; j++) {
            if (matrix[i][j] === 1) {
                startRow = i;
                startCol = j;
                // Add starting coordinates to queue and mark as visited
                queue.push([startRow, startCol]);
                visited[startRow][startCol] = [startRow,startCol];
            } else if (matrix[i][j] === 2) {
                endRow = i;
                endCol = j;
            }
        }
    }
    // Define the directions to explore 
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    // Keep track of the path taken
    const path = [];
    while (queue.length > 0) {
        const curr = queue.shift();
        if (curr[0] !== startRow || curr[1] !== startCol) {
            matrix[curr[0]][curr[1]] = 4;
        }
        // Check if endpoint has been reached
        if (curr[0] === endRow && curr[1] === endCol) { 
            // Store the final path taken
            let prev = curr;
            while (prev[0] !== startRow || prev[1] !== startCol) {
                path.push(prev);
                prev = visited[prev[0]][prev[1]];
                // Make sure Start and End position don't get deleted
                matrix[prev[0]][prev[1]] = 5;
                matrix[startRow][startCol] = 1;
                matrix[endRow][endCol] = 2;
                // Pause to make it visible
                await sleep(40);
                // Draw each step
                grid.innerHTML = "";
                generateGrid(matrix);
            }
            return path;
        }
    
        // Explore neighboring coordinates
        for (const dir of dirs) {
            const nextRow = curr[0] + dir[0];
            const nextCol = curr[1] + dir[1];
    
            // Check if neighboring coordinate is valid and not already visited
            if (nextRow >= 0 && nextRow < ROW && nextCol >= 0 && nextCol < COL &&
                matrix[nextRow][nextCol] !== 3 &&
                !visited[nextRow][nextCol]) {
                // draw as visited
                if (nextRow !== startRow || nextCol !== startCol) {
                    matrix[nextRow][nextCol] = 4;
                }
                // Mark as visited and add to queue
                visited[nextRow][nextCol] = curr;
                queue.push([nextRow, nextCol]);
                // Mark as visited in the matrix
                await sleep(15);
                // Generate grid with updated matrix
                grid.innerHTML = "";
                generateGrid(matrix);
    
            }
        }
    }
    // Endpoint not found
    return false;
}

// Depth First Search - Stack
export async function DFS(matrix) {
    const grid = document.getElementById("grid");
    const ROW = matrix.length;
    const COL = matrix[0].length;
    const visited = new Array(ROW).fill(0).map(() => new Array(COL).fill(false));
    const stack = [];

    // Define starting and ending coordinates
    let startRow, startCol, endRow, endCol;
    for (let i = 0; i < ROW; i++) {
        for (let j = 0; j < COL; j++) {
            if (matrix[i][j] === 1) {
                startRow = i;
                startCol = j;
                // Add starting coordinates to stack and mark as visited
                stack.push([startRow, startCol]);
                visited[startRow][startCol] = [startRow,startCol];
            } else if (matrix[i][j] === 2) {
                endRow = i;
                endCol = j;
            }
        }
    }
    // Define the directions to explore
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    // Keep track of the path taken
    const path = [];
    // DFS search
    while (stack.length > 0) {
        const curr = stack.pop();
        // Check if endpoint has been reached
        if (curr[0] === endRow && curr[1] === endCol) {
            // Store the final path taken
            let prev = curr;
            while (prev[0] !== startRow || prev[1] !== startCol) {
                path.push(prev);
                prev = visited[prev[0]][prev[1]];
                matrix[prev[0]][prev[1]] = 5;
                matrix[startRow][startCol] = 1;
                matrix[endRow][endCol] = 2;
                await sleep(40);
                grid.innerHTML = "";
                generateGrid(matrix);
            }
            return path;
        }
        // Explore neighboring coordinates
        for (const dir of dirs) {
            const nextRow = curr[0] + dir[0];
            const nextCol = curr[1] + dir[1];
            // Check if neighboring coordinate is valid and not already visited
            if (nextRow >= 0 && nextRow < ROW && nextCol >= 0 && nextCol < COL &&
                matrix[nextRow][nextCol] !== 3 &&
                !visited[nextRow][nextCol]) {
                // Mark as visited and add to stack
                visited[nextRow][nextCol] = curr;
                stack.push([nextRow, nextCol]);
                // Mark as visited in the matrix
                if (nextRow !== endRow || nextCol !== endCol) {
                    matrix[nextRow][nextCol] = 4;
                }                
                await sleep(15);
                // Generate grid with updated matrix
                grid.innerHTML = "";
                generateGrid(matrix);
            }
        }
    }
    // Endpoint not found
    return false;
}

// A* search - Priority Queue (Based on Heuristic)
export async function Astar(matrix) {
    const selectedHeuristic = document.querySelector('input[name="heuristic"]:checked').value;
    const grid = document.getElementById("grid");
    const ROW = matrix.length;
    const COL = matrix[0].length;
    const visited = new Array(ROW).fill(0).map(() => new Array(COL).fill(false));
    const pQueue = new PriorityQueue();
  
    // Define starting and ending coordinates
    let startRow, startCol, endRow, endCol;
    for (let i = 0; i < ROW; i++) {
        for (let j = 0; j < COL; j++) {
            if (matrix[i][j] === 1) {
                startRow = i;
                startCol = j;
                // Add starting coordinates to queue and mark as visited
                visited[startRow][startCol] = true;
            } else if (matrix[i][j] === 2) {
                  endRow = i;
                  endCol = j;
            }
        }
    }
    // Define the directions to explore
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    // Keep track of the path taken
    const path = [];

    pQueue.push([startRow, startCol], getHeuristic(startRow, startCol, endRow, endCol, selectedHeuristic));
    while (!pQueue.isEmpty()) {
        const curr = pQueue.pop();
        // Check if endpoint has been reached
        if (curr[0] === endRow && curr[1] === endCol) {
            // Store the final path taken
            let prev = curr;
            while (prev[0] !== startRow || prev[1] !== startCol) {
                path.push(prev);
                prev = visited[prev[0]][prev[1]];
                matrix[prev[0]][prev[1]] = 5;
                matrix[startRow][startCol] = 1;
                matrix[endRow][endCol] = 2;
                await sleep(40);
                grid.innerHTML = "";
                generateGrid(matrix);
            }
            return path;
        }
        // Explore neighboring coordinates
        for (const dir of dirs) {
            const nextRow = curr[0] + dir[0];
            const nextCol = curr[1] + dir[1];
      
            // Check if neighboring coordinate is valid and not already visited
            if (nextRow >= 0 && nextRow < ROW && nextCol >= 0 && nextCol < COL &&
                matrix[nextRow][nextCol] !== 3 &&
                !visited[nextRow][nextCol]) {
                // Compute the heuristic cost for the neighboring coordinate
                const h = getHeuristic(nextRow, nextCol, endRow, endCol, selectedHeuristic);
                // Mark as visited and add to queue with priority based on heuristic cost
                visited[nextRow][nextCol] = curr;
                pQueue.push([nextRow, nextCol], h);
        
                // Mark as visited in the matrix
                matrix[nextRow][nextCol] = 4;
                await sleep(15);
                // Generate grid with updated matrix
                grid.innerHTML = "";
                generateGrid(matrix);
            }
        }
    }
    // Endpoint not found
    return false;
}  

// # Helper ---------------------------------------

// PriorityQueue Used in A*
class PriorityQueue {
    // The constructor initializes an empty array as the heap.
    constructor() {
        this.heap = [];
    }
    // adds an item to the heap with a given priority.
    push(item, priority) {
        this.heap.push({ item, priority });
        this.bubbleUp(this.heap.length - 1);
    }
    // removes and returns the item with the highest priority from the heap.
    pop() {
        const top = this.heap[0];
        const bottom = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = bottom;
            this.bubbleDown(0);
        }
        return top.item;
    }
    // checks if the heap is empty.
    isEmpty() {
        return this.heap.length === 0;
    }
    // moves an item up the heap until it is in its correct position based on prioirity.
    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex].priority <= this.heap[index].priority) {
                break;
            }
            const temp = this.heap[parentIndex];
            this.heap[parentIndex] = this.heap[index];
            this.heap[index] = temp;
            index = parentIndex;
        }
    }
    // moves an item dowm the heap until it is in its correct position based on prioirity.
    bubbleDown(index) {
        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let minIndex = index;
            if (leftChildIndex < this.heap.length && this.heap[leftChildIndex].priority < this.heap[minIndex].priority) {
                minIndex = leftChildIndex;
            }
            if (rightChildIndex < this.heap.length && this.heap[rightChildIndex].priority < this.heap[minIndex].priority) {
                minIndex = rightChildIndex;
            }
            if (minIndex === index) {
                break;
            }
            const temp = this.heap[minIndex];
            this.heap[minIndex] = this.heap[index];
            this.heap[index] = temp;
            index = minIndex;
        }
    }
}

// Heuristic functions based on the one selected
function getHeuristic(row1, col1, row2, col2, heuristic) {
    if (heuristic === 'euclidean') {
        return Math.sqrt(Math.pow((row1 - row2), 2) + Math.pow((col1 - col2), 2));
    } else if (heuristic === 'manhattan') {
        return Math.abs(row1 - row2) + Math.abs(col1 - col2);
    } else if (heuristic === 'octile') {
        const dx = Math.abs(row1 - col1);
        const dy = Math.abs(row2 - col2);
        const F = Math.SQRT2 - 1;
        return (dx < dy) ? F * dx + dy : F * dy + dx;
    } else if (heuristic === 'diagonal') {
        const dx = Math.abs(row1 - row2);
        const dy = Math.abs(col1 - col2);
        const D = 1;
        const D2 = Math.sqrt(2);
        return D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy);
    }
}

// USed to draw grid step by step
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}