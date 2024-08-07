const targetString = "こんにちは世界";
const worker = new Worker('worker.js');
const statusElement = document.getElementById('status');
const outputElement = document.getElementById('output');

worker.postMessage(targetString);

worker.onmessage = function(e) {
    const { attempts, timeTaken, randomString } = e.data;
    statusElement.textContent = `目標の文字列を見つけました！ 試行回数: ${attempts}, 時間: ${timeTaken}ms`;
    outputElement.textContent = `見つけた文字列: ${randomString}`;
}
