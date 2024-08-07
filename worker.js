self.onmessage = function(e) {
    const target = e.data;
    let attempts = 0;
    const startTime = Date.now();

    // 日本語を含む文字セット
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz こんにちは世界';

    function generateRandomString(length) {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function run() {
        while (true) {
            attempts++;
            const randomString = generateRandomString(target.length);
            if (attempts % 100 === 0) {  // 100回ごとに更新
                self.postMessage({ attempts, currentString: randomString });
                await sleep(10);  // メインスレッドの更新を待つ
            }
            if (randomString === target) {
                const endTime = Date.now();
                const timeTaken = endTime - startTime;
                self.postMessage({ attempts, timeTaken, randomString });
                break;
            }
        }
    }

    run();
}
