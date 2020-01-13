const fs = require('fs');
const FILE_PATH = 'stats.json';
module.exports = async (route) => {
    // read json object from file
    const readStats = async () => {
        let result = {};
        try {
            result = await JSON.parse(fs.readFileSync(FILE_PATH));
        } catch (err) {
            console.error(err);
        }
        return result;
    }

    // set json object to file
    const setStats = async (stats) => {
        try {
            await fs.writeFileSync(FILE_PATH, JSON.stringify(stats), { flag: 'w+' });
        } catch (err) {
            console.error(err);
        }
    }

    const stats =await readStats();
    const event = `${route}`;
    stats[event] = stats[event] ? stats[event] + 1 : 1;
    setStats(stats);
}