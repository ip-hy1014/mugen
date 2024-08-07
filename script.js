document.getElementById('startButton').addEventListener('click', () => {
    const targetString = document.getElementById('targetString').value;
    if (!targetString) {
        alert('目標の文字列を入力してください。');
        return;
    }
    
    const worker = new Worker('worker.js');
    const statusElement = document.getElementById('status');
    const outputElement = document.getElementById('output');

    statusElement.textContent = 'シミュレーション中...';
    outputElement.textContent = '';

    worker.postMessage(targetString);

    worker.onmessage = function(e) {
        const { attempts, timeTaken, randomString } = e.data;
        statusElement.textContent = `目標の文字列を見つけました！ 試行回数: ${attempts}, 時間: ${timeTaken}ms`;
        outputElement.textContent = `見つけた文字列: ${randomString}`;
    }
});
