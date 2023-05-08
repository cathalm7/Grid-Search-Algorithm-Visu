// Matrix to Grid 
export function generateGrid(matrix){
    var grid = document.getElementById("grid");
    for (var i = 0; i < matrix.length; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j < matrix[i].length; j++) {
            // Assign corresponding value from the matrix
            var cell = document.createElement("td");
            cell.setAttribute("data-row", i);
            cell.setAttribute("data-col", j);
            if (matrix[i][j] === 0) {
                // Not visited = 0
                cell.className = "white";
            } else if (matrix[i][j] === 1) {
                // Start = 1
                cell.className = "green";
            } else if (matrix[i][j] === 2) {
                // End = 2
                cell.className = "red";
            } else if (matrix[i][j] === 3) {
                // Wall = 3
                cell.className = "blue";
            } else if (matrix[i][j] === 4) {
                // Visited = 4
                cell.className = "lightGreen";
            } else if (matrix[i][j] === 5) {
                // Path = 5 
                cell.className = "yellow";
            } 

            // Create/Remove walls if mouve hold down or click over cell
            cell.addEventListener("mousedown", function(e) {
                if (e.buttons === 1) {
                    var row = this.getAttribute("data-row");
                    var col = this.getAttribute("data-col");
                    // Update the matrix value
                    if (matrix[row][col] === 0) {
                        this.className = "blue";
                        matrix[row][col] = 3;
                    } else if (matrix[row][col] === 3) {
                        this.className = "white";
                        matrix[row][col] = 0;
                    }
                }
            });
            cell.addEventListener("mouseover", function(e) {
                if (e.buttons === 1) {
                    var row = this.getAttribute("data-row");
                    var col = this.getAttribute("data-col");
                    // Update the matrix value
                    if (matrix[row][col] === 0) {
                        this.className = "blue";
                        matrix[row][col] = 3;
                    } else if (matrix[row][col] === 3) {
                        this.className = "white";
                        matrix[row][col] = 0;
                    }
                }
            });
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
}
// Grid to Matrix 
export function gridToMatrix() {
    const grid = document.getElementById("grid");
    const matrix = [];
    for (let i = 0; i < grid.rows.length; i++) {
        matrix.push([]);
        for (let j = 0; j < grid.rows[i].cells.length; j++) {
            const cell = grid.rows[i].cells[j];
            // Assign corresponding values
            if (cell.classList.contains("white")) {
                matrix[i].push(0);
            } else if (cell.classList.contains("green")) {
                matrix[i].push(1);
            } else if (cell.classList.contains("red")) {
                matrix[i].push(2);
            } else if (cell.classList.contains("blue")) {
                matrix[i].push(3);
            } else if (cell.classList.contains("lightGreen")) {
                matrix[i].push(4);
            } else if (cell.classList.contains("yellow")) {
                matrix[i].push(5);
            }
        }
    }
    return matrix
}