import { generateGrid, gridToMatrix } from "./grid.js";
import { BFS, DFS, Astar } from "./search.js";

// Reset grid & Matrix + Delete walls
const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", resetGrid);
export function resetGrid() {
    const grid = document.getElementById("grid");
    var matrix = gridToMatrix()
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 3 ||
                matrix[i][j] === 4 ||
                matrix[i][j] === 5) {
                // Visited or Path to 0
                matrix[i][j] = 0;
            }   
        }
    }
    grid.innerHTML = "";
    generateGrid(matrix);
}

// Reset grib & Matrix but keep walls
const keepWallButton = document.getElementById("keepWall");
keepWallButton.addEventListener("click", keepWall);
export function keepWall() {
    const grid = document.getElementById("grid");
    var matrix = gridToMatrix()
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 4 ||
                matrix[i][j] === 5) {
                // Visited or Path to 0
                matrix[i][j] = 0;
            }   
        }
    }
    grid.innerHTML = "";
    generateGrid(matrix);
}

// Control board
const solveButton = document.getElementById("solve");
solveButton.addEventListener('click', () => {
    keepWall()
    var matrix = gridToMatrix()
    const algorithm = document.querySelector('input[name="algorithm"]:checked').value;
    // Call appropriate searchn function
    if (algorithm === 'bfs') {
        BFS(matrix);
    } else if (algorithm === 'dfs') {
        DFS(matrix);
    } else if (algorithm === 'a_star') {
        Astar(matrix);
    }
});


const algorithmRadioButtons = document.getElementsByName('algorithm');
const heuristicSection = document.querySelector('.heuristics');
// Only show heuristic option when astar selected
algorithmRadioButtons.forEach(button => {
  button.addEventListener('change', () => {
    if (button.value === 'a_star') {
        heuristicSection.style.display = 'block';
    } else {
        heuristicSection.style.display = 'none';
    }
  });
});