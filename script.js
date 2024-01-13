document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('game-board');
  let playerPosition = 0; // 玩家起始位置
  const numberOfTiles = 25; // 将numberOfTiles定义为全局变量

  // 使用加權隨機函數生成1~15的數字
  function weightedRandom() {
    // 根据log(n+1/n)生成1~10的概率分布
    const probabilities = [];
    for (let n = 1; n <= 10; n++) {
      probabilities.push(Math.log(n + 1) / n);
    }

    // 标准化概率使得总和为1
    const total = probabilities.reduce((acc, val) => acc + val, 0);
    const normalizedProbabilities = probabilities.map(p => (p / total) * 0.7); // 1~10占70%

    // 添加11~15的概率
    for (let n = 11; n <= 15; n++) {
      normalizedProbabilities.push(0.3 / 5); // 11~15均分剩余的30%
    }

    // 选择一个随机数
    let r = Math.random();
    let sum = 0;

    for (let i = 0; i < normalizedProbabilities.length; i++) {
      sum += normalizedProbabilities[i];
      if (r <= sum) {
        return i + 1; // 返回索引加1（因为索引从0开始）
      }
    }
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
    let targetPosition = playerPosition + diceRoll; // 预计移动后的位置

    if (targetPosition > numberOfTiles - 1) {
      // 如果超过终点，显示消息并回退
      alert('超过所需步数！');
      targetPosition = numberOfTiles - 1 - (targetPosition - (numberOfTiles - 1)); // 回退多余的步数
    } else if (targetPosition === numberOfTiles - 1) {
      // 如果刚好到达终点，显示消息
      alert('恭喜，到达终点！');
    }

    playerPosition = targetPosition; // 更新玩家位置

    // 更新玩家的新位置元素
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
