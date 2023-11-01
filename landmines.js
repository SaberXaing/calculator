const gridContainer = document.getElementById('grid');
const gridSize = 9;
const totalMines = 10;
let mineLocations = [];
let revealedCells = 0;
let clickedFirstCell = false;

function initializeGrid() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.setAttribute('data-row', i);
            cell.setAttribute('data-col', j);
            gridContainer.appendChild(cell);
        }
    }
}

function placeMines() {
    const cells = document.querySelectorAll('.cell');
    while (mineLocations.length < totalMines) {
        const randomCell = cells[Math.floor(Math.random() * cells.length)];
        const row = parseInt(randomCell.getAttribute('data-row'));
        const col = parseInt(randomCell.getAttribute('data-col'));
        if (!mineLocations.includes(`${row}-${col}`)) {
            mineLocations.push(`${row}-${col}`);
        }
    }
}

function revealMines() {
    mineLocations.forEach(location => {
        const [row, col] = location.split('-');
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        cell.classList.add('mine');
    });
}

function resetGame() {
    gridContainer.innerHTML = '';
    mineLocations = [];
    revealedCells = 0;
    initializeGrid();
    placeMines();
    revealMines(); // 在遊戲開始時顯示地雷
}

// ... (其餘的代碼不變)


function countAdjacentMines(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;
            if (mineLocations.includes(`${newRow}-${newCol}`)) {
                count++;
            }
        }
    }
    return count;
}

function revealCell(cell) {
    const row = parseInt(cell.getAttribute('data-row'));
    const col = parseInt(cell.getAttribute('data-col'));

    if (!clickedFirstCell) {
        // 如果是第一次點擊，避免點擊到地雷，重新排列地雷位置
        placeMines();
        clickedFirstCell = true;
    }

    if (!cell.classList.contains('clicked')) {
        cell.classList.add('clicked');
        revealedCells++;

        if (mineLocations.includes(`${row}-${col}`)) {
            cell.classList.add('mine');
            if (clickedFirstCell) {
                // 如果第一次點擊就踩到地雷，遊戲結束
                gameOver();
            }
        } else {
            const mineCount = countAdjacentMines(row, col);
            cell.textContent = mineCount > 0 ? mineCount : '';

            if (mineCount === 0) {
                // 如果點擊到的格子周圍沒有地雷，遞迴地顯示周圍的空白格
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        const newRow = row + i;
                        const newCol = col + j;
                        const neighborCell = document.querySelector(`[data-row="${newRow}"][data-col="${newCol}"]`);
                        if (neighborCell && !neighborCell.classList.contains('clicked')) {
                            revealCell(neighborCell);
                        }
                    }
                }
            }
        }

        if (revealedCells === gridSize * gridSize - totalMines) {
            gameWon();
        }
    }
}


function gameOver() {
    alert('Game Over! You clicked on a mine.');
    resetGame();
}

function gameWon() {
    alert('Congratulations! You won the game!');
    resetGame();
}

function resetGame() {
    gridContainer.innerHTML = '';
    mineLocations = [];
    revealedCells = 0;
    initializeGrid();
    placeMines();
}

initializeGrid();
placeMines();

gridContainer.addEventListener('click', function(event) {
    const cell = event.target;
    if (!cell.classList.contains('clicked')) {
        revealCell(cell);
    }
});

gridContainer.addEventListener('contextmenu', function(event) {
    event.preventDefault(); // 阻止右鍵菜單彈出

    const cell = event.target;
    if (!cell.classList.contains('clicked')) {
        if (!cell.classList.contains('flagged')) {
            // 如果格子沒有標記，則標記為藍色（flagged）
            cell.classList.add('flagged');
        } else {
            // 如果格子已經標記，則取消標記
            cell.classList.remove('flagged');
        }
    }
});




