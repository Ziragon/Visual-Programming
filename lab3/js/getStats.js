const { getDataFromAPI } = require('./getDataFromAPI.js');

async function getStats() {
    const stats = {};
    const datas = await getDataFromAPI();
    return new Promise(async(resolve) => {
        datas.forEach(data => {
            const category = data.category;
            if (category) {
                if (stats[category]) {
                    stats[category]++;
                } else {
                    stats[category] = 1;
                }
            }
        })
        resolve(stats);
    });
}

module.exports = { getStats };