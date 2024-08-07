self.onmessage = function(e) {
    const target = e.data;
    let attempts = 0;
    const startTime = Date.now();

    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    while (true) {
        attempts++;
        const randomString = generateRandomString(target.length);
        if (randomString === target) {
            const endTime = Date.now();
            const timeTaken = endTime - startTime;
            self.postMessage({ attempts, timeTaken, randomString });
            break;
        }
    }
}
