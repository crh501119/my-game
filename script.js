document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const rollDiceButton = document.getElementById('roll-dice');

    // 初始化遊戲板
    function initializeBoard() {
        for (let i = 0; i < 25; i++) {
            const tile = document.createElement('div');
            tile.classList.add('game-tile');
            tile.textContent = i + 1; // 編號方格
            board.appendChild(tile);
        }
    }

    // 擲骰子事件
    rollDiceButton.addEventListener('click', () => {
        const result = Math.floor(Math.random() * 6) + 1;
        alert('你擲出了: ' + result);
        // 根據擲骰子結果移動玩家
        // 更新遊戲狀態等...
    });

    initializeBoard();
});
