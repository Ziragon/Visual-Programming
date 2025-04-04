const { loadData } = require('./loadData.js');
const { calcStats } = require('./calcStats.js');

async function calcStatsFromAPI() {
    const catsInfo = await loadData();
    const stats = calcStats(catsInfo);
    return stats;
}

module.exports = calcStatsFromAPI;