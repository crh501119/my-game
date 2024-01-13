document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    let playerPosition = 0; // 玩家起始位置

    // 使用加權隨機函數生成1~15的數字
    function weightedRandom(max) {
        // 生成一個隨機數字的平方根，使得高數字出現的機率低於低數字
        return Math.ceil(max * (Math.sqrt(Math.random())));
    }

    // 初始化遊戲板並創建玩家
    function initializeBoard() {
        const numberOfTiles = 25; // 這裡設定你的遊戲板大小
        for (let i = 0; i < numberOfTiles; i++) {
            const tile = document.createElement('div');
            tile.classList.add('game-tile');

            // 最後一格是終點，倒數第二格是毀滅
            if (i === numberOfTiles - 1) {
                tile.textContent = '終點';
                tile.dataset.edge = 'end'; // 使用自定義數據屬性標記終點
            } else if (i === numberOfTiles - 2) {
                tile.textContent = '毀滅';
                tile.dataset.edge = 'ruin'; // 使用自定義數據屬性標記毀滅
            } else {
                // 其他格子分配隨機次數
                const randomCount = weightedRandom(15);
                tile.textContent = randomCount.toString();
                tile.dataset.edge = randomCount; // 使用自定義數據屬性儲存次數
            }
            board.appendChild(tile);
        }

        // 創建玩家本體
        const player = document.createElement('div');
        player.setAttribute('id', 'player');
	player.style.top = '0'; // 初始位置
	player.style.left = '0'; // 初始位置
	player.textContent = '玩家';
	board.appendChild(player);
	}
// 根據骰子結果移動玩家
function movePlayer(diceRoll) {
    playerPosition += diceRoll; // 更新玩家位置
    if (playerPosition >= numberOfTiles) {
        playerPosition = numberOfTiles - 1; // 確保玩家不會超出遊戲板
    }

    // 獲取玩家的新位置元素
    const newPosition = document.querySelector('.game-tile:nth-child(' + (playerPosition + 1) + ')');
    const player = document.getElementById('player');

    // 更新玩家的位置
    player.style.top = newPosition.offsetTop + 'px';
    player.style.left = newPosition.offsetLeft + 'px';
}

// 擲骰子事件
document.getElementById('roll-dice').addEventListener('click', () => {
    const result = Math.floor(Math.random() * 6) + 1;
    movePlayer(result);
});

initializeBoard();
});