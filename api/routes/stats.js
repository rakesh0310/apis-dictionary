const fs = require('fs')
const FILE_PATH = 'stats.json'
module.exports = async () => {
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

    const stats = await readStats();
    return stats;
}