document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    let playerPosition = 0; // 玩家起始位置

    // 初始化遊戲板並創建玩家
    function initializeBoard() {
        for (let i = 0; i < 25; i++) {
            const tile = document.createElement('div');
            tile.classList.add('game-tile');
            tile.textContent = i + 1; // 編號方格
            board.appendChild(tile);
        }
        // 創建玩家本體
        const player = document.createElement('div');
        player.setAttribute('id', 'player');
        player.style.position = 'absolute';
        player.style.top = '0'; // 初始位置
        player.style.left = '0'; // 初始位置
        player.textContent = '玩家';
        board.appendChild(player);
    }

    // 根據骰子結果移動玩家
    function movePlayer(diceRoll) {
        playerPosition += diceRoll; // 更新玩家位置
        if (playerPosition >= 25) {
            playerPosition = 24; // 確保玩家不會超出遊戲板
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